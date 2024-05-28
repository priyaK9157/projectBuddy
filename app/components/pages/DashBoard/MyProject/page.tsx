
import React, { useEffect, useState } from 'react'
import DashboardPage from "../../../commonPage/DashboardPage"
import Image from 'next/image'
import not_found from "../../../Assets/404.png"
import { useUser } from '@auth0/nextjs-auth0/client'
import { DeleteProject, findProjectByEmail } from '@/app/Services/operations/ProjectHandler'
import toast from 'react-hot-toast'

const page = ({userData}) => {
    const { user, error, isLoading } = useUser();
    const[projectData,setProjectData]=useState(null);
    const[deleteproject,setdeleteproject]=useState(null);

    const fetchproject=async()=>{
        const response=await findProjectByEmail(user.email);
        if(response){
             setProjectData(response.data.project)
        }
    }

    if(user && projectData==null){
        fetchproject()
    }
  
    const deleteProject=async()=>{
        const response=await DeleteProject(deleteproject);
        if(response)
            {
                toast.success("Project Deleted SuccessFully Please Reload")
                setdeleteproject(null);
            }
    }

    if(deleteproject!=null){
         deleteProject();
    }
  return (
    <div className=' w-[150%] p-20  '>
         <p className=' text-slate-800 text-2xl font-semibold'>Your's Project ({projectData?.length})</p>
                            {
                                 Array.isArray(projectData) && projectData.length === 0 ? (
                                     <div className=''>
                                            <Image src={not_found} className=' w-[25rem] h-[25rem] mx-auto'/>
                                     </div>
                                 ) : (
                                        <div className=' mt-3 flex flex-col gap-4'>
                                                    <div className=' mt-3 bg-gray-200 p-2 rounded-lg pl-2 pr-2'>
                                                            <div className=' flex  text-slate-800 text-lg justify-around'>
                                                                    <div>
                                                                        Project
                                                                    </div>
                                                                
                                                                        <div>
                                                                            Date Applied
                                                                        </div>
                                                                        <div>
                                                                            Saved
                                                                        </div>
                                                                        <div>
                                                                            Action
                                                                        </div>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        <div>
                                                            {
                                                                projectData?.map((data,index)=>{
                                                                    return <DashboardPage key={index}  cardData={data} deleteicon="true" setdeleteproject={setdeleteproject}/>
                                                                })
                                                            }
                                                        </div>
                                        </div>
                                 )}
    </div>
  )
}

export default page