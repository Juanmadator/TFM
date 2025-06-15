// src/features/company/CreateCompany.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/Register.module.css';
import { companyService } from '../../services/api'; // Ensure companyService is imported
// import { imageUploadService } from '../../services/imageUploadService'; 
import useAlerts from '../../hooks/useAlert'; // Assuming you have this hook

export const CreateCompany = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  // Changed: url_logo will be set after image upload, not directly from input
  const [selectedLogoFile, setSelectedLogoFile] = useState(null); // State to hold the selected file object
  const [email_contacto, setEmailContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [userId, setUserId] = useState(null); // To store the user_id from localStorage

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // New state to indicate image upload is in progress

  const navigate = useNavigate();
  const { showToast, showLoadingAlert, closeAlert } = useAlerts();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Assuming user object has an _id field (common for MongoDB IDs)
    if (user && user.id) {
      setUserId(user.id);
    } else {
      // Handle case where user is not logged in or user_id is not available
      showToast('error', 'Error', 'No se pudo obtener el ID de usuario. Inicia sesión.');
      // Optionally redirect to login if userId is mandatory for this form
      // navigate('/login');
    }
  }, [showToast]); // navigate removed from dependency array as it's not directly used for state update

  const handleFileChange = (e) => {
    // Set the selected file when the input changes
    setSelectedLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      showToast('error', 'Error', 'ID de usuario no disponible. Asegúrate de estar loggeado.');
      return;
    }

    setLoading(true);
    showLoadingAlert('Creando empresa...', 'Por favor espera.');

    let logoUrl = ''; // This variable will hold the Cloudinary URL after upload

    try {
      // 1. Upload the image if a file has been selected
      if (selectedLogoFile) {
        setImageUploading(true);
        // Show a temporary alert for image upload
        showLoadingAlert('Subiendo logo...', 'Esto puede tardar un momento.');
        
        logoUrl = await imageUploadService.uploadImage(selectedLogoFile);
        
        setImageUploading(false);
        closeAlert(); // Close the image upload specific alert
        showLoadingAlert('Creando empresa...', 'Casi terminamos.'); // Re-show the main alert
      }

      // 2. Prepare the company data, including the obtained logo URL
      const companyData = {
        nombre,
        descripcion,
        url_logo: logoUrl, // Use the URL obtained from imageUploadService
        email_contacto,
        direccion,
        user_id: userId,
      };

      // 3. Send the company data to your backend
      const response = await companyService.createCompany(companyData);

      closeAlert(); // Close the final alert
      showToast('success', '¡Empresa Creada!', response.data.message || 'La empresa ha sido registrada con éxito.');

      setTimeout(() => {
        navigate('/empresas'); // Redirect to a company list or dashboard page
      }, 1500);

    } catch (error) {
      closeAlert();
      let errorMessage = 'Hubo un problema al registrar la empresa. Inténtalo de nuevo.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message.includes('Error al subir la imagen')) { // Check for specific error message from image service
        errorMessage = error.message; // Use the message from the imageUploadService
      }
      showToast('error', 'Error', errorMessage);
      console.error('Error al crear empresa en el componente:', error.response?.data || error.message || error);
    } finally {
      setLoading(false);
      setImageUploading(false); // Ensure imageUploading is reset
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.registerTitle}>Registrar Empresa</h2>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.formColumns}>
            {/* Columna Izquierda */}
            <div className={styles.column}>
              <div className={styles.inputGroup}>
                <input
                  id="company-nombre"
                  type="text"
                  className={styles.inputField}
                  placeholder='Nombre de la Empresa'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  disabled={loading || imageUploading} // Disable inputs during any loading phase
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  id="company-email"
                  type="email"
                  className={styles.inputField}
                  placeholder='Email de Contacto'
                  value={email_contacto}
                  onChange={(e) => setEmailContacto(e.target.value)}
                  required
                  disabled={loading || imageUploading}
                />
              </div>

              {/* Input for Logo Upload */}
              <div className={styles.inputGroup}>
                {/* Custom styled label for file input */}
                <label 
                  htmlFor="company-logo-upload" 
                  className={`${styles.fileInputLabel} ${selectedLogoFile ? styles.hasFile : ''}`}
                >
                  {selectedLogoFile ? selectedLogoFile.name : 'Subir Logo (PNG, JPG)'}
                </label>
                <input
                  id="company-logo-upload"
                  type="file" // Change type to 'file'
                  className={styles.hiddenFileInput} // Hide the default file input
                  onChange={handleFileChange}
                  disabled={loading || imageUploading}
                  accept="image/png, image/jpeg, image/jpg" // Restrict file types
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className={styles.column}>
              <div className={styles.inputGroup}>
                <textarea
                  id="company-descripcion"
                  className={styles.inputField}
                  placeholder='Descripción de la Empresa'
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  disabled={loading || imageUploading}
                  rows="4" // Make textarea larger
                ></textarea>
              </div>

              <div className={styles.inputGroup}>
                <input
                  id="company-direccion"
                  type="text"
                  className={styles.inputField}
                  placeholder='Dirección'
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                  disabled={loading || imageUploading}
                />
              </div>
            </div>
          </div> {/* End of formColumns */}

          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading || imageUploading} // Disable button during any loading phase
          >
            {loading ? 'Registrando Empresa...' : (imageUploading ? 'Subiendo logo...' : 'Registrar Empresa')}
          </button>
        </form>
        <div className={styles.loginPrompt}> {/* Reusing this class for general links/prompts */}
          <a href="/empresas" className={styles.loginLink}>Volver a la lista de empresas</a>
        </div>
      </div>
    </div>
  );
};