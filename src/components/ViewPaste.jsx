import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

    const { id } = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.filter((p) => p._id === id)[0];

    return (
        <div className='mt-4 flex justify-center flex-col'>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={paste.title}
                    disabled
                    className="rounded-md p-2 w-full max-w-md bg-gray-100 text-gray-600"
                />
            </div>

            <div className='border-t-[1.5rem] border-zinc-800 rounded-[6.4%] items-center relative'>

                <div className="flex justify-start items-center space-x-2 mt-2 ml-4 absolute top-[-1.5rem]">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>

                <textarea value={paste.content}
                    className='rounded-2xl mt-4 border min-w-[30rem] p-4 relative top-[-1rem] outline-none'
                    placeholder='enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20} />

            </div>
        </div>
    )
}

export default ViewPaste