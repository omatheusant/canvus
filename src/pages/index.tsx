import { signOut, useSession } from 'next-auth/react';
import { FaSignOutAlt } from "react-icons/fa"

import Link from 'next/link';
import { AdminMenu } from '@/components/Admin/AdminMenu';

export default function Home() {
  const {data: session} = useSession()
  console.log(session?.user)
  if (session?.user) {
    return (
      <main className="hero min-h-screen font-medium">
        {session.user.role === "admin" && (
          <div className='absolute left-2 top-2'>
            <AdminMenu/>
          </div>
        )}
        <div className="hero-content text-center">
          <div className="max-w-md flex flex-col justify-center">
            <h1 className='italic text-8xl text-secondary'>Canvus</h1>
            <p className="py-6 font-light text-[--light]">Ferramentas de uso rápido para criação de anúncios.</p>
            <div className="flex flex-col gap-4">
              <Link href={'/tools/cutter'}>
                <button className="btn bg-primary text-secondary text-xl w-full">Cortador de imagens</button>
              </Link>
              <Link href={'/tools/removebg'}>
                <button className="btn bg-primary text-secondary text-xl w-full">Remover fundo</button>
              </Link>
              <Link href={'/tools/editor'}>
                <button className="btn bg-primary text-secondary text-xl w-full">Editor</button>
              </Link>
            </div>
            <button className='absolute right-5 top-5 flex gap-2 items-center' onClick={() => signOut()}>Desconectar<FaSignOutAlt/></button>
          </div>
        </div>
      </main>
    )
  }
}
