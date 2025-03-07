// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Search } from 'lucide-react'
// import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import { useNavigate } from 'react-router-dom';

// const HeroSection = () => {
//     const [query, setQuery] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const searchJobHandler = () => {
//         dispatch(setSearchedQuery(query));
//         if (query) navigate("/browse");
//     }

//     return (
//         <div className='text-center'>
//             <div className='flex flex-col gap-5 my-10'>
//                 <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#28B463] font-bold'>JobHive: Your Gateway to Career Opportunities</span>
//                 <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#2E86C1]'>Dream Jobs</span></h1>
//                 <p className='text-gray-500 my-5'>JobHive is a dynamic job-portal platform that connects job seekers with employers seamlessly. Discover your dream job and apply today!</p>
//                 <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
//                     <input
//                         type="text"
//                         placeholder='Find your dream jobs'
//                         onChange={(e) => setQuery(e.target.value)}
//                         className='outline-none border-none w-full'

//                     />
//                     <Button onClick={searchJobHandler} className="rounded-r-full bg-[#2E86C1] hover:bg-[#2E86C1] active:bg-[#28B463]">
//                         <Search className='h-5 w-5' />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSection



import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        if (query) navigate("/browse");
    };

    return (
        <div className='text-center px-4'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#28B463] font-bold'>
                    JobHive: Your Gateway to Career Opportunities
                </span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                    Search, Apply & <br /> Get Your <span className='text-[#2E86C1]'>Dream Job</span>
                </h1>
                <p className='text-gray-500 my-5 max-w-2xl mx-auto'>
                    JobHive is a dynamic job-portal platform that connects job seekers with employers seamlessly. Discover your dream job and apply today!
                </p>
                <div className='flex w-full sm:w-[70%] md:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type='text'
                        placeholder='Find your dream job'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full p-2 text-sm md:text-base'
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#2E86C1] hover:bg-[#2E86C1] active:bg-[#28B463]'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
