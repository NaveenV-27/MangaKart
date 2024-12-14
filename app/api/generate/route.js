import clientPromise from "@/lib/mongodb";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("mangaKart")
    const collection = db.collection("manga")
    const doc = await collection.find({}).toArray();
    return Response.json(doc)
}
