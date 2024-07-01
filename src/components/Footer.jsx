import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[rgb(11,10,25)] text-purple-300 bottom-0 w-full'>
            <div className='flex items-center justify-between py-6 my-container '>
                <div className="logo font-bold text-2xl md:text-3xl ">
                    <span className='text-orange-600'>&lt;</span>Pass<span className='text-orange-600'>OP/&gt;</span>
                </div>
                <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/home">Home</a>
                        <a className='hover:font-bold' href="/About">About</a>
                        <a className='hover:font-bold' href="/contact">Contact</a>
                    </li>
                </ul>
                
            </div>
        </footer>
  )
}

export default Footer

