import { HtmlProps } from 'next/dist/shared/lib/html-context.shared-runtime'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode,
  title: ReactNode,
  className?: any
}

export const Modal = ({children, title, ...props}: ModalProps) => {
  return (
    <>
      < button {...props}  onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)!.showModal()}>{title}</button >
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}