import React from 'react'
import { MdDelete } from "react-icons/md";


const page = () => {
  return (
    <div className='flex-center flex-col min-h-[81vh] text-3xl bg-gradient-to-r from-slate-900 to-slate-700'>
        <h1>Your Cart</h1>
        <ul className='flex-center gap-4 my-4'>
            <li>
                <div className='ring-4 p-2'>
                    <h2>Product Name</h2>
                    <p>Price: $10.00</p>
                    <p>Quantity: 1</p>
                   
                   <div className='flex justify-center'><button className='hover:scale-110'><MdDelete /></button></div>
                </div>
            </li>
            <li>
                <div className='ring-4 p-2'>
                    <h2>Product Name</h2>
                    <p>Price: $15.00</p>
                    <p>Quantity: 2</p>
                   <div className='flex-center'><button className='hover:scale-110'><MdDelete /></button></div>
                </div>
            </li>
        </ul>
        <div className='flex-center my-4 flex-col'>
            <h3>Total: $40.00</h3>
            <button>Proceed to Checkout</button>
        </div>
    </div>
  )
}

export default page
