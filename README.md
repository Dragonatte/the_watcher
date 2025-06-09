# The Watcher

**The Watcher** es una aplicación web para seguir películas y series, gestionar listas de favoritos y recibir notificaciones por correo cuando haya novedades.

## 📦 Tech Stack

* **Frontend & Backend**: Next.js 14 (App Router) con TypeScript
* **Base de datos**: PostgreSQL vía **Prisma ORM**
* **Estilos**: Tailwind CSS + HeroUI
* **API Externa**: The Movie Database (TMDB) API
* **Emails**: Resend
* **Autenticación**: Contraseñas hasheadas con bcrypt

## 🔧 Prerrequisitos

* Node.js >= 18
* npm, Yarn, pnpm o bun
* Base de datos PostgreSQL en ejecución
* Claves de API y variables de entorno (ver sección **Variables de Entorno**)

## 📂 Instalación y arranque

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/Dragonatte/the_watcher.git
   cd the_watcher
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configurar variables de entorno**:
   Copia el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   Rellena las siguientes variables en `.env`:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
   TMDB_API_KEY=tu_api_key_de_tmdb
   RESEND_API_KEY=tu_api_key_de_resend
   NEXTAUTH_SECRET=alguna_clave_secreta_larga
   ```

4. **Migraciones y seed**:

   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Arrancar en modo desarrollo**:

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

   Se levanta en [http://localhost:3000](http://localhost:3000)

## ⚙️ Scripts disponibles

En `package.json` encontrarás:

| Script       | Descripción                       |
|--------------|-----------------------------------|
| `dev`        | Levanta la app en modo desarrollo |
| `build`      | Compila para producción           |
| `start`      | Inicia servidor de producción     |
| `lint`       | Ejecuta ESLint sobre el código    |
| `format`     | Formatea el código con Prettier   |
| `db:migrate` | Ejecuta migraciones de Prisma     |
| `db:seed`    | Inserta datos de ejemplo          |
| `test`       | Ejecuta tests (por configurar)    |

## 🌐 Variables de Entorno

| Variable          | Descripción                                     |
|-------------------|-------------------------------------------------|
| `DATABASE_URL`    | Conexión a PostgreSQL                           |
| `TMDB_API_KEY`    | API Key de The Movie Database                   |
| `RESEND_API_KEY`  | API Key de Resend para envío de correos         |
| `NEXTAUTH_SECRET` | Secreto para cifrar tokens de sesión (NextAuth) |

## 🛠️ Configuración de CI/CD

Se recomienda añadir en tu pipeline:

1. **Instalación**: `npm ci`
2. **Lint**: `npm run lint`
3. **Build**: `npm run build`
4. **Tests**: `npm run test`

## 📚 Documentación adicional

* `/docs/` *(pendiente)* para diagramas de arquitectura y flujos de datos.
* Swagger o Postman Collection para la API (en desarrollo).

## 📝 Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama (`git checkout -b feature/nombre`).
3. Commit de tus cambios (`git commit -m 'feat: descripción'`).
4. Push a la rama (`git push origin feature/nombre`).
5. Abre un Pull Request.

## ⚖️ Licencia

Este proyecto está bajo la licencia MIT. ¡Puedes usarlo y adaptarlo libremente!
