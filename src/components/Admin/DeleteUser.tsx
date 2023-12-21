import { FaTrashAlt } from "react-icons/fa";
import { Modal } from '../shared/Modal/Modal';


export const DeleteUser = ({user}: any) => {
  return (
    <Modal className="btn bg-[--bg-color] hover:bg-[--dark] border-none text-[--alert]" title={(<FaTrashAlt size={20}/>)}>
      a
    </Modal>
  )
}