import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { ObjectId } from "mongodb";

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
        const repositoryId = req.query.repositoryId as string;
        const findQuery = repositoryId ? { repository: new ObjectId(repositoryId) } : {};
        
        const client = await clientPromise;
        const db = client.db("repominer_database");

        const commits = await db
            .collection("rm_commit")
            .find(findQuery)
            .sort({ _id: -1 })
            .toArray();

        res.json(commits);
    } catch (e) {
        console.log(e);
    }
};
