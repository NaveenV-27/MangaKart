"use client"
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import onepiece from "@/public/covers/onepiece.jpg"
import naruto from "@/public/covers/naruto.jpg"
import dragonball from "@/public/covers/dragonball.jpg"


const Card = () => {
  const [index, setIndex] = useState(0);
  const slideRefs = useRef([]);
  useEffect(() => {
    if (slideRefs.current[index]) {
      slideRefs.current[index].style.background = "white";
      // slideRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index]);
  

  let list = [
    {
      "img" : onepiece,
      "name" : "One piece",
      "rating" : "9.7"
    },
    {
      img : dragonball,
      "name" : "Dragon ball",
      "rating" : "9.3"
      
    },
    {
      img : naruto,
      "name" : "Naruto",
      "rating" : "8.9"
    },
   
   
  ]

  // setInterval(()=>{
  //   nextSlide()
  // }, 3000)

  const handleSelect = async (selectedIndex, e) => {
    slideRefs.current[index].style.background = "rgb(148,163,184)";
    setIndex(selectedIndex);
  
    slideRefs.current[index].style.background = "white";
  };

  const prevSlide = ()=>{
    setIndex(index === 0? list.length-1: index-1)
  }
  const nextSlide = ()=>{
    setIndex(index === list.length-1? 0: index+1)
  }

  


  return (
    
    <div className="relative w-full max-w-screen-lg mt-4 mx-auto overflow-hidden">
      
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
        >
        {list.map((item, i) => (
          <Link href={`/${item.name.replace(" ", "-")}`} key={i} className="relative w-full flex-shrink-0">
          <Image
            src={item.img}
            alt={`Slide ${i}`}
            className="w-full h-auto"
          />
          <span className="absolute bottom-16 md:text-5xl font-serif left-6 text-amber-500 bg-stone-50">
            {item.name}
          </span>
          <span className="absolute bottom-6 left-6 text-gray-600 bg-white">
            {item.rating}/10
          </span>
          <span className="absolute top-4 left-6 text-amber-100 font-serif font-bold bg-slate-700 p-4">
            Trending Right Now
          </span> 
        </Link>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/50 px-3 py-2 rounded-full"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/50 px-3 py-2 rounded-full"
      >
        &#8250;
      </button>
       <div className='flex-center p-4 gap-4'>
          
         {
          list.map((img, i)=>{
            return <div key={i} className="h-1 w-8 slide cursor-pointer hover:scale-125 bg-slate-400 transition-all" ref={(el) => (slideRefs.current[i] = el)} onClick={(e) => handleSelect(i,e)}></div>
          })
        }
        </div>
    </div>
  );
}

export default Card
