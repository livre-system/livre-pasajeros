# Livre Pasajeros

Web para pedir un viaje de prueba y seguirlo con un link privado. El pedido se crea en Livre Cloud, queda pendiente de asignación en el CRM y luego muestra el estado y el GPS del conductor.

## Contrato

- `POST /mobility/requests`
- `GET /mobility/tracking/{tracking_token}`

La app restringe los pedidos de prueba a Bahía Blanca y alrededores.

Frontend web responsive para mostrar el seguimiento de un viaje desde un link de WhatsApp.

## Demo

Sin token, la página conserva una demo visual con una ruta simulada en Bahía Blanca. Con `?token=...`, consulta el viaje real a Livre Cloud y no mueve el vehículo artificialmente.

## Ejecutar localmente

```bash
python3 -m http.server 4173
```

Abrir http://localhost:4173

## Contrato actual

El frontend recibe un token privado de viaje y consulta `GET /mobility/tracking/{token}` en Livre Cloud. El navegador nunca llama directamente a MAGIIS ni expone credenciales.

El CRM alimenta este flujo desde Livre Cloud: `GET /crm/travels/live` sincroniza la asignación del viaje, conductor y vehículo en `livi_trips`; luego el seguimiento público solo devuelve los datos mínimos del viaje asociado al token. La ubicación debe ser enviada por el circuito autenticado del conductor mediante `POST /mobility/trips/{id}/location`.

## Qué ya tiene esta vista

- mapa con vehículo y ruta;
- estado del viaje y datos del conductor/vehículo;
- actualización automática cada 10 segundos;
- aviso de conexión o última ubicación conocida;
- compartir el link privado y ayuda básica;
- identidad visual del CRM Livre: rojo `#E8003D`, rojo oscuro `#B50030`, blanco, grises e imagen oficial del logo.

## Próximas conexiones reales

- vencimiento y revocación del token;
- ubicación del conductor desde una app autenticada, no desde el navegador del pasajero;
- ETA calculada por el backend, cuando el CRM/proveedor entregue origen, ruta y tiempo confiables;
- dominio, Universal Links y Android App Links cuando exista la app móvil.

No se agrega login de CRM al pasajero: mezclar la identidad del usuario del panel con la del pasajero sería incorrecto. Las funciones de SOS, contactos y soporte requieren antes un contrato backend y responsables operativos; por ahora la vista no dispara efectos externos.
