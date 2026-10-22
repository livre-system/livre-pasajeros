(function (root) {
  function create({ intervalMs = 10_000, setIntervalFn = root.setInterval, clearIntervalFn = root.clearInterval } = {}) {
    let active = false;
    let generation = 0;
    let timerId = null;
    let requestController = null;
    let requestPending = false;

    function stop() {
      active = false;
      generation += 1;
      if (timerId !== null) {
        clearIntervalFn(timerId);
        timerId = null;
      }
      if (requestController) {
        requestController.abort();
        requestController = null;
      }
      requestPending = false;
    }

    let runNow = null;

    function start(poll, onResult, onError) {
      stop();
      active = true;
      const currentGeneration = generation;

      const run = async () => {
        if (!active || currentGeneration !== generation || requestPending) return;
        requestPending = true;
        requestController = new root.AbortController();
        const { signal } = requestController;
        try {
          const result = await poll(signal);
          if (active && currentGeneration === generation && !signal.aborted && onResult) {
            onResult(result);
          }
        } catch (error) {
          if (active && currentGeneration === generation && !signal.aborted && onError) {
            onError(error);
          }
        } finally {
          if (currentGeneration === generation) {
            requestPending = false;
            requestController = null;
          }
        }
      };

      runNow = run;
      run();
      timerId = setIntervalFn(run, intervalMs);
    }

    return { start, stop, refresh: () => runNow?.() };
  }

  root.LivreTrackingPolling = { create };
})(typeof globalThis !== 'undefined' ? globalThis : window);
