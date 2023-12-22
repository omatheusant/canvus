import { FaEdit } from "react-icons/fa";
import { Modal } from '../shared/Modal/Modal';


export const UpdateUser = ({user}: any) => {
  return (
    <Modal id="update" className="btn bg-[--bg-color] hover:bg-[--dark] border-none text-[#8884FF]" title={(<FaEdit size={20}/>)}>
      a
    </Modal>
  )
}