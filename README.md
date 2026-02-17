# Acertijos

Aplicación móvil de acertijos educativos construida con **Ionic React**, **Vite** y **Capacitor**.

Los usuarios resuelven acertijos de opción múltiple organizados por niveles de dificultad (básico, intermedio, avanzado) y categorías temáticas. La app lleva puntaje, controla el tiempo por acertijo y muestra los resultados al final.

---

## Requisitos previos

- **Node.js** >= 18
- **npm** >= 9
- **Ionic CLI**: `npm install -g @ionic/cli`

---

## Instalación

```bash
npm install
```

---

## Desarrollo local

```bash
npm run dev
```

Abre el navegador en `http://localhost:5173`.

---

## Build y generación del ZIP

El comando `npm run build` ejecuta toda la cadena de construcción:

```bash
npm run build
```

### Pasos que ejecuta internamente

| Paso | Script | Descripción |
|------|--------|-------------|
| 1 | `build:web` | Compila la app web con Vite (genera la carpeta `dist/`). |
| 2 | `build:android` | Agrega la plataforma Android con Capacitor (si no existe la carpeta `android/`). |
| 3 | `build:android:sync` | Copia los assets web compilados (`dist/`) al proyecto Android. |
| 4 | `patch:capacitor` | Parchea los archivos Gradle para usar dependencias de Maven en lugar de referencias locales. |
| 5 | `clean:assets` | **Elimina archivos innecesarios** del proyecto Android para reducir el tamaño del ZIP. |
| 6 | `zip:android` | Comprime la carpeta `android/` en `android-base.zip`. |

### Archivos eliminados en `clean:assets`

Para optimizar el tamaño del ZIP resultante, se borran los siguientes archivos y carpetas del proyecto Android que **no son necesarios** para la distribución:

- **Caché de Gradle**: `android/.gradle/`
- **Configuración de IDE (Android Studio)**:
  - `android/.idea/caches/`
  - `android/.idea/AndroidProjectSystem.xml`
  - `android/.idea/compiler.xml`
  - `android/.idea/deploymentTargetSelector.xml`
  - `android/.idea/gradle.xml`
  - `android/.idea/migrations.xml`
  - `android/.idea/misc.xml`
  - `android/.idea/runConfigurations.xml`
  - `android/.idea/vcs.xml`
- **Artefactos de compilación**:
  - `android/app/build/`
  - `android/build/`
  - `android/capacitor-cordova-android-plugins/build/`
- **Configuración local**: `android/local.properties`
- **Tests de Android**: `android/app/src/androidTest/`, `android/app/src/test/`
- **Otros**: `android/.gitignore`

Todos estos archivos se regeneran automáticamente al abrir el proyecto en Android Studio o al compilar con Gradle.

### Resultado

El build produce un archivo **`android-base.zip`** (~570 KB) en la raíz del proyecto, listo para ser distribuido o abierto en Android Studio.

---

## Archivo de configuración: `acertijos-config.json`

La app carga su configuración en tiempo de ejecución desde:

```
public/config/acertijos-config.json
```

Este archivo permite personalizar el comportamiento de la app **sin modificar el código fuente**. Ver `acertijos-config.example.json` para un ejemplo completo.

### Opciones disponibles

| Campo | Descripción |
|-------|-------------|
| `nombreApp` | Nombre que se muestra en la app. |
| `version` | Versión de la app. |
| `descripcion` | Descripción breve de la app. |
| `fecha` | Fecha de creación en formato ISO (`YYYY-MM-DD`). |
| `plataformas` | Plataformas destino. Valores posibles: `"web"`, `"android"`, `"ios"`. |
| `nivel` | Nivel de dificultad. Valores: `"basico"`, `"intermedio"`, `"avanzado"`. |
| `problematicas` | Lista de IDs de acertijos predefinidos a incluir. |

### Selección de acertijos por ID (`problematicas`)

La forma recomendada de seleccionar acertijos es mediante el campo `problematicas`, que recibe un arreglo de IDs predefinidos:

```json
{
  "nivel": "avanzado",
  "problematicas": [
    "fotosintesis",
    "fototropismo",
    "autotrofos"
  ],
  "nombreApp": "Acertijos",
  "version": "12",
  "descripcion": "Juego de acertijos",
  "fecha": "2026-02-16",
  "plataformas": [
    "web",
    "android"
  ]
}
```

### IDs disponibles

Los IDs de ejercicios:

| Nivel | IDs |
|-------|-----|
| Básico | `fotosintesis` |
| Básico | `respiracion` |
| Básico | `autotrofos` |
| Básico | `reproduccion` |
| Básico | `fototropismo` |
| Básico | `edad` |
| Básico | `fraccion` |
| Básico | `canicas` |
| Básico | `cifras` |
| Básico | `multiplo` |
| Intermedio | `cerebro` |
| Intermedio | `pulmones` |
| Intermedio | `estomago` |
| Intermedio | `rinones` |
| Intermedio | `higado` |
| Intermedio | `intestino` |
| Intermedio | `musculo` |
| Intermedio | `ojo` |
| Intermedio | `cuadrado` |
| Intermedio | `rombo` |
| Intermedio | `pentagono` |
| Intermedio | `hexagono` |
| Intermedio | `octagono` |
| Intermedio | `circulo` |
| Intermedio | `semicirculo` |
| Intermedio | `trapecio` |
| Avanzado | `viral` |
| Avanzado | `dtp` |
| Avanzado | `polio` |
| Avanzado | `tetanos` |
| Avanzado | `hepatitis` |
| Avanzado | `paperas` |
| Avanzado | `rotavirus` |
| Avanzado | `bcg` |
| Avanzado | `influenza` |
| Avanzado | `varicela` |
| Avanzado | `prismaRectangular` |
| Avanzado | `cubo` |
| Avanzado | `prisma` |
| Avanzado | `piramide` |
| Avanzado | `esfera` |
| Avanzado | `cilindro` |
| Avanzado | `cono` |
| Avanzado | `tetraedro` |
| Avanzado | `octaedro` |
| Avanzado | `dodecaedro` |
