import { UserBody } from '@/types/users';
import { NextApiResponse } from 'next';

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).send('BAD REQUEST')
  };

  const body = req.body as UserBody

  const deleteUser = await prisma?.user.delete({
    where: {
      username: body.username
    }
  })
  res.status(200).send({message: 'Usuário deletado com sucesso!'})
  res.send(deleteUser)
}