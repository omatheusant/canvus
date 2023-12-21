import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextApiResponse } from 'next';

interface userProps extends ReadableStream<Uint8Array> {
  name: string,
  username: string,
  password: string,
  role: string
}

export default async function handler(req: Request, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body as userProps
    
    const exists = await prisma.user.findUnique({
      where: {
        username: body.username
      }
    })

    if(exists) {
      return res.status(400).send({message: "Usuário já existe!"})
    }

    const user = await prisma.user.create({
      data: {
        name: body?.name,
        username: body?.username,
        password: await hash(body?.password, 10),
        role: body?.role
      }
    })
    res.send(user)
  }
}