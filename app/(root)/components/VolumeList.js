import React from 'react';
import Link from 'next/link';

const VolumeList = async ({ manga_id, manga }) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ manga_id });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://localhost:3000/api/generate/volumes", requestOptions);
        const item = await response.json();

        // Check if volumes are available
        if (!item.volumes || !Array.isArray(item.volumes)) {
            return (
                <div className="text-red-500">
                    <p>{item.error || 'No volumes found.'}</p>
                </div>
            );
        }

        return (
            <div className="w-full md:max-w-6xl">                    
                <h2 className="text-3xl font-semibold text-white mb-4">Volumes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {item.volumes.map((volume, index) => (
                        <Link
                            key={index}
                            className="bg-slate-300 shadow-md rounded-lg p-4 flex flex-col items-center text-center space-y-4"
                            href={`/${manga.replaceAll(" ", "-")}/volume-${volume.volume_number}`}
                        >
                            <img
                                src={volume.cover_image_url}
                                alt={`Volume ${volume.volume_number} Cover`}
                                className="rounded-lg shadow-md w-40 h-60 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-gray-700">
                                Volume {volume.volume_number}: {volume.title}
                            </h3>
                            <p className="text-gray-500">{volume.release_date.split("T")[0]}</p>
                        </Link>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching volume list:', error);
        return (
            <div className="text-red-500">
                <p>Error fetching volume list. Please try again later.</p>
            </div>
        );
    }
};

export default VolumeList;
