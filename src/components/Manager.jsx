import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArr, setPasswordArr] = useState([])

    const getPass = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArr(passwords)
    }


    useEffect(() => {
        // let passwords = localStorage.getItem("passwords")
        // if (passwords)
        //     setPasswordArr(JSON.parse(passwords))
        getPass()
    }, [])

    const toggleShow = () => {
        if (ref.current.src.includes("show.svg")) {
            ref.current.src = "./src/assets/hide.svg"
            passRef.current.type = "text"
        }
        else {
            ref.current.src = "./src/assets/show.svg"
            passRef.current.type = "password"
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = async() => {
        if (form.site.length === 0)
            alert("Please enter site url")
        else if (form.username.length === 0)
            alert("Please enter username")
        else if (form.password.length === 0)
            alert("Please enter password")
        else {

            //Check if id already exists if so delete
            await fetch("http://localhost:3000/", {
                headers: {
                    "Content-Type": "application/json",
                  },
                method: "DELETE",
                body: JSON.stringify({ id : form.id })
            })


            setPasswordArr([...passwordArr, { ...form, id: uuidv4() }])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArr, { ...form, id: uuidv4() }]))
            let req = await fetch("http://localhost:3000/", {
                headers: {
                    "Content-Type": "application/json",
                  },
                method: "POST",
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const copyText = (text) => {
        toast('Text copied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const editText = (id) => {
        setform({...passwordArr.filter(item => item.id === id)[0],id})
        setPasswordArr(passwordArr.filter(item => item.id != id))
    }

    const deleteText = async (id) => {
        let dec = confirm("Do you really want to delete?")
        if (dec) {
            setPasswordArr(passwordArr.filter(item => item.id != id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArr.filter(item => item.id != id)))

            let req = await fetch("http://localhost:3000/", {
                headers: {
                    "Content-Type": "application/json",
                  },
                method: "DELETE",
                body: JSON.stringify({ id })
            })

            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-[rgb(209,208,219)] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] ">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
                </div>
            </div>
            <div className=" md:my-container ">
                <p className='text-center p-3 text-xl md:text-2xl font-semibold text-[rgb(11,10,25)]'>Welcome!! It's your own password manager</p>
                <div className='flex flex-col p-4 gap-8 w-full items-center'>
                    <input onChange={handleChange} name='site' value={form.site} placeholder='Enter website URL' className='w-full border-[2px] border-[rgb(11,10,25)] rounded-2xl px-3 py-1' type="text" />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-7'>
                        <input onChange={handleChange} name='username' value={form.username} placeholder='Enter Username' className='border-[2px] border-[rgb(11,10,25)] rounded-2xl md:w-[44%] px-3 py-1' type="text" />
                        <div className=' relative  md:w-[44%] flex items-center'>
                            <input ref={passRef} onChange={handleChange} name='password' value={form.password} placeholder='Enter Password' className='border-[2px] border-[rgb(11,10,25)] rounded-2xl w-full px-3 py-1' type="password" />
                            <span className='absolute right-2  cursor-pointer '>
                                <img ref={ref} onClick={toggleShow} src="./src/assets/show.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={handleSave} className=' flex font-medium bg-gray-400 p-2 px-3 rounded-3xl hover:bg-gray-500 border border-orange-800 gap-2'>
                        <img src="./src/assets/add.svg" alt="" />
                        Add password
                    </button>
                </div>
                <div className="passwords px-4">
                    <h2 className='py-4 font-bold text-xl text-[rgb(11,10,25)]'>Your passwords</h2>
                    {passwordArr.length === 0 && <div className='text-xl'>No password to show!!</div>}
                    {passwordArr.length != 0 && <div className="relative overflow-x-auto py-4 mb-4">
                        <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-base text-purple-400 uppercase bg-[rgb(11,10,25)] dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Site</th>
                                    <th scope="col" className="px-6 py-3">Username</th>
                                    <th scope="col" className="px-6 py-3">Password</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {passwordArr.map(item => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900" style={{ width: "25%" }}>
                                            <div className='flex gap-2'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <img className='cursor-pointer' onClick={() => copyText(item.site)} src="./src/assets/copy.svg" alt="" srcSet="" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4" style={{ width: "25%" }}>
                                            <div className='flex gap-2'>
                                                {item.username}
                                                <img className='cursor-pointer' onClick={() => copyText(item.username)} src="./src/assets/copy.svg" alt="" srcSet="" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4" style={{ width: "25%" }}>
                                            <div className='flex gap-2'>
                                                {"*".repeat(item.password.length)}
                                                <img className='cursor-pointer' onClick={() => copyText(item.password)} src="./src/assets/copy.svg" alt="" srcSet="" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4" style={{ width: "25%" }}>
                                            <div className='flex gap-2'>
                                                <img className='cursor-pointer' onClick={() => editText(item.id)} src="./src/assets/edit.svg" alt="" srcSet="" />
                                                <img className='cursor-pointer' onClick={() => deleteText(item.id)} src="./src/assets/delete.svg" alt="" srcSet="" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>}


                </div>
            </div>
        </>
    )
}

export default Manager