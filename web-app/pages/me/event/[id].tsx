import Head from 'next/head'
import React, {useCallback, useEffect, useState} from "react";
import HomeLayout from "@/components/layouts/Home";
import {useRouter} from "next/router";
import {Button} from "flowbite-react";
import Modal from '@/components/Modal';


interface Event {
    name: string;
    description: string;
    id: string;
    date: string;
    time: string;
}


export default function Event() {
    const [event, setEvent] = useState<Event[]>([]);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [idEvent, setIdEvent] = useState<string>('');
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
    },[]);

    useEffect(() => {
        if (!router.isReady) return;

        const {id} = router.query;
        if (typeof id === 'string') {
            setIdEvent(id)

            fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/event/${id}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then((data) => {
                   
                    setEvent(data)
                }).catch((error) => {
                console.log(error);

            });
        }
    }, [router.isReady]);


    const deleteEvent = useCallback(async (e: any) => {
        e.preventDefault();

        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/event/${idEvent}`, {
            method: 'DELETE',   
        })
            .then(response => response.json())
            .then((data) => {
                router.push('/me/event');
            }).catch((error) => {
                console.log(error);
            });
    }, [idEvent]);

    
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
                    <div className="container mx-auto pt-10 h-screen">
                     
                            <div className="grid grid-cols-1 md:grid-cols-12 h-4/6">
                                <div className="md:col-span-5 my-10">
                                    <div className="py-8 px-10 mx-auto  max-w-4xl rounded-lg lg:py-14 bg-white">
                                       
                                        <h2 className="mb-3 text-xl font-bold text-gray-900">Les Ludotters</h2>

                                     

                                        <hr></hr>
                                        <div className="w-full mt-5 font-medium rounded px-5 py-2 bg-custom-highlight-orange">
                                            Waseem NASSURALLY
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-7 md:col-start-7 my-10">

                                    <div className="py-8 px-10 mx-auto  max-w-4xl rounded-lg lg:py-14 bg-white">

                                        <h2 className="mb-10 text-xl font-bold text-gray-900">{event[0]?.name}</h2>
                                        <div className="flex mb-5 justify-between">
                                            <span className="bg-custom-pastel-purple rounded font-medium px-3 py-1 leading-[100%] inline-block">Où ?</span>
                                            <span className="px-3 py-1 leading-[100%] inline-block">144 rue la Fayette 75010 Paris</span>
                                        </div>
                                        <div className="flex mb-5 justify-between">
                                            <span className="bg-custom-highlight-orange rounded font-medium px-3 py-1 leading-[100%] inline-block">Quand ?</span>
                                            <span className="px-3 py-1 leading-[100%] inline-block">{event[0]?.date} {event[0]?.time}</span>
                                        </div>
                                        <div className="flex mb-5 justify-between ">
                                            <span className="bg-custom-pastel-blue rounded font-medium px-3 py-1 leading-[100%] inline-block">Pour quoi ?</span>
                                            <span className="px-3 py-1 leading-[100%] inline-block">{event[0]?.description} </span>
                                        </div>

                                        <div className="mt-10">
                                            <Button color="failure" onClick={() => setDeleteModal(true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                </svg>

                                                Annuler l'évènement
                                            </Button>
                                        </div>

                            

                                    </div>

                                  
                    
                                    {deleteModal ? (
                                    <>
                                    <Modal setShowModal={setDeleteModal} title="">
                                    <div className="text-center">
                                               
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Voulez-vous vraiment annuler cet évènement ?
                                        </h3>

                                        <div className="flex justify-center gap-4">
                                            <Button color="failure" onClick={deleteEvent}>
                                                Oui, je suis sûr
                                            </Button>
                                            <Button
                                                color="gray"
                                                onClick={() => setDeleteModal(false)}
                                            >
                                                Non, annuler
                                            </Button>
                                        </div>
                                    </div>

                                    </Modal>
                                    </>
                                    ) : null}
                                 
                                </div> 
                            </div>
                    
                    </div>
                </section>
            </HomeLayout>
        </>
    )
}