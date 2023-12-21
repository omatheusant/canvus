import { FaEdit } from "react-icons/fa";


export const UpdateUser = ({user}: any) => {
  return (
    <button onClick={()=>console.log(user.name + 'foi cliclado')}>
      <FaEdit />
    </button>
  )
}