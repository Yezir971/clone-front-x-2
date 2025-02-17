import connect from "@/libs/mongodb";
import Users from "@/models/users.model";


export async function PUT(req) {
    try {
        await connect();
        const { idFollower, idRecieve } = await req.json();
        const user = await Users.findOne({ _id: idRecieve, abonnés: idFollower });
        if(user === null){
            const UpdateAbonnes = await Users.updateOne(
                { _id: idRecieve },
                { $addToSet: { abonnés: idFollower } }
            );
            const UpdateAbonnements = await Users.updateOne(
                { _id: idFollower },
                { $addToSet: { abonnements: idRecieve } }
            );
        } else {
            const UpdateAbonnes = await Users.updateOne(
                { _id: idRecieve },
                { $pull: { abonnés: idFollower } }
            );
            const UpdateAbonnements = await Users.updateOne(
                { _id: idFollower },
                { $pull: { abonnements: idRecieve } }
            );
        }
        return new Response(JSON.stringify({message: `Abonnement réussi!`, status: 201}, {status: 201}));
    } catch(error) {
        return Response.json({message: `Problème d'abonnement! ${error.message}`, status: 400}, {status:400} );
    }
}