import { UsersTable } from '@/components/Admin/UsersTable';
import { useSession } from 'next-auth/react'
import { GoSearch } from "react-icons/go";



const AdminPage = () => {
  const { data: session } = useSession();

  if (session?.user.role !== 'admin') {
    return (<>Acesso negado!</>)
  }

  return (
    <section className='text-[--light]'>
      <header className="navbar bg-[--bg-color] shadow-md">
        <a className="btn btn-ghost text-xl">Dashboard</a>
      </header>

      <div className='min-w-full mt-10 flex justify-center'>
        <div className='w-[90vw] flex flex-col relative'>
          <h1 className='text-xl font-semibold '>Usuários</h1>
          <span className='text-gray-300'>Lista de todos usuários cadastrados</span>
          <span  className='absolute top-[84px] left-3'><GoSearch /></span>
          <input  type="search" placeholder="Procurar por usuário..." className="input input-bordered w-full max-w-xl h-10 mt-5 bg-[--dark] placeholder:text-[--light] pl-10 " />

          <div className='w-full bg-[--bg-color] py-6 px-5 mt-10 rounded-sm border-[--dark] border shadow-md'>
            <UsersTable/>
          </div>
        </div>
      </div>
    </section>
  )

}

export default AdminPage