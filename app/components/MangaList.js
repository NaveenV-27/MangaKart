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
    <div className="grid md:grid-cols-3 px-20 w-full gap-4 m-4">
      {data.map((item, i) => (
        <Link
          href={`/${item.name.replaceAll(" ", "-")}`}
          className="relative bg-black flex-center h-80 rounded-lg overflow-hidden group"
          key={i}
        >
          <img src={item.img} alt="Cover" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" />
          
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>

          <span className="absolute bottom-12 left-4 bg-black bg-opacity-70 text-white font-bold text-lg px-3 py-1 rounded-md shadow-lg">
            {item.name}
          </span>

          <span className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-md shadow-md">
            {item.count} chapters
          </span>
        </Link>
      ))}
    </div>
  )
}

export default MangaList
