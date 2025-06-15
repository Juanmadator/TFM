import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const useAlerts = () => {

  const defaultToastOptions = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  };

  const showSuccessAlert = (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'success',
      title: title,
      text: text,
      ...options,
    });
  };

  const showErrorAlert = (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'error',
      title: title,
      text: text,
      ...options,
    });
  };

  const showWarningAlert = (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'warning',
      title: title,
      text: text,
      ...options,
    });
  };

  const showInfoAlert = (title, text, options = {}) => {
    return MySwal.fire({
      icon: 'info',
      title: title,
      text: text,
      ...options,
    });
  };

  const showConfirmAlert = (title, text, options = {}) => {
    return MySwal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      ...options,
    });
  };

  const showLoadingAlert = (title = 'Cargando...', text = 'Por favor espera.') => {
    MySwal.fire({
      title: title,
      text: text,
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
  };

  // Nueva función para mostrar toasts pequeños y auto-cerrables
  const showToast = (icon, title, text = '', options = {}) => {
    return MySwal.fire({
      icon,
      title,
      text,
      ...defaultToastOptions,
      ...options,
    });
  };

  const closeAlert = () => {
    MySwal.close();
  };

  return {
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert,
    showInfoAlert,
    showConfirmAlert,
    showLoadingAlert,
    closeAlert,
    showToast, // Añade el nuevo toast a las funciones exportadas
  };
};

export default useAlerts;