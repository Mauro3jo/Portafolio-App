# Mauro Trejo Portfolio — Android

Aplicación móvil nativa del portfolio profesional de Mauro Trejo. Está construida con React Native CLI y TypeScript, sin Expo, y orientada exclusivamente a Android y Google Play.

## Requisitos

- Node.js 20.19.4, 22.13 o 24.3 en adelante (Node 23 no es compatible)
- JDK 17
- Android Studio y Android SDK
- Un emulador iniciado o un dispositivo Android con depuración USB

## Desarrollo

Instalar dependencias:

```bash
npm install
```

Iniciar Metro:

```bash
npm start
```

En otra terminal, compilar e instalar la app:

```bash
npm run android
```

## Verificaciones

```bash
npm run lint
npm test -- --runInBand
```

El identificador Android es `com.maurotrejo.portfolio`. Los archivos privados de firma y `google-services.json` están excluidos de Git.
