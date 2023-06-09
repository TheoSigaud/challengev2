import Head from 'next/head'
import React, {useCallback, useEffect, useState} from "react";
import HomeLayout from "@/components/layouts/Home";
import {useRouter} from "next/router";
import DisplayImages from "@/components/announcement/DisplayImages";
import {Button, Modal, Tooltip} from "flowbite-react";
import Link from "next/link";
import Loader from "@/components/utils/Loader";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

interface Announcement {
    id: string;
    name: string;
    description: string;
    firstImage: string;
    base64Images: string[];
    type: string;
    announcementCategories: AnnouncementCategory[];
    status: number;
    price: number;
}

interface AnnouncementCategory {
    category: Category;
}

interface Category {
    name: string;
}

interface Checkout {
    id: string;
    price: number;
    status: number;
    startDate: string;
    endDate: string;
}


export default function Announcement() {
    const [announcement, setAnnouncement] = useState<Announcement[]>([]);
    const [checkouts, setCheckouts] = useState<Checkout[]>([]);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [idAnnouncement, setIdAnnouncement] = useState<string>('');
    const router = useRouter();
    const supabase = useSupabaseClient();

    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
    }, []);

    useEffect(() => {
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
                        router.push('/me/announcement');
                    }
                    return response.json();
                })
                .then((data) => {
                    setAnnouncement(data);

                    if (data[0].status === 2 || data[0].status === 3) {
                        getCheckout(id);
                    }
                }).catch((error) => {
                console.log(error);

            });
        }
    }, [router.isReady]);

    const deleteAnnouncement = useCallback(async (e: any) => {
        e.preventDefault();

        setIsDelete(true);
        const {data: {session}} = await supabase.auth.getSession();

        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
            body: JSON.stringify({
                id: idAnnouncement,
            })
        })
            .then(response => response.json())
            .then(() => {
                router.push('/me/announcement');
            }).catch((error) => {
                console.log(error);
            });
    }, [idAnnouncement]);

    const updateCheckout = async (idCheckout: string, status: number) => {
        const {data: {session}} = await supabase.auth.getSession();

        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/me/ordering/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
            body: JSON.stringify({
                id: idCheckout,
                status: status,
            })
        })
            .then(response => response.json())
            .then((data) => {
                getCheckout();
            }).catch((error) => {
                console.log(error);
            });
    }

    const getCheckout = async (id?: string) => {
        const {data: {session}} = await supabase.auth.getSession();
        const currentId = id ? id : idAnnouncement;

        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/announcement/me/ordering/${currentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.access_token
            },
        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                setCheckouts(data);
            }).catch((error) => {
            console.log(error);

        });
    }

    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <HomeLayout>
                <section>
                    <div className="container mx-auto pt-10">
                        {announcement.length > 0 ?
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-4/6">
                                <DisplayImages images={announcement[0].base64Images}/>
                                <div className="md:col-span-7 relative">
                                    <div
                                        className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <h2 className="mb-2 font-semibold leading-none text-gray-900 text-4xl">{announcement[0].name}</h2>
                                        <div className="flex items-center justify-between mt-5">
                                            {announcement[0].type === 'location' ?
                                                <>
                                                                    <span
                                                                        className="bg-purple-100 text-purple-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Location</span>
                                                    <p className="font-semibold text-lg text-gray-700">{announcement[0].price} €
                                                        / jour <span className="text-sm font-medium"> + frais</span></p>
                                                </>

                                                :
                                                <>
                                                                    <span
                                                                        className="bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">En vente</span>
                                                    <div className="" >
                                                        <p className="text-center text-2xl font-semibold">{(announcement[0].price + (5 * announcement[0].price) / 100).toFixed(2)} €</p>

                                                        <div>
                                                            <Tooltip content={`${announcement[0].price} € / jour + 5% frais de service`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                                     stroke="currentColor" className="w-6 h-6 text-gray-400">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                                                </svg>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>

                                        <div>
                                            <div className="flex flex-col mt-5">
                                                <p className="font-semibold">Catégories :</p>
                                                <div className="py-2">
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
                                        </div>

                                        <dl className="mt-10">
                                            <dt className="mb-2 font-semibold leading-none text-gray-900 text-xl">Description
                                                :
                                            </dt>
                                            <dd className="text-xl text-gray-800 mb-5">{announcement[0].description}</dd>
                                        </dl>

                                        <div className="w-full pt-10">
                                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                                            <div className="flex justify-between">
                                                {announcement[0].status === 0 || announcement[0].status === 1 ?
                                                    <>
                                                        <Button color="failure" onClick={() => setDeleteModal(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 strokeWidth={1.5} stroke="currentColor"
                                                                 className="w-5 h-5 mr-3">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                            </svg>

                                                            Supprimer l'annonce
                                                        </Button>


                                                        <Link href={`/me/announcement/edit/${announcement[0].id}`}
                                                              className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 strokeWidth={1.5} stroke="currentColor"
                                                                 className="w-5 h-5 mr-3">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                                            </svg>


                                                            Modifier
                                                        </Link>
                                                    </>
                                                    :
                                                    null
                                                }

                                                {checkouts.length > 0 &&
                                                    <div className="flex flex-col w-full">
                                                        {checkouts.map((item, index) => {
                                                            return (
                                                                <div
                                                                    className="rounded bg-indigo-100 w-full my-2 p-2 flex justify-between items-center"
                                                                    key={index}>
                                                                    <div>
                                                                        {announcement[0].type === 'location' &&
                                                                            <p className="text-base font-normal">Du {item.startDate} au {item.endDate}</p>
                                                                        }
                                                                        <p className="text-sm italic">Prix
                                                                            : {item.price} €</p>
                                                                    </div>

                                                                    {item.status === 0 &&
                                                                        <div className="flex">
                                                                            <button type="button"
                                                                                    onClick={() => updateCheckout(item.id, 1)}
                                                                                    className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     fill="none" viewBox="0 0 24 24"
                                                                                     strokeWidth={1.5}
                                                                                     stroke="currentColor"
                                                                                     className="w-5 h-5">
                                                                                    <path strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                          d="M4.5 12.75l6 6 9-13.5"/>
                                                                                </svg>
                                                                                Accepter
                                                                            </button>
                                                                            <button type="button"
                                                                                    onClick={() => updateCheckout(item.id, -1)}
                                                                                    className="flex focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     fill="none" viewBox="0 0 24 24"
                                                                                     strokeWidth={1.5}
                                                                                     stroke="currentColor"
                                                                                     className="w-5 h-5">
                                                                                    <path strokeLinecap="round"
                                                                                          strokeLinejoin="round"
                                                                                          d="M6 18L18 6M6 6l12 12"/>
                                                                                </svg>
                                                                                Refuser
                                                                            </button>
                                                                        </div>
                                                                    }

                                                                    {item.status === 1 &&
                                                                        <span
                                                                            className="bg-green-100 text-green-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Commande confirmée</span>
                                                                    }

                                                                    {item.status === -1 &&
                                                                        <span
                                                                            className="bg-red-100 text-red-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Commande annulée</span>
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        <Modal
                                            onClose={() => setDeleteModal(false)}
                                            show={deleteModal}
                                            popup
                                            size="md"
                                        >
                                            <Modal.Header/>
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.5} stroke="currentColor"
                                                         className="mx-auto mb-4 h-14 w-14 text-gray-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                                                    </svg>

                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        Voulez-vous vraiment supprimer cette annonce ?
                                                    </h3>
                                                    {isDelete ?
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
                                                                onClick={deleteAnnouncement}
                                                            >
                                                                Oui, je suis sûr
                                                            </Button>
                                                            <Button
                                                                color="gray"
                                                                onClick={() => setDeleteModal(false)}
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
                            </div>
                            :
                            <Loader/>
                        }
                    </div>
                </section>
            </HomeLayout>
        </>
    )
}