# JOB-DAY 💼

**Una Aplicación Web Full-Stack para la Búsqueda y Gestión de Empleo.**

### **[Visita la aplicación en vivo](https://jadator-jobday.netlify.app/)**

---

## 🚀 Credenciales de Demostración

Para explorar todas las funcionalidades de la aplicación, puedes utilizar las siguientes cuentas de prueba:

* **Rol de Administrador:** (Permite crear nuevas empresas y ofertas de trabajo).
    * **Email:** `admin@gmail.com`
    * **Contraseña:** `Admin33.`

* **Rol de Usuario/Candidato:** (Permite buscar y aplicar a ofertas, y gestionar el perfil).
    * **Email:** `user@gmail.com`
    * **Contraseña:** `User33.`

---

## 📖 Descripción del Proyecto

**JOB-DAY** es una plataforma dinámica e intuitiva desarrollada con React y Node.js, diseñada para conectar a candidatos con oportunidades laborales. La aplicación permite a los usuarios buscar ofertas de trabajo, aplicar a ellas y gestionar sus candidaturas de una manera sencilla y eficiente. Por otro lado, los administradores tienen la capacidad de publicar nuevas empresas y ofertas, manteniendo la plataforma actualizada con nuevas oportunidades.

Este proyecto integra un stack MERN (MongoDB, Express, React, Node.js) y está desplegado en plataformas líderes como Netlify para el frontend y Vercel para el backend, garantizando un rendimiento óptimo y una alta disponibilidad.

---

## ✨ Características Principales

### Para Candidatos (Rol: `usuario`):
* **Búsqueda Avanzada:** Filtra ofertas de trabajo por ubicación y/o título del puesto.
* **Gestión de Candidaturas:** Postula a ofertas con un solo clic y cancela tus postulaciones en cualquier momento.
* **Perfil de Usuario Personalizable:**
    * Edita tus datos personales.
    * Sube una imagen de perfil a **Cloudinary**.
    * Sube tu currículum en formato PDF, que se convierte y optimiza a formato de imagen para una visualización rápida.
* **Autenticación Segura:** Sistema completo de registro, inicio de sesión y cierre de sesión.
* **Notificaciones por Correo:** Recibe un email de bienvenida al registrarte gracias a la integración con **Nodemailer**.
* **Rutas Protegidas:** No puedes acceder a tu perfil o a ciertas funcionalidades sin haber iniciado sesión.

### Para Administradores (Rol: `admin`):
* **Gestión de Empresas:** Registra nuevas empresas en la plataforma.
* **Creación de Ofertas:** Publica nuevas ofertas de trabajo asociadas a una empresa existente.
* **Control Total:** Acceso a funcionalidades exclusivas para la administración del contenido de la plataforma.

### Características Técnicas Destacadas:
* **Componentes Reutilizables:** La interfaz está construida con un enfoque en la reutilización de componentes para mantener un código limpio y escalable.
* **Estado Global:** Se utiliza la **Context API** de React para una gestión eficiente del estado del usuario autenticado a lo largo de toda la aplicación.
* **Seguridad en Backend:**
    * Encriptación de contraseñas con **bcrypt** para proteger los datos de los usuarios.
    * Uso de **JSON Web Tokens (JWT)** para la gestión de sesiones y la protección de rutas de la API.
    * Implementación de **Middlewares** personalizados para la validación y autorización.
* **Paginación:** Navegación fluida a través de largas listas de ofertas de trabajo.
* **Estilos Personalizados:** Una interfaz con estilos simples pero cuidados para una experiencia de usuario agradable.

---

## 🛠️ Stack Tecnológico

#### **Frontend**
* **React.js**: Librería principal para la construcción de la interfaz.
* **React Router Dom**: Para la gestión de rutas en el lado del cliente.
* **Context API**: Para la gestión del estado global.
* **Axios**: Cliente HTTP para las peticiones a la API.
* **SweetAlert2**: Para alertas y modales atractivos y personalizables.
* **Bootstrap / React-Bootstrap**: Para una maquetación responsive y componentes base.

#### **Backend**
* **Node.js**: Entorno de ejecución del servidor.
* **Express.js**: Framework para la construcción de la API REST.
* **Mongoose**: ODM para modelar los datos de la aplicación con MongoDB.
* **MongoDB**: Base de datos NoSQL para el almacenamiento de la información.
* **JSON Web Token (JWT)**: Para la autenticación y autorización basada en tokens.
* **Bcrypt.js**: Para la encriptación segura de contraseñas.
* **Nodemailer**: Para el envío de correos electrónicos transaccionales.
* **Cors**: Para la gestión de políticas de origen cruzado.

#### **Servicios Externos y Despliegue**
* **Netlify**: Plataforma de despliegue para el frontend en React.
* **Vercel**: Plataforma de despliegue para el backend serverless en Node.js.
* **Cloudinary**: Servicio en la nube para el almacenamiento y la optimización de imágenes y archivos.

---

## ✍️ Juan Manuel Adame

Este proyecto ha sido desarrollado con gran esfuerzo pero en un periodo de tiempo limitado debido al trabajo entre otros motivos personales. Representa una aplicación práctica de los conocimientos adquiridos en el stack MERN y en la arquitectura de aplicaciones web modernas. Cada funcionalidad, desde la gestión de archivos con Cloudinary hasta la autenticación con JWT, ha sido implementada con el objetivo de crear una plataforma funcional y robusta.

Agradecería enormemente que se valorase el trabajo en **JOB-DAY**. ¡Muchas gracias!