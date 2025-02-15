"use client"
import { useRef, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";


const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loader, setLoader] = useState(false)
    // la ref va permettre de dissocier les informations a envoyer en bdd du confirm mot de passe 
    const refName = useRef()
    const refMail = useRef()
    const refPassword1 = useRef()
    const refPassword2 = useRef()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const sendUser = async (body) => {
        setLoader(true)
        try {
            const response = await fetch('http://localhost:3000/api/user/signup', {
                method:"POST",
                headers:{
                    'Content-type':'application/json',
                },

                body: JSON.stringify(body)

            })
            console.log(response.status)
            if(response.status == 200){
                // une fois evoyer on reinitialiser les inputs 
                refName.current.value = ""
                refMail.current.value = ""
                refPassword1.current.value = ""
                refPassword2.current.value = ""
                setFormData({})
            }
            const data = await response.json()
            setMessage(data.message)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.error(error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== refPassword2.current.value) {
            setMessage('Les mots de passe ne correspondent pas');
            return;
        }
        sendUser(formData)





    };
    return(
        <>
            <div className="min-h-screen  flex items-center justify-center px-4 ">
                <div className="w-full max-w-md">
                    <div className="border border-[#16DB65] rounded-xl shadow-lg p-8">
                        <h1 className="text-[#ececec] text-3xl mb-3">Créer un compte</h1>
                        <form className="space-y-6" onSubmit={handleSubmit} method="post" action="">
                            <div>
                                <label htmlFor="username" className="text-[#ececec]">Nom d'utilisateur</label>
                                <input onChange={handleChange} ref={refName} type="text" name="username" id="username" className="w-full p-3 bg-[#181818] border border-[#16DB65] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16DB65] focus:bg-[#1f1f1f] text-[#ececec]"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-[#ececec]">Email</label>
                                <input onChange={handleChange} ref={refMail} type="text" name="email" id="email" className="w-full p-3 bg-[#181818] border border-[#16DB65] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16DB65] focus:bg-[#1f1f1f] text-[#ececec]"/>
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="text-[#ececec]">Mot de passe</label>
                                <input onChange={handleChange} ref={refPassword1} type={!showPassword ? "password" : "text"} name="password" id="password" className="w-full p-3 bg-[#181818] border border-[#16DB65] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16DB65] focus:bg-[#1f1f1f] text-[#ececec]"/>
                                <button type="button" className="absolute text-[#ececec] top-10 right-3" onClick={togglePasswordVisibility}>
                                    {showPassword ? <LuEye /> : < LuEyeClosed/>}
                                </button>
                            </div>
                            <div className="relative">
                                <label htmlFor="password2" className="text-[#ececec]">Confirmer le mot de passe</label>
                                <input ref={refPassword2} type={!showPassword2 ? "password" : "text"} name="password2" id="password2" className="w-full p-3 bg-[#181818] border border-[#16DB65] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16DB65] focus:bg-[#1f1f1f] text-[#ececec]"/>
                                <button type="button" className="absolute text-[#ececec] top-10 right-3" onClick={togglePasswordVisibility2}>
                                    {showPassword2 ? <LuEye /> : < LuEyeClosed/>}
                                </button>
                            </div>
                            <input type="submit" value="Inscription" className="bg-[#16DB65] hover:bg-[#058C42] w-full border border-[#16DB65] hover:border-[#058C42] rounded-lg cursor-pointer text-lg"/>
                            <p className="text-[#ececec]">Déjà un compte ? <a href="/login" className="hover:underline">Connectez-vous</a></p>
                        </form>
                        { loader && (
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>

                        )}
                        <p className="text-[#ececec] py-3">{message}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp