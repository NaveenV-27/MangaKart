import Link from 'next/link';
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className='flex-center sticky justify-between py-4 px-4 h-fit bg-gradient-to-r from-slate-800 to-slate-600 '>
      <Link href="/" className='text-3xl font-serif'>
        MANGA<span className='text-blue-500'>kart</span>
      </Link>
      <div className="flex-center relative w-full bg-white text-black mx-32 h-10 rounded-3xl justify-between p-1">
          <input type="text" placeholder='Search for manga' className='w-full border-2 border-white focus:outline-none px-3 h-full rounded-2xl p-2' />
          <div className='bg-gray-500 p-2 h-max rounded-full size-8 mx-1 hover:scale-105 cursor-pointer'>

            <IoSearch className=' fill-black ' />
          </div>
          
      </div>
      <ul className='flex-center gap-4 text-xl mr-4'>
        
        <Link href="/admin" className='cursor-pointer hover:scale-110 transition-all'>
          Admin
        </Link>
        <li className='cursor-pointer hover:scale-110 transition-all'>genres</li>
        <li className='cursor-pointer hover:scale-110 transition-all'>contact</li>
        <li className='cursor-pointer hover:scale-110 transition-all'><CgProfile className='size-6' /></li>
        <li className='cursor-pointer hover:scale-110 transition-all'><Link href="/cart"><FaShoppingCart className='size-6' />
        </Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
