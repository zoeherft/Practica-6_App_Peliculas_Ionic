# PelículasApp

Aplicación móvil hecha con Ionic + Angular que consume la API de The Movie Database (TMDb) para listar estrenos, películas populares y permitir búsquedas con detalle ampliado en un modal.

## Tecnologías y dependencias

- [Ionic Framework](https://ionicframework.com/) 8
- [Angular](https://angular.io/) 20
- [RxJS](https://rxjs.dev/) para manejo de observables y peticiones
- [TMDb API](https://developers.themoviedb.org/3) como fuente de datos
- Standalone components/pipes (`DetalleComponent`, `ImagenPipe`) para simplificar módulos

Dependencias principales (ver `package.json` para lista completa):

```json
"dependencies": {
  "@ionic/angular": "^8.0.0",
  "@angular/core": "^20.0.0",
  "rxjs": "~7.8.0"
}
```

## Instalación y ejecución local

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPO>
   cd PelículasApp
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (añade tu API key de TMDb en `src/environments/environment.ts`):
   ```ts
   export const environment = {
     production: false,
     url: 'https://api.themoviedb.org/3',
     imgPath: 'https://image.tmdb.org/t/p',
     apiKey: 'TU_API_KEY',
   };
   ```

4. **Ejecutar localmente**
   ```bash
   npm start
   ```
   Esto levanta `ng serve` (o usa `ionic serve` si tienes la CLI instalada).

5. **Build de producción (opcional)**
   ```bash
   npm run build
   ```

La aplicación quedará disponible en `http://localhost:8100/` (o el puerto que defina Angular/Ionic). ¡Listo!
