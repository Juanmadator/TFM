const express = require('express');
const path = require("path");
const usuarioRoutes = require('./routes/userRoutes.js');
const imageRoutes = require("./routes/imageRoutes.js"); // This might become redundant if all images go through Cloudinary
const ofertasRoutes = require("./routes/ofertaTrabajoRoutes.js");
const empresaRoutes = require("./routes/empresaRoutes.js");
const uploadRoutes = require('./routes/uploadRoutes.js'); // NEW: Import your new upload routes
const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv'); // NEW: Import dotenv
const cloudinary = require('cloudinary').v2; // NEW: Import cloudinary
const fileUpload = require('express-fileupload'); // NEW: Import express-fileupload

dotenv.config(); // NEW: Load environment variables

const app = express();

// NEW: Cloudinary Configuration - Place it before routes that use it
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Strongly recommended
});

app.use(cors());

app.use(express.json());

app.use(mongoSanitize());

// NEW: Express-fileupload middleware - Place it after express.json()
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/', // Ensure this directory exists or is writable
  limits: { fileSize: 50 * 1024 * 1024 }, // Example: 50MB file size limit
  createParentPath: true
}));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Demasiadas peticiones desde esta IP, intenta más tarde.',
// });
// app.use(limiter);

// Note: If all image serving will be from Cloudinary, you might not need this line:
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Your existing API routes
app.use("/api/images", imageRoutes); // Keep this if you still have local image serving
app.use('/api/usuarios', usuarioRoutes);
app.use("/api/empresas", empresaRoutes);
app.use("/api/ofertas",ofertasRoutes);

// NEW: Use the upload routes
app.use('/api/uploads', uploadRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;