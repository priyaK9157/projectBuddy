import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { IoIosTime } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { RiDeleteBack2Line } from "react-icons/ri";


const DashboardPage = ({cardData,Location="India",deleteicon,setdeleteproject}) => {
  
  const router=useRouter();

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

 


  
function handleNavigate(projectid) {
  const queryString = new URLSearchParams({ projectid }).toString();
  router.push(`/components/ProjectInfo/ProjectDesc?${queryString}`);
}
  return (
    <div className=' flex justify-around items-center border-b-[2px] border-slate-300 p-2 mb-5'>
         <div>
              <div className=' flex gap-2'>
                  <p className=' text-xl text-slate-800 font-semibold'>{cardData?.projectName}</p>
                  <p className=' bg-blue-100 text-blue-700 rounded-lg p-2'>Remote</p>
              </div>
               <div className=' text-slate-500 text-lg flex gap-2'>
                  <p className=' flex gap-2 items-center text-xl'>
                   <CiLocationOn/>
                    {Location}

                  </p>
                  <p className=' flex gap-2 items-center text-xl'>
                       <IoIosTime/>
                    {cardData?.BasicDetail?.projectLength} 
                  
                  </p>
               </div>
          </div> 
          <div className=' text-xl text-slate-600'>
                Feb 2 2019 19:28
          </div>
          <div className=' flex gap-2 items-center text-xl text-green-600 font-bold'>
               <TiTick/>
              Active
          </div>
      <div className=' flex items-center gap-3'>
            <div className=' cursor-pointer bg-gray-200 text-blue-700 font-semibold h-fit p-5 rounded-lg text-lg flex items-center gap-2'
            onClick={()=>{
              handleNavigate(cardData._id)
            }} >
                View Detail
                <FaArrowRight/>
            </div>
            {
               deleteicon=="true" ? (
                    <div className=' bg-red-100 rounded-lg p-5 cursor-pointer ' onClick={()=>{
                      setdeleteproject(cardData?._id)
                    }}>
                    <RiDeleteBack2Line className=' text-red-500 font-semibold text-2xl'/>
                    </div>
               ) : (
                  <div></div>
               )
            }
       </div>
    </div>
  )
}

export default DashboardPage