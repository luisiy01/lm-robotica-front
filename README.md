# LM Robótica - Frontend

Aplicación de gestión frontend para LM Robótica, desarrollada con **React 19**, **TypeScript** y empaquetada con **Vite**. La aplicación cuenta con módulos enfocados en la administración de alumnos, control de asistencias, visualización de dashboard y gestión de pagos.

## 🚀 Tecnologías y Herramientas

- **Framework principal:** [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Gestión de UI:** 
  - [Material-UI (MUI)](https://mui.com/) y Data Grid
  - [Tailwind CSS v4](https://tailwindcss.com/)
- **Estado global:** [Zustand](https://github.com/pmndrs/zustand)
- **Formularios y Validación:** [Formik](https://formik.org/) y [Yup](https://github.com/jquense/yup)
- **Peticiones HTTP:** [Axios](https://axios-http.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/) y MUI Icons
- **Notificaciones:** [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Exportación de datos:** react-csv-downloader

## 📁 Estructura Principal del Proyecto

El código fuente de la aplicación se encuentra alojado principalmente en la carpeta `/src`. Los módulos más importantes de la interfaz están estructurados dentro de `/src/components`:

- `/Alumnos`: Componentes y vistas para la gestión y registro de alumnos.
- `/Asistencia`: Módulo encargado del control de asistencia.
- `/Dashboard`: Panel principal de visualización de métricas y acceso rápido.
- `/Login`: Interfaz para la autenticación de usuarios al sistema.
- `/Pagos`: Administración, validación y registro de pagos.
- `/common`: Componentes reutilizables compartidos a través de la aplicación.
- `/store`: Definición de estados globales y lógica conectada usando Zustand.
- `/services` y `/lib`: Manejo de las interacciones con APIs y librerías o utilidades adicionales.

## 💻 Instalación y Uso Local

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (se recomienda la última versión LTS).

1. **Clonar el repositorio y acceder a la carpeta:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd lm-robotica-front
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de entorno:**
   Consulta el archivo `.env copy` para configurar las variables requeridas en un archivo local `.env`.

4. **Levantar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *El proyecto levantará en modo desarrollo, normalmente en el puerto configurado por Vite (ej: http://localhost:5173).*

## 📜 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

- `npm run dev`: Ejecuta la app en modo de desarrollo con HMR (Hot Module Replacement).
- `npm run build`: Ejecuta el verificador de tipos (TypeScript) y empaqueta la aplicación para producción en la carpeta `dist`.
- `npm run lint`: Ejecuta el linter (ESLint) en busca de problemas o malas prácticas en el código fuente.
- `npm run preview`: Previsualiza localmente el build de producción que ha sido generado.

## ⚙️ Reglas de Código (Linting & TypeScript)

El proyecto incluye configuraciones robustas tanto para **TypeScript** (`tsconfig.app.json` / `tsconfig.node.json`) como para **ESLint** (con reglas recomendadas y específicas para React Hooks y Fast Refresh). Cuando contribuyas, asegúrate de mantener el código limpio corriendo `npm run lint` antes de crear un PR o hacer commit.
