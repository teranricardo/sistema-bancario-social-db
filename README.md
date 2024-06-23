# sistema-bancario-social-db
Este proyecto es una continuación de la actividad anterior, implementando un backend para un Sistema Bancario Social con almacenamiento persistente y operaciones CRUD.

## Características
- Gestión de usuarios, préstamos, cuentas de ahorro y cooperativas.
- Operaciones CRUD completas para todas las entidades.
- Almacenamiento persistente utilizando MySQL.
- Interfaz de usuario para la gestión de usuarios y cuentas de ahorro.
- Endpoints para todas las operaciones.
- Uso de clases y promesas para una mejor estructura y manejo asíncrono.

## Tecnologías utilizadas
- Node.js
- Express.js
- MySQL
- EJS (para las vistas)
- HTML y CSS

## Instalación
- **1.** Clona el repositorio:
```
git clone https://github.com/teranricardo/sistema-bancario-social-db.git
```
- **2.**  Ingresa al directorio del proyecto:
```
cd sistema-bancario-social-db
```
- **3.**  Instala las dependencias:
```
npm install
```
- **4.**  Importa la base de datos MySQL que se encuentra en la carpeta `db`.
- **5.** Configura las variables de entorno en un archivo `.env`. Puedes basarte en el archivo `.env.example` proporcionado.

## Uso
- **1.** Ejecuta la aplicación: 
```
npm start
```
- **2.**  El servidor estará escuchando en el puerto `3000`.
- **3.**  Utiliza las rutas y métodos HTTP definidos en el servidor para interactuar con el Sistema Bancario Social, además puedes utilizar las vistas de usuarios y cuentas de ahorro para una mejor experiencia.
