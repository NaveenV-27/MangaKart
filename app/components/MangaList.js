"use client"
import React from 'react'
import { useEffect, useState } from "react";
import Link from "next/link";

const MangaList = () => {
    const [data, setdata] = useState([])
  const getData = async () => {

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let a = await fetch("http://localhost:3000/api/generate", requestOptions)
    setdata(await a.json())
  }


  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="grid grid-cols-3 px-20 w-full gap-4 m-4">
        {
          data.map((item, i) => (
            <Link href={`/${item.name}`} className="bg-black flex-center h-80 relative" key={i}>
              <img src={item.img} alt="Cover" />
              <span className="absolute text-amber-600 bg-gray-400 bottom-12 left-4">{item.name}</span>
              <span className="absolute text-amber-600 bg-gray-400 bottom-4 left-4">{item.count} chapters</span>
            </Link>
          ))
        }


      </div>
  )
}

export default MangaList
