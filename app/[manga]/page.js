import React from 'react'

const page = async ({ params }) => {

    const manga = (await params).manga
    return (
        <div className='flex-center h-[90vh] font-serif text-4xl'>
            {manga.replaceAll("%20", " ")}
        </div>
    )
}

export default page
