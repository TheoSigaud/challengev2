import Head from 'next/head'
import React, {useCallback, useEffect, useState} from "react";
import 'flowbite';
import {useRouter} from "next/router";
import DisplayImages from "@/components/announcement/DisplayImages";
import {Button, Modal} from "flowbite-react";
import AdminLayout from "@/components/layouts/Admin";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

interface Announcement {
    name: string;
    description: string;
    firstImage: string;
    base64Images: string[];
    type: string;
    status: number;
    announcementCategories: AnnouncementCategory[];
}

interface AnnouncementCategory {
    category: Category;
}

interface Category {
    name: string;
}


export default function Announcement() {
    const [announcement, setAnnouncement] = useState<Announcement[]>([]);
    const [cancelModal, setCancelModal] = useState<boolean>(false);
    const [publishModal, setPublishModal] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [idAnnouncement, setIdAnnouncement] = useState<string>('');
    const [error, setError] = useState("");
    const router = useRouter();
    const supabase = useSupabaseClient();

    useEffect(() => {
        document.body.classList.add("bg-custom-light-blue");
        if (!router.isReady) return;

        const {id} = router.query;
        if (typeof id === 'string') {
            setIdAnnouncement(id);

            fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/${id}`, {
                method: 'GET',
            })
                .then(response => {
                    const statusCode = response.status;
                    if (statusCode === 404) {
                        router.push('/admin/announcement');
                    }
                    return response.json();
                })
                .then((data) => {
                    setAnnouncement(data)
                }).catch((error) => {
                console.log(error);

            });
        }
    }, [router.isReady]);

    const cancelAnnouncement = useCallback(async (e: any) => {
        e.preventDefault();

        setIsLoader(true);
        const {data: {session}} = await supabase.auth.getSession();

        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/admin/cancel`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
            body: JSON.stringify({
                id: idAnnouncement,
            })
        })
            .then(response => response.json())
            .then((data) => {
                router.push('/admin/announcement');
            }).catch((error) => {
                console.log(error);
            });
    }, [idAnnouncement]);

    const publishAnnouncement = useCallback(async (e: any) => {
        e.preventDefault();

        setIsLoader(true);
        const {data: {session}} = await supabase.auth.getSession();

        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/admin/publish`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
            body: JSON.stringify({
                id: idAnnouncement,
            })
        })
            .then(response => response.json())
            .then((data) => {
                router.push('/admin/announcement');
            }).catch((error) => {
                console.log(error);
            });
    }, [idAnnouncement]);

    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <AdminLayout>
                <div className="p-4 sm:ml-64">
                    <section className="p-4 mt-14">
                        {announcement.length > 0 ?
                            <div className="grid grid-cols-1 md:grid-cols-12 h-4/6">
                                <DisplayImages images={announcement[0].base64Images}/>
                                <div className="md:col-span-7 md:col-start-7 my-10 relative pb-24">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900 text-5xl">{announcement[0].name}</h2>
                                    <dl className="mt-16">
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 text-2xl">Description</dt>
                                        <dd className="text-xl text-gray-800 mb-5">{announcement[0].description}</dd>
                                    </dl>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <p className="font-semibold">Catégories :</p>
                                            <div className="py-4">
                                                {announcement[0].announcementCategories.map((item, index) => {
                                                    return (
                                                        <span key={index}
                                                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-white mr-2">
                                                        {item.category.name}
                                                    </span>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <p className="font-semibold">Type de l'annonce :</p>
                                            <p className="capitalize py-4">{announcement[0].type}</p>
                                        </div>
                                    </div>

                                    {announcement[0].status !== -2 &&
                                        <div className="2xl:absolute bottom-0 left-0 flex justify-between w-full">
                                            {announcement[0].status !== -1 &&
                                                <Button color="failure" onClick={() => setCancelModal(true)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                    Refuser l'annonce
                                                </Button>
                                            }

                                            {announcement[0].status !== 1 &&
                                                <Button color="success" onClick={() => setPublishModal(true)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M4.5 12.75l6 6 9-13.5"/>
                                                    </svg>
                                                    Publier l'annonce
                                                </Button>
                                            }
                                        </div>
                                    }
                                    <Modal
                                        onClose={() => setCancelModal(false)}
                                        show={cancelModal}
                                        popup
                                        size="lg"
                                    >
                                        <Modal.Header/>
                                        <Modal.Body>
                                            <div className="text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor"
                                                     className="mx-auto mb-4 h-14 w-14 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                                                </svg>

                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                    Voulez-vous vraiment refuser cette annonce ?
                                                </h3>
                                                {isLoader ?
                                                    <svg aria-hidden="true"
                                                         className="inline w-8 h-8 text-gray-200 animate-spin fill-gray-600"
                                                         viewBox="0 0 100 101" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"/>
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"/>
                                                    </svg>
                                                    :
                                                    <div className="flex justify-center gap-4">
                                                        <Button
                                                            color="failure"
                                                            onClick={cancelAnnouncement}
                                                        >
                                                            Oui, je suis sûr
                                                        </Button>
                                                        <Button
                                                            color="gray"
                                                            onClick={() => setCancelModal(false)}
                                                        >
                                                            Non, annuler
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </Modal.Body>
                                    </Modal>

                                    <Modal
                                        onClose={() => setPublishModal(false)}
                                        show={publishModal}
                                        popup
                                        size="lg"
                                    >
                                        <Modal.Header/>
                                        <Modal.Body>
                                            <div className="text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor"
                                                     className="mx-auto mb-4 h-14 w-14 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                                                </svg>

                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                    Voulez-vous vraiment publier cette annonce ?
                                                </h3>
                                                {isLoader ?
                                                    <svg aria-hidden="true"
                                                         className="inline w-8 h-8 text-gray-200 animate-spin fill-gray-600"
                                                         viewBox="0 0 100 101" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"/>
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"/>
                                                    </svg>
                                                    :
                                                    <div className="flex justify-center gap-4">
                                                        <Button
                                                            color="success"
                                                            onClick={publishAnnouncement}
                                                        >
                                                            Oui, je suis sûr
                                                        </Button>
                                                        <Button
                                                            color="gray"
                                                            onClick={() => setPublishModal(false)}
                                                        >
                                                            Non, annuler
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                            :
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
                        }
                    </section>
                </div>
            </AdminLayout>
        </>
    )
}