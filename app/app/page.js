"use client";
import logo  from '../public/logo.png'
import Link from "next/link";


export default function Home() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
      <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className='flex justify-center'>
            <img src={logo.src} alt="Logo" className='w-40 h-40 object-contain' />
          </div>
          <div className="text-center md:text-left">
            <h1 className='text-3xl font-bold py-4'>Rejoignez ConnectX</h1>
            <p className='py-4 text-gray-300'>Connectez-vous ou inscrivez-vous pour accéder à l'application et rester en contact avec le monde.</p>
            <div className='flex flex-col md:flex-row gap-4 mt-4'>
              <Link className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md transition' href="/login">
                Se connecter
              </Link>
              <Link className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-md transition' href="/signup">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
