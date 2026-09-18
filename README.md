# Livre Pasajeros

Frontend web responsive para mostrar el seguimiento de un viaje desde un link de WhatsApp.

## Demo

Sin token, la página conserva una demo visual con una ruta simulada en Bahía Blanca. Con `?token=...`, consulta el viaje real a Livre Cloud y no mueve el vehículo artificialmente.

## Ejecutar localmente

```bash
python3 -m http.server 4173
```

Abrir http://localhost:4173

## Próximo contrato

El frontend recibe un token de viaje y consulta `GET /mobility/tracking/{token}` en Livre Cloud mediante un endpoint público seguro. El navegador no llama directamente a MAGIIS ni expone credenciales.

Pendientes de integración:

- vencimiento y revocación del token;
- conectar actualización periódica o WebSocket;
- configurar dominio, Universal Links y Android App Links cuando exista la app móvil.
