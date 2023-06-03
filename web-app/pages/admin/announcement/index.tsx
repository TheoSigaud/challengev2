import Head from 'next/head'
import AdminLayout from "@/components/layouts/Admin";
import 'flowbite';
import React, {useEffect, useState} from "react";
import Image from "next/image";

interface Announcement {
    id: string;
    name: string;
    description: string;
    type: string;
    status: number;
}

export default function Announcement() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/admin`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                setAnnouncements(data)
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
                    <div className="p-4 mt-14">
                        {announcements.length > 0 ?
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
                                                {item.status === 0 &&
                                                    <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100">Publiée</span>
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
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
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}