# API de Autenticación con JWT

## Descripción

Esta API implementa un sistema de autenticación utilizando JSON Web Tokens (JWT). Permite a los usuarios autenticarse y acceder a rutas protegidas mediante el uso de tokens.

---

## Pregunta de Evaluación Técnica

Imagina que estás desarrollando una API que implementa autenticación utilizando JSON Web Tokens (JWT). Completa las siguientes tareas:

1. **Login**: Implementa una ruta POST `/login` que permita a un usuario autenticarse utilizando un nombre de usuario y contraseña. Si las credenciales son correctas, debe devolver un token JWT que expira en 1 hora.
   - El nombre de usuario y contraseña son proporcionados en el cuerpo de la solicitud.
   - Si el nombre de usuario o la contraseña son incorrectos, la API debe devolver un mensaje de error adecuado.

2. **Rutas protegidas**: Crea una ruta GET `/protected` que solo sea accesible si se proporciona un token JWT válido en el encabezado de la solicitud. Si no se proporciona un token o si es inválido, debe devolver un error de autenticación.

3. **Validación**: Implementa la lógica para validar el token JWT en las solicitudes a rutas protegidas. Explica brevemente cómo funciona esta validación.

---

## Criterios de Evaluación

- Correcta implementación de autenticación con JWT.
- Manejo adecuado de errores (credenciales incorrectas, token inválido o ausente).
- Estructura y organización del código.
- Seguridad en el manejo de contraseñas (ej. encriptación con bcrypt).
- Capacidad de explicar cómo funciona la validación de tokens en las rutas protegidas.

---

Esta pregunta evalúa habilidades en Node.js, seguridad básica con JWT, manejo de solicitudes HTTP y rutas protegidas.
