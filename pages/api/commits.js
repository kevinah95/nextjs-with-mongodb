import clientPromise from "../../lib/mongodb";
import NextCors from 'nextjs-cors';

export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        const client = await clientPromise;
        const db = client.db("test_database");

        const movies = await db
            .collection("rm_commit")
            .find({})
            .sort({ committer_date: -1 })
            //.limit(100)
            .toArray();

        res.json(movies);
    } catch (e) {
        res.status(code).send(e);
    }
};