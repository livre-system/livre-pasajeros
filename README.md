# Livre Pasajeros

Web para pedir un viaje de prueba y seguirlo con un link privado. El pedido se crea en Livre Cloud y queda asignado a un conductor disponible de la base local.

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

El dashboard consulta exclusivamente los snapshots locales importados en Livre Cloud. MAGIIS no participa en el pedido, asignación, estados, GPS ni dashboard. Las altas y cambios operativos deben implementarse sobre tablas propias antes de habilitarse; no se envían cambios a proveedores externos.

## Qué ya tiene esta vista

- mapa con vehículo y ruta;
- estado del viaje y datos del conductor/vehículo;
- actualización automática cada 10 segundos;
- aviso de conexión o última ubicación conocida;
- compartir el link privado y ayuda básica;
- identidad visual del CRM Livre: rojo `#E8003D`, rojo oscuro `#B50030`, blanco, grises e imagen oficial del logo.

## Publicación móvil

La interfaz actual sigue siendo la fuente web, pero el proyecto ya incluye un contenedor nativo Capacitor para publicar la misma app en las tiendas:

- identificador: `com.livre.pasajeros`;
- Android: proyecto `android/` para Google Play;
- iOS: proyecto `ios/` para App Store;
- bundle web: `www/`, generado desde `index.html` y `logo_livre.png`;
- configuración: `capacitor.config.ts`;
- sincronización: `npm run cap:sync`.

Comandos de desarrollo:

```bash
npm install
npm run cap:sync
npx cap open android
npx cap open ios
```

La app nativa no depende de Safari ni Chrome para ejecutarse: la UI se carga dentro del WebView oficial de cada plataforma y sigue consultando únicamente Livre Cloud. Para publicar faltan tareas propias de las tiendas: íconos y splash finales, certificados/perfiles de firma, cuenta de Google Play, cuenta Apple, textos de privacidad y revisión en dispositivos reales. Android requiere Android Studio/JDK; iOS requiere macOS/Xcode.

Las notificaciones push, deep links (Universal Links/App Links), permisos nativos y publicación de actualizaciones deben agregarse cuando exista el contrato de producto correspondiente; no se inventan en esta etapa porque el backend actual solo define pedido y seguimiento por token.

## Privacidad, soporte y tiendas

La app incluye páginas públicas dentro del bundle: `privacy.html`, `terms.html` y `support.html`. También incluye un borrador de metadatos en `docs/app-store/metadata.json` y el manifiesto de privacidad de Apple en `ios/App/App/PrivacyInfo.xcprivacy`.

Antes de enviar a revisión hay que completar los datos reales marcados como `[COMPLETAR]`, publicar esas páginas en una URL HTTPS estable y cargar esa URL en App Store Connect y Google Play Console. No se deben enviar políticas con datos inventados ni publicar mientras esos campos estén vacíos.

La app no declara permisos de micrófono, cámara, contactos, notificaciones ni ubicación del dispositivo. El pasajero ingresa nombre, origen y destino; el backend usa esos datos para gestionar el viaje y mostrar el seguimiento. El borrador de la ficha de privacidad debe ser revisado por el titular legal del servicio.

## Estado de compilación

Linux puede instalar Node, sincronizar Capacitor y preparar Android. Xcode no existe para Linux y no se puede instalar de forma compatible: para abrir, firmar, probar en iPhone y archivar la app iOS hace falta una Mac con Xcode. No se publicó ninguna aplicación.

## Próximas conexiones reales

- vencimiento y revocación del token;
- ubicación del conductor desde una app autenticada, no desde el navegador del pasajero;
- ETA calculada por el backend, cuando el CRM/proveedor entregue origen, ruta y tiempo confiables;
- dominio, Universal Links y Android App Links cuando exista la app móvil.

No se agrega login de CRM al pasajero: mezclar la identidad del usuario del panel con la del pasajero sería incorrecto. Las funciones de SOS, contactos y soporte requieren antes un contrato backend y responsables operativos; por ahora la vista no dispara efectos externos.
