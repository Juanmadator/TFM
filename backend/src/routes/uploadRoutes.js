// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2; // Make sure v2 is used
const { verificarToken } = require('../middlewares/authMiddleware.js'); // Your auth middleware
const User = require('../models/User'); // IMPORTANT: Adjust path to your User Mongoose model

// Helper function to delete temporary files created by express-fileupload
const fs = require('fs');
const deleteTempFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting temporary file:", err);
        });
    }
};

// Route to Upload User Profile Image
router.post('/profile-image', verificarToken, async (req, res, next) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo de imagen. Por favor, sube un archivo llamado "image".' });
        }

        const userId = req.usuario.id; // Get user ID from the token (assuming it's set by verificarToken)
        const file = req.files.image;

        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedImageTypes.includes(file.mimetype)) {
            deleteTempFile(file.tempFilePath);
            return res.status(400).json({ message: 'Tipo de archivo inválido. Solo se permiten imágenes JPEG, PNG, GIF, WEBP.' });
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: `user_profiles/${userId}`,
            resource_type: 'image',
            transformation: [
                { width: 200, height: 200, crop: "fill", gravity: "face" },
                { radius: "max" }
            ],
        });

        await User.findByIdAndUpdate(userId, { url_perfil_img: result.secure_url });

        deleteTempFile(file.tempFilePath);

        res.status(200).json({
            message: 'Imagen de perfil subida y actualizada con éxito.',
            url: result.secure_url,
            public_id: result.public_id
        });

    } catch (error) {
        console.error('Error al subir imagen de perfil a Cloudinary:', error);
        if (req.files && req.files.image && req.files.image.tempFilePath) {
            deleteTempFile(req.files.image.tempFilePath);
        }
        next(error); // Pass error to your error handling middleware
    }
});

// Route to Upload User Resume (PDF)
router.post('/resume', verificarToken, async (req, res, next) => {
    try {
        if (!req.files || !req.files.pdf) {
            // Updated message to reflect it's for image transformation from PDF
            return res.status(400).json({ message: 'No se ha subido ningún archivo PDF. Por favor, sube un archivo llamado "pdf" para generar la imagen del currículum.' });
        }

        const userId = req.usuario.id; // Using req.usuario.id as per your confirmation
        const file = req.files.pdf;

        // Keep PDF mimetype validation, as the source file is still a PDF
        if (file.mimetype !== 'application/pdf') {
            deleteTempFile(file.tempFilePath);
            return res.status(400).json({ message: 'Tipo de archivo inválido. Solo se permiten archivos PDF para el currículum (para ser transformado en imagen).' });
        }

        const user = await User.findOne({_id:userId});
        console.log(user)
        if (!user) {
            deleteTempFile(file.tempFilePath);
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // --- MODIFICACIÓN CLAVE AQUÍ: Transformar PDF a Imagen ---
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: `user_resumes/${userId}`,
            resource_type: 'image', // <--- CAMBIO: Súbelo como un recurso de imagen
            format: 'jpg',          // <--- AÑADIDO: Formato de la imagen de salida (e.g., jpg, png)
            pages: '1',             // <--- AÑADIDO: Solo la primera página del PDF
            public_id: `cv_preview_${userId}_${Date.now()}`, // <--- MODIFICADO: Nuevo public_id, sin .pdf aquí, porque el formato lo da 'format'
            // Opcional: Añadir transformaciones para el preview de la imagen
            transformation: [
                { width: 800, crop: "limit" }, // Limita el ancho a 800px, ajusta la altura proporcionalmente
                { quality: "auto" }           // Calidad automática
            ],
            type: 'upload' // Asegúrate de que sea público si lo necesitas
        });

        // La URL devuelta ahora será la de la imagen (e.g., .jpg)
        await User.findByIdAndUpdate(userId, { url_curriculum: result.secure_url });

        deleteTempFile(file.tempFilePath);

        res.status(200).json({
            message: 'Currículum subido y transformado a imagen con éxito.',
            url: result.secure_url, // Esta URL será ahora una URL de imagen
            public_id: result.public_id
        });

    } catch (error) {
        console.error('Error al subir y transformar currículum a imagen en Cloudinary:', error);
        if (req.files && req.files.pdf && req.files.pdf.tempFilePath) {
            deleteTempFile(req.files.pdf.tempFilePath);
        }
        next(error); // Pass error to your error handling middleware
    }
});
// Route to get a user's resume (assuming you want to serve it from your backend)
// Endpoint: GET /api/uploads/resume/:userId
// Note: This directly sends the Cloudinary URL. Browsers will typically download PDFs.
router.get('/resume/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        if (!user.url_curriculum) {
            return res.status(404).json({ message: 'Currículum no encontrado para este usuario.' });
        }

        // Redirect to the Cloudinary URL to initiate download/view
        res.redirect(user.url_curriculum);

    } catch (error) {
        console.error('Error al obtener currículum:', error);
        next(error);
    }
});


module.exports = router;