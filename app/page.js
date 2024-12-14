"use client"
import Carousel from "./components/Carousel";
import MangaList from "./components/MangaList";


export default function Home() {

  

  return (


    <div className="min-h-[89.7vh] text-3xl flex-center flex-col bg-gradient-to-r from-slate-900 to-slate-700">

      <Carousel />

      <div className="w-full p-4 font-semibold font-serif">
        Checkout the Latest releases
      </div>
      <MangaList/>
    </div>
  );
}
