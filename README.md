# Sistema de Adopción de Mascotas Rescatadas: 
<p align="center"><img src="https://github.com/LordZapallo/Adopcion-Mascotas/blob/main/public/imagenes/avt.png" width="400"></p>



<!--[![Everything Is AWESOME](https://img.youtube.com/vi/TKLimF9yoJ8/0.jpg)](https://github.com/LordZapallo/Adopcion-Mascotas/blob/main/db/video.mkv "Everything Is AWESOME")-->

## Sobre el Proyecto 🚀
Aplicación Web con el objetivo de facilitar a cualquier persona el proceso de adopción de Mascotas rescatadas que viven Albergues, la aplicación gestiona todos los aspectos del proceso vía online, siendo el único paso presencial pasando el proceso exitosamente el acudir al albergue a retirar su mascota adoptada.

## Autor 📋
Autor: Michael Andrés Gómez Núñez.  <br>   Universidad: Universidad Técnoca Particular de Loja

### Pre-requisitos 📋
Servidor de Base de Datos My-SQL. como: XAMPP, WAMPP, etc. 
Recomendacion de Descarga: <a href="https://www.apachefriends.org/es/download.html">XAMPP</a><br> 
Instalado Node.js 
Descarga: <a href="https://nodejs.org/es/download/">Node.js</a><br> 
Instalado Composer 
Descarga: <a href="https://getcomposer.org/download/">Composer</a>
## Instalación 🔧
1. Descargar Repositorio:
```
git clone https://github.com/LordZapallo/Adopcion-Mascotas.git 
```
2. Importar Base de Datos: 
 Base de Datos Script SQL:  <a href="https://github.com/LordZapallo/Adopcion-Mascotas/blob/main/db/mascotas.sql">mascotas.sql</a>
```
Ubicacion Repositorio:  db/mascotas.sql
```
3. Instalar Dependencias:
 Donde se descargo el repositorio abrir una terminal y ejecutar:
```
npm install
composer install
```
4. Configurar archivo .env (directorio raíz) para conexion de base de datos.
 seguir instrucciones de paréntesis.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1(insertar Host de conexión)
DB_PORT=3306 (puerto de conexión)
DB_DATABASE=mascotas (nombre de base de datos )
DB_USERNAME=root (usuario conexión)
DB_PASSWORD=*** (contraseña conexión)
```
5. Ejecutar Proyecto: en terminal del proyecto.
elegir una opción
```
npm run watch (mantendra consola ejecutandose)
npm run dev (una sola ejecucion)
```
6. Ejecutar Servidor Laravel (composer) en otra terminal:
```
php artisan serve (matenerla ejecutando)
```
7. Abrir link de servidor artisan en navegador:
al ejecutar la sentencia anterior la terminal nos respondera la URL de ejecución de la aplicación web.  (por defecto)
```
Laravel development server started: http://127.0.0.1:8000
```
En este punto la aplicación Web estara corriendo en us servidor local.
</b>
## Cuentas de Usuario de Inicio de Sesion📌
<p align="center"><img src="https://github.com/LordZapallo/Adopcion-Mascotas/blob/main/entregables/pagina-inicio.png" width="200"></p><br> 

1. Usuario Supervisor:
```
Usuario: admin@gmail.com
Contraseña: 123456
```
2. Usuario Regular:
```
Usuario: user@gmail.com
Contraseña: 123456
```
<br> 

## Detalles para Desarrolladores ⚙️
La solución está desarrollada con: Framework Lavarel – Vue.js – MySQL.<br> 
Para mas detalles por favor revisar Archivo: <a href="https://github.com/LordZapallo/Adopcion-Mascotas/blob/main/package.json">package.json</a>

## Licencia 📄
El Proyecto es una iniciativa academica por lo cual es de licencia open-sourced.
