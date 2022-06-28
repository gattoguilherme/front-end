// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';
import { UserModel } from "../models/UserModel";
import { connect } from '../../middlewares/connectToMongoDB';

const registerEndpoint = async (
    req: NextApiRequest,
    // res: NextApiResponse<DefaultMsgResponse>
    res: NextApiResponse<any>
) => {
    try {
        if (req.method === 'POST') {
            const { name, email, password } = req.body;

            if (!name || name.trim().lenght < 2) {
                return res.status(400).json({ error: 'Name field must contain at least 2 letters' });
            }

            if (!email || email.trim().lenght < 5 || (!email.includes('@') || !email.includes('.'))) {
                return res.status(400).json({ error: 'Email not valid' });
            }

            if (!password || password.trim().lenght < 6 ) {
                return res.status(400).json({ error: 'Password not valid' });
            }

            const user = {
                name,
                email,
                password
            };

            await UserModel.create(user);
            return res.status(200).json({ msg: 'SUCCESS ON CREATE NEW USER' });
        }

        // if (req.method === 'DELETE') {
        //     const id: any = req.headers['teste'];
        //     UserModel.find({ email: id }).remove(console.log('matou')).call();
        //     return res.status(200).json({ msg: 'Matamos o usuario' });
        // }

        return res.status(405).json({ error: 'Method not allowed' });
    }
    catch (e) {
        console.log('Error on creating user', e);
        return res.status(500).json({ error: 'Unable to register user.' });
    }
}


export default connect(registerEndpoint);