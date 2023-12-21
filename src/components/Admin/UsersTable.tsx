import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

interface User {
  name: string;
  username: string;
  role: string;
}

interface UserTableProps {
  users: User[]
}

export const UsersTable = ({users}: UserTableProps) => {
  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="table flex w-full">
        <thead>
          <tr className='text-[--light] text-base border-[--dark]'>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              return (
                <tr key={index} className='border-[--dark]'>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td className='flex text-[15px] gap-3'>
                    <FaTrashAlt/>
                    <FaEdit/> 
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}