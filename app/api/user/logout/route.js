import { cookies } from 'next/headers'


export async function POST() {
    try {
        const tokenCookie = await cookies()
        tokenCookie.delete("mon_petit_green_token")
        return Response.json({message:"Token supprimer avec succès !"})
    } catch (error) {
        console.error(error.message)
        return Response.json({message:"Token supprimer avec succès !"})

    }
}