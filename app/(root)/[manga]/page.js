import React from 'react';
import Link from 'next/link';
import VolumeList from '../components/VolumeList';

const Page = async ({ params }) => {
    const manga = (await params).manga.replaceAll("-", " ");
    

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ title: manga });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        const response = await fetch("http://localhost:3000/api/generate", requestOptions);
        
        const data = await response.json(); 
        const item = data.manga;    
        

        return (
            <div className="flex flex-col items-center min-h-[81.5vh] w-full font-serif p-6 space-y-8 bg-gradient-to-r from-slate-900 to-slate-700">
                <div className="md:flex items-center justify-center md:space-x-8 w-full max-w-6xl bg-slate-400 shadow-lg rounded-lg p-6">
                    <img
                        src={item.cover_image_url}
                        alt={`${item.title} Image`}
                        className="rounded-lg shadow-md w-full max-w-md"
                    />
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">{item.title}</h1>
                        <p className="text-2xl text-gray-800">{item.chapter_count} chapters</p>
                        <p className="text-lg text-gray-700">{item.description}</p>
                    </div>
                </div>
                <VolumeList manga_id={item.id} manga={item.title} />
            </div>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return (
            <div className="flex-center h-[90vh] font-serif text-4xl">
                <p>Error loading data</p>
            </div>
        );
    }
};

export default Page;
