import type { NextApiRequest, NextApiResponse } from 'next'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';

type Login = {
    username: string,
    password: string
  }

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DefaultMsgResponse>
  ) {
      
    if (req.method === 'POST') {
        const {login, password} = req.body;
        if (login === 'gatto' && password === "123") {
            return res.status(200).json({msg: 'SUCCESS'});
        }  

        return res.status(400).json({ error: 'Invalid Credentials' });
    }

    return res.status(405).json({error: 'Method type does not exists'});
  }