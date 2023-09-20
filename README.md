# AT-HOME

## Descripción del Proyecto

At-Home es una aplicación web que te permite crear tu propio portal inmobiliario. Con esta plataforma, los visitantes pueden crear sus cuentas, confirmarlas y comenzar a publicar sus propiedades. La aplicación ofrece una amplia gama de funciones, incluyendo la posibilidad de agregar descripciones e información detallada de las propiedades, incluyendo mapas y fotografías. Además, cuenta con un formulario de contacto para que los clientes interesados puedan ponerse en contacto con los propietarios de los inmuebles. El proyecto utiliza una variedad de tecnologías y herramientas, como Express, MySQL, Sequelize, MVC, Pug, Webpack, TailwindCSS, Dropzone, Leaflet y JWT para proporcionar una experiencia completa y funcional.

## Características Principales

- Registro de usuarios: Los visitantes pueden registrarse en la plataforma creando una cuenta personal.

- Publicación de propiedades: Los usuarios registrados pueden publicar sus propiedades, proporcionando detalles como la descripción, información de la propiedad, mapas y fotografías.

- Formulario de contacto: Los clientes interesados en una propiedad pueden utilizar el formulario de contacto para comunicarse con el propietario.

- Autenticación segura: Se utiliza JSON Web Tokens (JWT) para garantizar la autenticación segura de los usuarios.

- Diseño atractivo: La interfaz de usuario está diseñada con TailwindCSS para proporcionar una experiencia visualmente atractiva y receptiva.

- Carga de imágenes simplificada: La integración de Dropzone facilita la carga de imágenes de propiedad.

- Mapas interactivos: Se utiliza Leaflet para mostrar mapas interactivos con ubicaciones de propiedades.

## Tecnologías Utilizadas

- Express: Para construir el servidor web y gestionar las rutas.

- MySQL: Base de datos relacional para almacenar la información de usuarios y propiedades.

- Sequelize: ORM (Object-Relational Mapping) para facilitar la interacción con la base de datos.

- MVC: Patrón de diseño Modelo-Vista-Controlador para una estructura organizada del proyecto.

- Pug: Motor de plantillas para generar las vistas HTML de manera dinámica.

- Webpack: Herramienta para la gestión y empaquetado de activos y recursos.

- TailwindCSS: Framework CSS para una interfaz de usuario atractiva y eficiente.

- Dropzone: Biblioteca para simplificar la carga de imágenes.

- Leaflet: Librería de mapas interactivos para mostrar ubicaciones geográficas.

- JSON Web Tokens (JWT): Para gestionar la autenticación de usuarios de manera segura.

<br/>
<br/>

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Instalación

1. Clona el repositorio en tu máquina local:

        git clone https://github.com/tu-usuario/At-Home.git

<br/>

2. Instala las dependencias:

        npm install

<br/>

3.  Configura la base de datos MySQL en config/db.js con tus credenciales.

4.  Ejecuta las migraciones para crear las tablas en la base de datos:

        npx sequelize-cli db:migrate

<br/>

5. Inicia la aplicación:

        npm start

<br/>

6. Abre tu navegador y visita:

        http://localhost:3000 para acceder a At-Home.

## Proyecto Desplegado:

