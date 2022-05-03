# Angular-app
Web Frontend. Posts and Administration UI

# How to Develop

Install node 16
Copy environment.example.ts to environment.ts or environment.prod.ts if building for production

Install node dependencies.
```$ npm install ```

Start the development server
```$ npm start ```

By default the app is listening in the 4200 port.

### Using docker

Build the dist folder
```$npm run build [-- --prod](for production)```

Fire up a container with composer.
```$ docker-compose up ```

By default the dockerized app is listening in the 8081 port.

# Features

### Routes
https://github.com/Raul-Espinoza-FS/Angular-app/blob/master/src/app/app.routing.ts

### Guards
https://github.com/Raul-Espinoza-FS/Angular-app/blob/master/src/app/services/shared/auth.guard.ts

### Interceptors
https://github.com/Raul-Espinoza-FS/Angular-app/blob/master/src/app/services/shared/token.interceptor.ts

### Services
https://github.com/Raul-Espinoza-FS/Angular-app/tree/master/src/app/services

### Modules and Components
https://github.com/Raul-Espinoza-FS/Angular-app/tree/master/src/app/views

### Layouts
https://github.com/Raul-Espinoza-FS/Angular-app/tree/master/src/app/containers

### Permissions Management
https://github.com/Raul-Espinoza-FS/Angular-app/blob/master/src/app/services/shared/permissions.guard.ts

### Navigation
https://github.com/Raul-Espinoza-FS/Angular-app/blob/master/src/app/_nav.ts