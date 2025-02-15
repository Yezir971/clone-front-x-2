"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const ValidateSignUp = () => {
    const {id} = useParams()
    const [messageApi, setMessageApi] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchActivate = async() => {
            try {
                // call api 
                const response = await fetch(`/api/user/signup/${id}`)
                // si on a une erreur on retourne un message d'erreur 
                if (!response.ok) {
                    throw new Error("Erreur API");
                }
                const data = await response.json()
                setMessageApi(data)
                setLoading(true)
                
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchActivate()
    }, [id])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold">Validation du compte</h2>
            {loading && (
                <p className="text-green-500">{messageApi.message}</p> 
            )}
        </div>
    )
}

export default ValidateSignUp