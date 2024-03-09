# Nombre del Proyecto

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png" alt="Laravel" height="90" style="margin-right: 20px;" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="React" height="90" style="margin-left: 20px;" />
</div>


Backend y Frontend de una Aplicación de Tareas

Este proyecto consiste en un backend y un frontend para una aplicación de gestión de tareas. El backend proporciona una API para crear, leer, actualizar y eliminar tareas, así como para administrar los estados de las mismas. El frontend es una interfaz de usuario que permite a los usuarios interactuar con la API para gestionar sus tareas de forma eficiente.

## Instalación

### Instalación del Backend (Laravel)

Para instalar las dependencias del backend, asegúrate de tener PHP >=8 Composer instalado y luego ejecuta el siguiente comando dentro del directorio del backend:

```bash
composer install
```

## Configuración de la Base de Datos

Una vez instalado, dentro de tu editor de Base de Datos (por ejemplo, MySQL Workbench), crea una nueva base de datos con el siguiente nombre:

```sql
CREATE DATABASE prueba_sintec;
```

Luego ejecutamos los siguientes comandos para realizar las Migraciones y asi crearemos las tablas en base de datos

```bash
php artisan migrate
```
Y el siguiente comando realizara el Seeder para la tabla de Estados, necesaria para crear las Tareas en la aplicación

```bash
php artisan db:seed --class=EstadosSeeder
```
Y finalmente el siguiente comando para crear el usuario por defecto con el cual vamos a iniciar sesión

```bash
php artisan db:seed --class=EstadosSeeder
```

Podemos ejecutar el proyecto backend con el siguiente comando:

```bash
php artisan serve
```

### Instalación del Frontend (React)

Para instalar las dependencias del frontend, abrimos otra consola, y ademas, asegúrate de tener NodeJs v20 instalado y luego ejecuta el siguiente comando dentro del directorio del frontend:

```bash
npm install
```

Podemos ejecutar el proyecto frontend con el siguiente comando:

```bash
npm run dev
```

Es imporante recordar las credenciales por defecto para iniciar sesión pues este proyecto tiene configurado JWT Token:

Usuario: stebanlondo75@gmail.com

Constraseña: Pruebas02

.
