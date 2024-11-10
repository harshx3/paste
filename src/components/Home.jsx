import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../features/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content)
        }
    }, [pasteId]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }


        if (pasteId) {
            dispatch(updateToPastes(paste));
        }
        else {
            dispatch(addToPastes(paste));
        }

        //clear after creating or updating paste
        setTitle('');
        setValue('');
        setSearchParams({});

    }

    return (
        <div className='border rounded-md p-4 flex flex-col bg-black mt-2 min-w-full'>
            <div className='flex justify-center gap-10 flex-wrap'>
                <input className='rounded-md outline-none text-start px-4 py-3' type="text"
                    id=""
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <button className='outline-none px-4 py-2 rounded-md bg-zinc-800 text-white' onClick={createPaste}>
                    {
                        pasteId ? "Update Paste" : "Create Paste"
                    }
                </button>
            </div>

            <div className='mt-4 flex justify-center'>

                <div className='border-t-[1.5rem] border-zinc-800 rounded-[6.4%] items-center relative'>

                    <div className="flex justify-start items-center space-x-2 mt-2 ml-4 absolute top-[-1.5rem]">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>

                    <textarea value={value}
                        className='rounded-2xl mt-4 border min-w-[30rem] p-4 relative top-[-1rem] outline-none'
                        placeholder='enter content here'
                        onChange={(e) => setValue(e.target.value)}
                        rows={20} />

                </div>
            </div>

        </div>
    )
}

export default Home