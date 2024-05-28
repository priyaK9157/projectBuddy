"use client"
import front from '../Assets/front1.jpg';
import Image from 'next/image';
import {CiSearch} from "react-icons/ci"
import {IoLocationSharp} from "react-icons/io5"
import Autosuggest from 'react-autosuggest'; 
import React,{ useState } from 'react';
import {LuFilter} from "react-icons/lu"
import {MdMyLocation} from "react-icons/md"


const HomePage = () => {

    const locations = ["Delhi, India", "Odisha, India", "Mumbai, India", "Bangalore, India", "Chennai, India"];
    const [locationSuggestions, setLocationSuggestions] = useState([]);
   
  
    
  
    const onSuggestionsClearRequested = () => {
        setLocationSuggestions([]);
    };
   

  

    return (
        <div className='bg-gray-100 '>
             {/* hero section*/}
             <div className=' mx-auto w-8/12  flex h-screen p-10 '>
                  {/* left side*/}
                  <div className=' flex flex-col gap-4 mt-20 '>
                       <p className=' text-slate-800 font-semibold text-4xl max-w-[60%]'>Find A Project that suit Your interest & skills.</p>
                       <p className=' text-xl text-slate-500 font-semibold max-w-[80%]'>Creating a successful project involves defining clear and specific goals, developing a comprehensive plan with timelines and milestones.</p>

                       {/*input*/}
                       <div className='flex gap-4 border-[2px] border-slate-300 p-2 mt-3 rounded-xl bg-white w-[80%]'> 
                                    <div className=' flex items-center gap-3 text-xl border-r-[3px] border-slate-300  w-[50%] '>
                                       <CiSearch className=' text-4xl text-[#007AE9]' />
                                       <input placeholder=' job title,KeyWords...'  className='outline-none text-slate-800 text-xl'
                                       onKeyDown={(e)=>{
                                         
                                       }}/>
                                    </div>
                                    <div className=' flex items-center gap-3 text-xl w-[50%]  '>
                                       <IoLocationSharp className=' text-4xl text-[#007AE9]'/>
                                    <input
                                          placeholder= 'City, state'
                                          className='outline-none text-slate-800 text-xl'
                                    />
                                      
                                    </div>
                                 
                                   
                                    <button className=' border-2 p-3 px-10 py-5 rounded-xl bg-[#007AE9] text-white font-bold -ml-12 ' >
                                       Search 
                                    </button>
                              </div>
                  </div>
                  <div>
                      <Image src={front} className=''/>
                  </div>
             </div>
        </div>
    );
};

export default HomePage;
