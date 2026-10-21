import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const pollingSource = await readFile(new URL('../tracking-polling.js', import.meta.url), 'utf8');

function loadPolling({ intervalMs = 10_000 } = {}) {
  const intervals = new Map();
  const cleared = [];
  let nextId = 1;
  const context = {
    setInterval(callback, delay) {
      const id = nextId++;
      intervals.set(id, { callback, delay });
      return id;
    },
    clearInterval(id) {
      cleared.push(id);
      intervals.delete(id);
    },
    AbortController,
  };
  vm.runInNewContext(pollingSource, context);
  const polling = context.LivreTrackingPolling.create({ intervalMs });
  return { polling, intervals, cleared };
}

test('mantiene un solo polling activo al iniciar y reentrar', async () => {
  const { polling, intervals, cleared } = loadPolling();
  let calls = 0;
  polling.start(() => {
    calls += 1;
  });
  polling.start(() => {
    calls += 1;
  });

  assert.equal(intervals.size, 1);
  assert.equal(cleared.length, 1);
  assert.equal(calls, 2);
});

test('detiene el polling al salir y no vuelve a ejecutar callbacks', () => {
  const { polling, intervals } = loadPolling();
  let calls = 0;
  polling.start(() => {
    calls += 1;
  });
  const [id, timer] = intervals.entries().next().value;
  polling.stop();
  timer.callback();

  assert.equal(intervals.size, 0);
  assert.equal(calls, 1);
  assert.equal(id > 0, true);
});

test('cancela solicitudes pendientes y descarta respuestas obsoletas', async () => {
  const { polling } = loadPolling();
  let resolveRequest;
  let receivedSignal;
  const results = [];
  polling.start((signal) => {
    receivedSignal = signal;
    return new Promise((resolve) => {
      resolveRequest = resolve;
    });
  }, (result) => results.push(result));

  polling.stop();
  resolveRequest('respuesta vieja');
  await Promise.resolve();

  assert.equal(receivedSignal.aborted, true);
  assert.deepEqual(results, []);
});
