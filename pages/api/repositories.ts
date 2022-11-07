import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

const cors = {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, 
};

export const config = {
    api: {
        responseLimit: false,
    },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, cors);

    try {
        const client = await clientPromise;
        const db = client.db("test_database");

        const repositories = await db
            .collection("rm_repository")
            .find({})
            .sort({ _id: -1 })
            .toArray();

        res.json(repositories);
    } catch (e) {
        console.log(e);
    }
};