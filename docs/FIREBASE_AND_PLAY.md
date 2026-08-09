# Firebase y publicación en Google Play

## Firebase

La arquitectura deja un adaptador de Analytics listo, pero no versiona credenciales. Para activarlo:

1. Crear una app Android en Firebase con el paquete `com.maurotrejo.portfolio`.
2. Descargar `google-services.json` en `android/app/`.
3. Instalar `@react-native-firebase/app`, `analytics` y `crashlytics`.
4. Aplicar los plugins de Google Services y Crashlytics siguiendo la documentación oficial.
5. Reemplazar el cuerpo del adaptador `src/services/analytics/analytics.ts`.

`google-services.json` está ignorado para evitar publicar configuración de entornos antes de decidir el proyecto Firebase definitivo.

## Firma de Google Play

1. Crear el keystore de producción y guardarlo fuera del repositorio.
2. Copiar `android/keystore.properties.example` como `android/keystore.properties`.
3. Completar las cuatro propiedades con valores reales.
4. Ejecutar `npm run android:release` para generar el Android App Bundle.

El build de release no reutiliza la clave debug. El keystore y sus contraseñas nunca deben subirse a Git.
