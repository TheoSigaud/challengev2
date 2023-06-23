import Head from 'next/head'
import React, { useCallback, useEffect, useState } from "react";
import HomeLayout from "@/components/layouts/Home";
import FormCreate from "@/components/event/FormCreate";
import { useRouter } from 'next/router';

interface Event {
    name: string;
    description: string;
    id: string;
    date: string;
    time: string;
}

export default function Event() {


    const router = useRouter();
    const [event, setEvent] = useState<Event[]>([]);
    const [eventId, setEventId] = useState<string>();
    
    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
    });




    useEffect(() => {
        if (!router.isReady) return;

        const {id} = router.query;
        if (typeof id === 'string') {
            setEventId(id);
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
    },[router.isReady]);

    const book = useCallback( async () => {

        const {id} = router.query;

      
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/event/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               eventId:id
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        }).catch((error) => {
        console.log(error);
        });

    },[])



    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeLayout>
                <section>
                    <div className="py-8 px-10 mx-auto my-8 max-w-4xl rounded-lg lg:py-12 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 ">
                        <h2 className="text-2xl text-white font-bold text-gray-900">{event[0]?.name}</h2>
                    </div>
                    
                    <div className="py-8 px-10 mx-auto my-12 max-w-4xl rounded-lg lg:py-16 bg-white">
                        <div className="flex mb-5 justify-between">
                            <span className="bg-custom-pastel-purple rounded font-medium px-3 py-1 leading-[100%] inline-block">Où ?</span>
                            <span className="px-3 py-1 leading-[100%] inline-block">12344</span>
                        </div>
                        <div className="flex mb-5 justify-between">
                            <span className="bg-custom-highlight-orange rounded font-medium px-3 py-1 leading-[100%] inline-block">Quand ?</span>
                            <span className="px-3 py-1 leading-[100%] inline-block">{event[0]?.date}</span>
                        </div>
                        <div className="flex mb-5 justify-between ">
                            <span className="bg-custom-pastel-blue rounded font-medium px-3 py-1 leading-[100%] inline-block">Pour quoi ?</span>
                            <span className="px-3 py-1 leading-[100%] inline-block">{event[0]?.description}</span>
                        </div>

                        <button onClick={book} className="mx-auto w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-custom-orange rounded-lg hover:bg-custom-hover-orange">
                            Je réserve ma place
                        </button>
                    
                       
                    </div>

            
        
                   
                </section>
            </HomeLayout>
        </>
    )
}