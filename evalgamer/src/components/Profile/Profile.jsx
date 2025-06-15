// src/pages/Perfil.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"; // For the edit icon
import { useTranslation } from "react-i18next";
import styles from "./Profile.module.css"; // Import the CSS Module

function Perfil() {
  const { t } = useTranslation();

  // Dummy user data - in a real app, this would come from state or an API
  const userData = JSON.parse(localStorage.getItem("usuario")) || {
    nombre: "Juan Manuel Adame Torronteras",
    nacimiento: "27/02/2004",
    estadoActual: "Desempleado",
    correo: "juanmadametor@gmail.com",
    dni: "49834999W",
    imageUrl:
      "https://via.placeholder.com/200/cccccc/000000?text=Profile+Image", // Replace with a real image URL
  };

  const handleEditImage = () => {
    console.log("Editar imagen clicked");
    // Logic to open image upload modal/dialog
  };

  const handleEditData = () => {
    console.log("Editar datos clicked");
    // Logic to open data edit modal/form
  };

  const handleDownloadCV = () => {
    console.log("Descargar CV clicked");
    // Logic to download CV
  };

  const handleEditCV = () => {
    console.log("Editar CV clicked");
    // Logic to edit CV
  };

  const handleUploadCV = () => {
    console.log("Subir CV clicked");
    // Logic to upload CV
  };

  return (
    <Container fluid className={styles.perfilContainer}>
      {" "}
      {/* Main container with background */}
      <Container className={styles.perfilContentWrapper}>
        {" "}
        {/* Inner container for max-width and centering */}
        <Row className="justify-content-center align-items-center">
          {/* Left Column: Image and Edit Image Button */}
          <Col xs={12} md={4} className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img
                src={userData.imageUrl}
                alt="Profile"
                className={styles.profileImage}
              />
              <Button
                variant="primary"
                className={styles.editImageButton}
                onClick={handleEditImage}
              >
                {t("Editar imagen")} <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </div>
          </Col>

          {/* Right Column: Personal Data and Edit Data Button */}
          <Col xs={12} md={6} className={styles.dataColumn}>
            <div className={styles.dataBox}>
              <p>
                <strong>{t("Nombre")}:</strong> {userData.nombre}
              </p>
              <p>
                <strong>{t("Estado actual")}:</strong> {userData.estadoActual}
              </p>
              <p>
                <strong>{t("Correo")}:</strong> {userData.correo}
              </p>
              <Button
                variant="primary"
                className={styles.editDataButton}
                onClick={handleEditData}
              >
                {t("Editar datos")} <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </div>

            <Row className="justify-content-center mt-4">
              {" "}
              {/* mt-4 for margin top */}
              <Col xs={12} md={12} className={styles.cvButtonsColumn}>
                <div className={styles.cvButtonsWrapper}>
                  <Button
                    variant="primary"
                    className={styles.cvButton}
                    onClick={handleDownloadCV}
                  >
                    {t("Descargar CV")}
                  </Button>

                  <Button
                    variant="primary"
                    className={styles.cvButton}
                    onClick={handleUploadCV}
                  >
                    {t("Subir CV")}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Row for CV Buttons */}
      </Container>


      <Container className={styles.whiteSectionWrapper}>
        <Row className="justify-content-center">
          {/* First Column of the White Section */}
          <Col xs={12} md={6} className={styles.whiteColLeft}>
            <div className={styles.whiteColContent}>
              <h3>{t('Experiencia Laboral')}</h3>
              <p>Aquí va tu experiencia laboral...</p>
              {/* Add your content for the first column */}
              <Button variant="primary" className={styles.whiteSectionButton}>
                {t('Añadir Experiencia')} <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </div>
          </Col>

          {/* Second Column of the White Section (divided into two rows) */}
          <Col xs={12} md={6} className={styles.whiteColRight}>
            <Row className="flex-grow-1"> {/* flex-grow-1 ensures this row takes available height */}
              {/* First Row of Second Column */}
              <Col xs={12} className={styles.whiteRowTop}>
                <div className={styles.whiteColContent}>
                  <h3>{t('Formación Académica')}</h3>
                  <p>Aquí va tu formación...</p>
                  {/* Add your content for the first sub-row */}
                  <Button variant="primary" className={styles.whiteSectionButton}>
                    {t('Añadir Formación')} <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                </div>
              </Col>
              {/* Second Row of Second Column */}
              <Col xs={12} className={styles.whiteRowBottom}>
                <div className={styles.whiteColContent}>
                  <h3>{t('Habilidades')}</h3>
                  <p>Aquí van tus habilidades...</p>
                  {/* Add your content for the second sub-row */}
                  <Button variant="primary" className={styles.whiteSectionButton}>
                    {t('Añadir Habilidades')} <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
     
    </Container>
  );
}

export { Perfil }; // Export as named export to match your AppRoutes import
