import {
  useEffect,
  ReactNode
} from 'react';

interface Props {
  id: string;
  title: string;

  className?: string;

  children?: ReactNode;
}

const Modal = ({
  id,
  title,

  className,

  children
}: Props) => {
  function closeModal() {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) {
      input.checked = false;
    }
  }

  function closeModalWithEscapeKey(event: any) {
    if(event.keyCode === 27) {
      closeModal()
    }
  }

  useEffect(() => {
    const clientSideRendering = typeof window !== "undefined"

    if (clientSideRendering) {
      document.addEventListener("keydown", closeModalWithEscapeKey, false);
    }
  }, [])
  
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />

      <div className="modal">
        <div className={`modal-box relative pt-14 pb-5 max-h-[99vh] ${className}`}>
          <label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="absolute left-2 top-2 text-lg font-bold">{title ? title : 'Título'}</h3>

          {children}
        </div>
      </div>
    </>
  )
}

export default Modal;