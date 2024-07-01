import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-[rgb(11,10,25)] text-purple-300  '>
            <div className='flex items-center justify-between py-6 my-container'>
                <div className="logo font-bold text-2xl md:text-3xl ">
                    <span className='text-orange-600'>&lt;</span>Pass<span className='text-orange-600'>OP/&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="/">About</a>
                        <a className='hover:font-bold' href="/">Contact</a>
                    </li>
                </ul> */}
                <button className='invert flex flex-col text-black items-center text-sm font-semibold'>
                    <img className='w-[28px]' src="./src/assets/github.svg" alt="" srcSet="" />
                    Github
                </button>
            </div>
        </nav>
    )
}

export default Navbar
