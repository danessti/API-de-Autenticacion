// Importo el marco de trabajo para crear aplicaciones web y API's en Node.js
const express = require('express');

// Importo el módulo que permite generar y verificar tokens para autenticación (JWT)
const jwt = require('jsonwebtoken');

// Importa el módulo para cifrar y comparar las contraseñas de forma segura
const bcrypt = require('bcryptjs');

// Inicializo la aplicación de Express
const app = express();

// Middleware para permitir que el servidor lea datos JSON en el cuerpo de las solicitudes
app.use(express.json());

// Simulamos un usuario con una lista simple que representa una base de datos de usuarios
const users = [
    {
        id: 1,
        username: 'user1',
        // Almacenamos la contraseña cifrada para mayor seguridad
        password: bcrypt.hashSync('password123', 10) // Cifra la contraseña con 10 rondas de salting
    }
];

// Clave secreta para firmar y verificar tokens JWT
const JWT_SECRET = 'your_secret_key';

// Ruta de login para autenticación
app.post('/login', (req, res) => {
    // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;

    // Verifica si el usuario existe en la base de datos (lista de usuarios)
    const user = users.find(u => u.username === username);
    if (!user) {
        // Si el usuario no existe, responde con un error 400
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verifica si la contraseña ingresada coincide con la almacenada (cifrada)
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        // Si la contraseña es incorrecta, responde con un error 400
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT usando el id y el nombre de usuario, y establece una expiración de 1 hora
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Devuelve el token al cliente para que lo use en futuras solicitudes
    res.json({ token });
});

// Middleware para proteger rutas verificando el token JWT
const authenticateToken = (req, res, next) => {
    // Extrae el token del encabezado de autorización, si existe
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        // Si no hay token, responde con un error 401 (no autorizado)
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        // Verifica el token usando la clave secreta
        const verified = jwt.verify(token, JWT_SECRET);
        // Si es válido, añade la información del token al objeto `req.user` para usarla después
        req.user = verified;
        // Llama a la siguiente función en la cadena de middleware
        next();
    } catch (error) {
        // Si el token es inválido, responde con un error 400
        res.status(400).json({ message: 'Token no válido' });
    }
};

// Ruta protegida que requiere un token JWT válido para acceder
app.get('/protected', authenticateToken, (req, res) => {
    // Responde con un mensaje de bienvenida que incluye el nombre del usuario autenticado
    res.json({ message: `Bienvenido, ${req.user.username}!` });
});

// Especifica el puerto en el que se ejecutará la aplicación (3000 por defecto)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // Muestra un mensaje en la consola indicando que el servidor está en funcionamiento
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});