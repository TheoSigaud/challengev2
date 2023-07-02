import Head from 'next/head'
import AdminLayout from "@/components/layouts/Admin";
import Modal from "@/components/Modal";
import 'flowbite';
import { useCallback, useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    firstname: string;
    email: string;
    pseudo: string;
    birthday: string;
    balance: string;
    points: string;
    role: string;
    status: string;
}

export default function User() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("")
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [UserSelected, setUserSelected] = useState<User | undefined>(undefined);

    useEffect(() => {
        document.body.classList.add("bg-custom-light-blue");
        getusers();
    }, []);

    const getusers = useCallback(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/user/all`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                setUsers(data.Users)
                console.log(data);

            }).catch((error) => {
                console.log(error);

            });
    }, [])

    const update = useCallback(async (e: any) => {

        e.preventDefault();

        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/user/admin/update/${UserSelected?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: UserSelected?.name,
                email: UserSelected?.email,
                firstname: UserSelected?.firstname,
                pseudo: UserSelected?.pseudo,
                //parseint status
                status: parseInt(UserSelected?.status!),
            })
        })
            .then(response => response.json())
            .then((data) => {

                if (data.statusCode === 200) {
                    setSuccess("Utilisateur modifié.")
                    setError("")
                    getusers();
                } else {
                    setError(data.response.message)
                    setSuccess("")
                }
                setShowUpdateModal(false);

            }).catch((error) => {
                console.log(error);
            });


    }, [UserSelected])


    const openModal = useCallback(async (User: User, isUpdate: boolean) => {
        isUpdate ? setShowUpdateModal(true) : setShowDeleteModal(true);
        setUserSelected(User);
    }, [])


    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminLayout>
                <div className="p-4 sm:ml-64">
                    <div className="p-4 mt-14">


                        {showUpdateModal ? (
                            <>
                                <Modal setShowModal={setShowUpdateModal} title="Modification">
                                    <form onSubmit={update}>
                                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900">Nom</label>
                                                <input type="text"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    required value={UserSelected?.name} onChange={(e) => setUserSelected((prevUser: User | undefined) => ({ ...prevUser!, name: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label htmlFor="firstname"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Prénom</label>
                                                <input type="text" name="text" id="text"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    required value={UserSelected?.firstname} onChange={(e) => setUserSelected((prevUser: User | undefined) => ({ ...prevUser!, firstname: e.target.value }))} />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div>
                                                <label htmlFor="pseudo"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Pseudo</label>
                                                <input type="text" name="pseudo" id="pseudo"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    required value={UserSelected?.pseudo} onChange={(e) => setUserSelected((prevUser: User | undefined) => ({ ...prevUser!, pseudo: e.target.value }))} />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div>
                                                <label htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                                <input type="email" name="email" id="email"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    required value={UserSelected?.email} onChange={(e) => setUserSelected((prevUser: User | undefined) => ({ ...prevUser!, email: e.target.value }))} />
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label htmlFor="Points"
                                                className="block mb-2 text-sm font-medium text-gray-900">Statut</label>
                                            <select
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                required value={UserSelected?.status} onChange={(e) => setUserSelected((prevUser: User | undefined) => ({ ...prevUser!, status: e.target.value }))}>
                                                <option value="1">Actif</option>
                                                <option value="-1">Désactivé</option>
                                                <option value="0">En attente</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-end pt-5 border-t border-solid border-slate-200 rounded-b">
                                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enregistrer</button>
                                        </div>
                                    </form>
                                </Modal>
                            </>
                        ) : null}

                        {
                            success !== "" ?
                                <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Check icon</span>
                                    </div>
                                    <div className="ml-3 text-sm font-normal">{success}</div>
                                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
                                        <span className="sr-only">Close</span>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                                : ""
                        }

                        <div className="flex justify-end">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Ajouter un utilisateur</button>
                        </div>

                        <div className="relative overflow-x-auto mt-5">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="border-b">
                                        <th scope="col" className="px-6 py-4">
                                            Nom complet
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Pseudo
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Rôle
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Gamification
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Statut
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {users.length > 0 &&
                                        users.map((User: User, index) => {
                                            return (

                                                <tr key={index} className={index % 2 == 0 ? ' bg-white' : ' bg-gray-50'}>
                                                    <td scope="row" className="px-6 py-3 text-gray-900">
                                                        {User.name} {User.firstname}
                                                    </td>
                                                    <td scope="row" className="px-6 py-3 text-gray-900">
                                                        {User.pseudo}
                                                    </td>
                                                    <td scope="row" className="px-6 py-3 text-gray-900">
                                                        {User.email}
                                                    </td>
                                                    <td scope="row" className="px-6 py-3 text-gray-900">
                                                        {(() => {
                                                            if (User.role == "CLIENT") {
                                                                return (
                                                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                                                        Client
                                                                    </span>
                                                                );
                                                            }
                                                            return (
                                                                <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                                                                    Admin
                                                                </span>
                                                            );
                                                        })()}
                                                    </td>
                                                    <td scope="row" className="px-6 py-3 text-gray-900">
                                                        <b>{User.balance}</b> Balance <br />
                                                        <b>{User.points}</b> points
                                                    </td>
                                                    <td scope="row" className="px-6 py-3 text-gray-900">
                                                        {(() => {
                                                            if (User.status == "1") {
                                                                return (
                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                        Actif
                                                                    </span>
                                                                );
                                                            } else if (User.status == "-1") {
                                                                return (
                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                        Désactivé
                                                                    </span>
                                                                );
                                                            }
                                                            return (
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                                    En attente
                                                                </span>
                                                            );
                                                        })()}
                                                    </td>
                                                    <td className="px-6 py-3 flex">

                                                        <svg onClick={() => openModal(User, true)} className="w-6 h-6 stroke-blue-500 cursor-pointer" fill="none" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>

                                                        {/* <svg onClick={ () => openModal(User, false)}  fill="none" className="w-6 h-6 stroke-red-500 cursor-pointer" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg> */}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout >
        </>
    )
}


