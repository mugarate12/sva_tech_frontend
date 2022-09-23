import { toast } from 'react-toastify';

export default function useAlert() {
  const notify = (message: string, type: 'success' | 'error' | 'info' | 'warning' | 'default' = 'default') => {
    toast(message, {
      type,
      autoClose: 3000,
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }

  return {
    notify,
  }
}
