import React from 'react';
import Link from 'next/link';

const Page = async ({ params }) => {
    const manga = (await params).manga.replaceAll("-", " ");

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ name: manga });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        const response = await fetch("http://localhost:3000/api/generate", requestOptions);
        const data = await response.json();
        const item = data.doc;

        return (
            <div className="flex flex-col items-center w-full font-serif p-6 space-y-8 bg-gradient-to-r from-slate-900 to-slate-700">
                {/* Manga Header Section */}
                <div className="md:flex items-center justify-center md:space-x-8 w-full max-w-6xl bg-slate-400 shadow-lg rounded-lg p-6">
                    <img
                        src={item.img}
                        alt={`${item.name} Image`}
                        className="rounded-lg shadow-md w-full max-w-md"
                    />
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">{item.name}</h1>
                        <p className="text-2xl text-gray-800">{item.count} chapters</p>
                        <p className="text-lg text-gray-700">{item.description}</p>
                    </div>
                </div>

                {/* Volumes Section */}
                <div className="w-full md:max-w-6xl">
                    <h2 className="text-3xl font-semibold text-white mb-4">Volumes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {item.volumes.map((volume, index) => (
                            <Link
                                key={index}
                                className="bg-slate-300 shadow-md rounded-lg p-4 flex flex-col items-center text-center space-y-4"
                                href={`/${manga.replaceAll(" ", "-")}/chapter-${volume.number}`}
                            >
                                <img
                                    src={volume.img}
                                    alt={`Volume ${volume.number} Cover`}
                                    className="rounded-lg shadow-md w-40 h-60 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-700">
                                    Volume {volume.number}
                                </h3>
                                <p className="text-gray-500">{volume.releaseDate}</p>
                            </Link>
                        ))}
                    </div>
                </div>
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
