import Head from 'next/head'
import React, { useEffect } from "react";
import HomeLayout from "@/components/layouts/Home";
import FormCreate from "@/components/admin/party/FormCreateAdmin";
import AdminLayout from '@/components/layouts/Admin';

export default function New() {
    useEffect(() => {
        document.body.classList.add("bg-custom-light-blue");
    });

    return (
        <>
            <Head>
                <title>Ludotter</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminLayout>
                <div className="p-4 sm:ml-64">
                    <section className="p-4">
                        <FormCreate />
                    </section>
                </div>
            </AdminLayout>
        </>
    )
}