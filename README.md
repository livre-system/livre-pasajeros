# Livre Pasajeros

Frontend web responsive para mostrar el seguimiento de un viaje desde un link de WhatsApp.

## Demo

La demo actual usa una ruta simulada en Bahía Blanca y mueve el vehículo cada 4,5 segundos para poder presentar la experiencia. No representa GPS real ni debe conectarse a pasajeros reales todavía.

## Ejecutar localmente

```bash
python3 -m http.server 4173
```

Abrir http://localhost:4173

## Próximo contrato

El frontend deberá recibir un token de viaje y consultar a `livre-cloud` mediante un endpoint público seguro. El navegador no debe llamar directamente a MAGIIS ni exponer credenciales.

Pendientes de integración:

- reemplazar la ruta simulada por coordenadas reales;
- validar token, vencimiento y autorización por viaje;
- conectar actualización periódica o WebSocket;
- configurar dominio, Universal Links y Android App Links cuando exista la app móvil.
