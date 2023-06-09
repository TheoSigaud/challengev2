import AdminLayout from "@/components/layouts/Admin";
import 'flowbite';
import { useCallback, useEffect, useState } from 'react';
import FormCreate from "@/components/admin/event/FormCreate";
import Head from "next/head";



export default function New(){

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <AdminLayout>

                <section>
                  
                    <FormCreate/>
                </section>

            </AdminLayout>
        </>
    );
    

}