import { ReactNode } from 'react'
import { IoExitOutline } from 'react-icons/io5'

interface ModalProps {
  children: ReactNode,
  title: ReactNode,
  className?: any
  id: string
}

export const Modal = ({children, title, id, ...props}: ModalProps) => {
  return (
    <>
      < button {...props} onClick={() => (document.getElementById(`${id}`) as HTMLDialogElement)!.showModal()}>{title}</button >
      <dialog id={id} className="modal">
        <div className="modal-box bg-[--bg-color]">
          {children}
          <div className="modal-action">
          <form method="dialog">
              <button className="text-[--light] text-lg flex items-center gap-2">Cancelar <IoExitOutline /></button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}