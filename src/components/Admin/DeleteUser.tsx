import { FaTrashAlt } from "react-icons/fa";


export const DeleteUser = ({user}: any) => {
  return (
    <button onClick={()=>console.log(user.name)}>
      <FaTrashAlt/>
    </button>
  )
}