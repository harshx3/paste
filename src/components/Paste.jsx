import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    function DateFormat(date) {
        const formatedDate = new Date(date);
        return formatedDate.toLocaleDateString('en-us', {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    const shareContent = (id) => {
        const sharePaste = pastes.find((p) => {
            p._id === id;
        });
        if (navigator.share) {
            navigator.share({
                title: "Check this out!",
                text: sharePaste,
                url: window.location.href,
            }).then(() => console.log("Successfull Shared")).catch((error) => console.error("Error Sharing", error));
            toast.success("Shared");
        }
        else {
            alert("Sharing is not supported in this browser");
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full bg-black text-white gap-3 p-4 mt-2'>

            <div> <input className='px-4 py-2 rounded-lg outline-red-300 bg-white text-black' type="search" placeholder='search here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
            <div className='flex flex-col gap-5 min-w-[20rem]'>
                {
                    filteredData.length > 0 &&
                    filteredData.map((paste) => {
                        console.log(filteredData);
                        return (
                            <div key={paste.title} className='rounded-lg bg-zinc-800 p-4'>
                                <div>
                                    <strong className='text-red-300'>Title: </strong>{paste.title}
                                </div>
                                <div>
                                    <strong className='text-red-300'>Content: </strong> {paste.content}
                                </div>
                                <div className='flex flow-row gap-5 place-content-evenly mt-2'>
                                    <button className='border px-4 py-1 border-red-300 rounded-lg bg-white text-black hover:bg-zinc-800 hover:text-white font-semibold uppercase '>
                                        <NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink>
                                    </button>
                                    <button className='border px-4 py-1 border-red-300 rounded-lg bg-white text-black hover:bg-zinc-800 hover:text-white font-semibold uppercase '>
                                        <NavLink to={`/pastes/${paste?._id}`}>View</NavLink>
                                    </button>
                                    <button onClick={() => handleDelete(paste?._id)} className='border px-4 py-1 border-red-300 rounded-lg bg-white text-black hover:bg-zinc-800 hover:text-white font-semibold uppercase '>Delete</button>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(paste?.content);
                                        toast.success("Copied");
                                    }} className='border px-4 py-1 border-red-300 rounded-lg bg-white text-black hover:bg-zinc-800 hover:text-white font-semibold uppercase '>Copy</button>
                                    <button className='border px-4 py-1 border-red-300 rounded-lg bg-white text-black hover:bg-zinc-800 hover:text-white font-semibold uppercase ' onClick={() => shareContent(paste._id)}>Share</button>
                                </div>
                                <div className='mt-2 flex justify-end text-red-300'>
                                    {
                                        DateFormat(paste.createdAt)
                                    }
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Paste