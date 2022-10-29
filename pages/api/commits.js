import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("test_database");

       const movies = await db
           .collection("rm_commit")
           .find({})
           .sort({ committer_date: -1 })
           //.limit(10)
           .toArray();

       res.json(movies);
   } catch (e) {
        res.json(e);
   }
};