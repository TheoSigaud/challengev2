import Head from 'next/head'
import React, {useEffect, useState} from "react";
import HomeLayout from "@/components/layouts/Home";
import Link from "next/link";
import Loader from "@/components/utils/Loader";

interface Event {
    name: string;
    description: string;
    id: string;
    date:string;
    company: Company;
}

interface Company{
    name:string;
}


export default function List() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        document.body.classList.add("bg-custom-light-orange");
    });

    useEffect(() => {
        
        fetch(`${process.env.NEXT_PUBLIC_CLIENT_API}/event/coming`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                
                setEvents(data)
                setLoader(false);

            }).catch((error) => {
            console.log(error);

        });

    }, []);

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
                    <div className="container my-12 mx-auto px-4 md:px-12">
                        { !loader ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-10">
                            { events.length > 0 && events.map((item, index) => (
                                <Link href={`/event/${item?.id}`} key={index}>
                                    <div className="w-80 bg-white rounded-lg shadow mx-auto hover:-translate-y-3 hover:cursor-pointer hover:scale-105 duration-300">
                                        <div className="bg-gradient-to-r rounded-t text-center from-indigo-500 via-purple-400 to-pink-400 text-xl text-white  p-3 font-semibold">{item?.company?.name}</div>
                                        <div className="px-4 py-2">
                                            <h5 className="mb-1 text-2xl font-medium text-gray-900">{item?.name}</h5>
                                            <p className="mb-1 font-normal text-gray-700">{item?.description}</p>
                                            <p className="mb-3 text-xs font-normal text-gray-700">{item?.date} </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        ) : <Loader></Loader>

                        }
                    </div>
                </section>
            </HomeLayout>
        </>
    )
}