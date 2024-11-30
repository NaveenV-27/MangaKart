"use client"
import { useState, useRef } from 'react';

const Card = ({slides, interval}) => {
  const [index, setIndex] = useState(1);
  const slide = useRef()

  const handleSelect = async (selectedIndex, e) => {
    setIndex(selectedIndex);
    console.log(index)
    
    slide.current.style.background = "rgb(148,163,184)";
    slide.current = e.target
    slide.current.style.background = "white";
  };

  return (
    <ul className='flex-center gap-2'>
      <li className="h-1 w-8 slide cursor-pointer hover:scale-125 bg-slate-400 transition-all" ref={slide} onClick={(e) => handleSelect(1,e)}></li>
      <li className="h-1 w-8 slide cursor-pointer hover:scale-125 bg-slate-400 transition-all" onClick={(e) => handleSelect(2,e)}></li>
      <li className="h-1 w-8 cursor-pointer hover:scale-125 bg-slate-400 transition-all" onClick={(e) => handleSelect(3,e)}></li>
    </ul>
  );
}

export default Card
