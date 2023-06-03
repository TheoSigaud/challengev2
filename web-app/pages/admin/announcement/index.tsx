import Head from 'next/head'
import AdminLayout from "@/components/layouts/Admin";
import 'flowbite';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

interface Announcement {
    id: string;
    name: string;
    description: string;
    type: string;
    status: number;
    price: number;
}

export default function Announcement() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/admin`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                setAnnouncements(data);
                setLoader(false);
            }).catch((error) => {
            console.log(error);

        });
    }, []);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <AdminLayout>
                <div className="p-4 sm:ml-64">
                    <section className="p-4 mt-14">
                        {loader ?
                            <div className="flex justify-center my-10">

                                <svg aria-hidden="true"
                                     className="inline w-16 h-16 text-gray-200 animate-spin fill-gray-600 my-10"
                                     viewBox="0 0 100 101" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                            </div>
                            :

                            announcements.length > 0 ?
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead
                                            className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nom
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Type
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Prix
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Statut
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {announcements.map((item, index) => (
                                            <tr className={index % 2 == 0 ? ' bg-white border-b' : ' bg-gray-50 border-b'}>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {item.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.description}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.type}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.price} €
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.status === 0 &&
                                                        <span
                                                            className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100">En attente</span>
                                                    }
                                                    {item.status === -1 &&
                                                        <span
                                                            className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-red-100">Refusée</span>
                                                    }
                                                    {item.status === 1 &&
                                                        <span
                                                            className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-green-100">Publiée</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={`/admin/announcement/${encodeURIComponent(item.id)}`}
                                                        key={index} className="hover:text-blue-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" strokeWidth={1.5}
                                                             stroke="currentColor"
                                                             className="w-7 h-7">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div className="flex flex-col items-center">
                                    <h2 className="mt-10 text-3xl font-semibold">Aucune annonce pour l'instant</h2>
                                    <Image src="/admin/announcement/blue-cactus.svg" alt="cactus"
                                           className="w-80 h-80 mt-10"
                                           width="100" height="100"/>
                                </div>

                        }
                    </section>
                </div>
            </AdminLayout>
        </>
    )
}
