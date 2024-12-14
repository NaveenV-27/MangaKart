import ReactDOM from 'react-dom'
import Link from 'next/link';
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className='flex-center justify-between py-4 px-4 h-fit bg-gradient-to-r from-slate-800 to-slate-600 '>
      <Link href="/" className='text-3xl'>
        MANGA<span className='text-blue-500'>kart</span>
      </Link>
      <div className="flex-center w-full bg-white text-black mx-32 h-10 rounded-3xl justify-between p-1">
          <input type="text" className='w-full border-2 focus:border-black h-full rounded-2xl p-2' />
          <IoSearch className=' fill-black p-2 h-max rounded-full size-8 mx-1 hover:scale-125 cursor-pointer bg-slate-300' />
      </div>
      <ul className='flex-center gap-4 text-xl mr-4'>
        
        <li className='cursor-pointer hover:scale-110 transition-all'>genres</li>
        <li className='cursor-pointer hover:scale-110 transition-all'>contact</li>
        <li className='cursor-pointer hover:scale-110 transition-all'><CgProfile className='size-6' /></li>
        <li className='cursor-pointer hover:scale-110 transition-all'><FaShoppingCart className='size-6' /></li>
      </ul>
    </nav>
  )
}

export default Navbar
