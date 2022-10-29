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

        const commits = await db
            .collection("rm_commit")
            .find({})
            .sort({ committer_date: -1 })
            //.limit(100)
            .toArray();

        res.json(commits);
    } catch (e) {
        console.log(e);
    }
};