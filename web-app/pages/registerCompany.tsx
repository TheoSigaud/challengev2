import Head from 'next/head'
import React, {useCallback, useEffect,useState} from "react";
import { ClipLoader } from "react-spinners";

export default function Company() {

    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');
    const [name,setName] = useState('');
    const [number, setNumber] = useState('');
    const [zipcode,setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    

    useEffect(() =>
    {
        document.body.classList.add("bg-custom-light-orange");
        
    },[]);

    const company = useCallback( async (e:any) => {

        e.preventDefault();

            setIsLoading(true);
            await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/company`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    name:name,
                    number:number,
                    address:address,
                    zipcode:zipcode,
                    city:city,
                    message:message
                })
            })
            .then(response => response.json())
            .then( (data) => {
                if (data.statusCode === 201){
                    setSuccess("Votre compte sera examiné auprès de l'admin. Vous recevrez un mail si votre compte a été validé.")
                    setError("")
                }else{
                    setError(data.response.message)
                    setSuccess("")
                }
                setIsLoading(false);
            }).catch( (error) =>{
                console.log(error);
                setIsLoading(false);
            });
                

    },[email,name,number,address,zipcode,city,message])

    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <div className="grid h-screen place-items-center">

                  
                    <div
                        className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={company}>
                            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline"> {error}</span>
                                </div>}

                            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline"> {success}</span>
                            </div>}
                            <div className="flex justify-center mb-5">
                            <img src="./otter.png" alt="logo" className="w-20 h-20"/>
                        </div>
                            <div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Nom de l'entreprise</label>
                                    <input type="text" name="name" id="name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                           placeholder="Chez Waseem" required onChange={ (e) => setName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="email@exemple.com" required onChange={ (e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="numberPhone"
                                           className="block mb-2 text-sm font-medium text-gray-900">Numéro de téléphone</label>
                                    <input type="text" name="text" id="number" placeholder="01 02 03 04 05" required onChange={ (e) => setNumber(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                </div>
                            </div>
                          
                            <div>
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900">Adresse</label>
                                <input type="text" name="text" id="text"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="1 rue de la paix" required onChange={ (e) => setAddress(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900">Code Postal</label>
                                    <input type="text" name="text" id="text"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="75 012" required onChange={ (e) => setZipcode(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="numberPhone"
                                           className="block mb-2 text-sm font-medium text-gray-900">Ville</label>
                                    <input type="text" name="text" id="text"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="Paris" required onChange={ (e) => setCity(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message"
                                       className="block mb-2 text-sm font-medium text-gray-900">Message</label>
                                <textarea name="text" id="text"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       placeholder="Écrivez-nous un message ..." required onChange={ (e) => setMessage(e.target.value)} />
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-custom-orange hover:bg-custom-hover-orange focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"> {isLoading ? <ClipLoader size={20} color={"#ffffff"} /> : "Envoyer"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}