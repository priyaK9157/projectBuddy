import React, { useCallback, useState } from 'react';
import { Checkbox } from '@mui/material';
import CountrySelect from '@/app/components/commonPage/CountrySelect';
import { SkillRequired } from '@/app/components/ArrayUsable/SkillArray';
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDropzone } from 'react-dropzone';

import { useUser } from '@auth0/nextjs-auth0/client';
import { addProjects } from '@/app/Services/operations/ProjectHandler';
import toast from 'react-hot-toast';

const Page = () => {

  const { user, error, isLoading } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    country: 'India',
    city: '',
    fullyRemote: false,
    selectedSkills: [],
    projectDescription: '',
    files: [],
    projectLength:"",
    spanPeriod:"", 
    LevelExperience:""

  });

  const onDrop = useCallback((acceptedFiles) => {
    setFormData(prevState => ({
      ...prevState,
      files: acceptedFiles[0]
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5242880, // 5 MB
  });

  const handleSkillClick = (index) => {
    setFormData(prevState => ({
      ...prevState,
      selectedSkills: prevState.selectedSkills.includes(index)
        ? prevState.selectedSkills.filter(skillIndex => skillIndex !== index)
        : [...prevState.selectedSkills, index]
    }));
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handlesavechanges=async()=>{
     if(formData.projectDescription.length<90){
         toast.error("Minimum 90 words required in project description");
         return;
     }
      const basicdetail={
        projectLength:formData.projectLength,
        LevelExperience:formData.LevelExperience,
      }
      const country=`${formData.city},${formData.country}`
      const response=await  addProjects(user?.email,formData.title,formData.projectDescription,formData.selectedSkills,basicdetail,formData.category,country,formData.files)
      if(response){
         // navigate
         toast.success("Project Create SuccessFully")
      }
  }


  return (
    <div className='p-20 w-[130%] h-[100%]'>
      <p className='text-2xl text-slate-800 font-semibold'>Post A Project</p>
      <div className='mt-5'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='text-lg text-slate-700 font-semibold'>Project Title</label>
          <input
            id='title'
            placeholder='Add Project Title, Keywords, Etc'
            value={formData.title}
            onChange={handleInputChange}
            className='rounded-xl outline-none pl-12 pr-4 py-3 border-[2px] border-slate-300 text-xl w-full'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='category' className='text-lg text-slate-800 font-semibold'>Category</label>
          <input
            id='category'
            placeholder='Add Category of Your Project'
            value={formData.category}
            onChange={handleInputChange}
            className='rounded-xl outline-none pl-12 pr-4 py-3 border-[2px] border-slate-300 text-xl w-full'
          />
        </div>
        <div className=' mt-5'>
             <p className=' text-2xl text-slate-800 font-semibold'>Basic Details</p>
            <div className=' flex gap-4  '>
             {/* level of experienc*/}
             <div className='  flex flex-col gap-2 mt-3 w-[50%] '>
                 <p className=' text-lg text-slate-700 font-semibold'>Level of Experience Needed</p>
                 <input className=' border-[2px] border-slate-300 px-4 py-3 outline-none  ' placeholder=' Enter Level Of Experience..'  onChange={(e)=>{
                     setFormData({...formData,LevelExperience:e.target.value})
                 }}/>
             </div>


             {/*projectLength*/}
             <div  className='  flex flex-col gap-2 mt-3   w-[50%]'>
                 <p className=' text-lg text-slate-700 font-semibold'>Project Length</p>
                 <input className=' border-[2px] border-slate-300 px-4 py-3 outline-none  ' placeholder=' Enter Length Of Project..' onChange={(e)=>{
                     setFormData({...formData,projectLength:e.target.value})
                 }}/>
             </div>
         </div>
        </div>
        <div className='mt-6 bg-gray-100 rounded-lg p-7 py-5'>
          <p className='text-xl text-slate-800 font-semibold'>Location</p>
          <div className='flex items-center gap-4'>
            <div className='mt-3 w-[50%] flex flex-col gap-2'>
              <label className='text-lg text-slate-800 font-semibold'>Country</label>
              <CountrySelect
                value={formData.country}
                onChange={(value) => setFormData(prevState => ({
                  ...prevState,
                  country: value,
                  formData:{formData}, 
                  setFormData:{setFormData}
                }))}
              />
            </div>
            <div className='mt-3 w-[50%] flex flex-col gap-2'>
              <label htmlFor='city' className='text-lg text-slate-800 font-semibold'>City</label>
              <input
                id='city'
                placeholder='Type Your City...'
                value={formData.city}
                onChange={handleInputChange}
                className='rounded-xl outline-none pl-12 pr-4 py-3 border-[2px] border-slate-300 text-xl w-full'
              />
            </div>
          </div>
          <div className='flex gap-2 mt-4 items-center'>
            <Checkbox
              id='fullyRemote'
              checked={formData.fullyRemote}
              onChange={handleInputChange}
            />
            <p className='text-slate-500 text-lg flex'>
              Fully Remote Position - <span className='text-slate-800 font-semibold text-lg'>Worldwide</span>
            </p>
          </div>
        </div>

        <div className=' mt-4'>
          <p className='text-2xl text-slate-800 font-semibold'>Project Tech Stack Required:</p>
          <div className='mt-5 w-11/12 flex gap-3 flex-wrap'>
            {SkillRequired.map((data, index) => (
              <div
                key={index}
                onClick={() => handleSkillClick(data.name)}
                className={`rounded-lg px-4 py-2 cursor-pointer bg-gray-100 ${
                  formData.selectedSkills.includes(data.name)
                    ? 'text-blue-700 border-blue-700 font-bold border-[2px]'
                    : ' border-gray-400 text-gray-500 border-[2px]'
                }`}
              >
                <p>{data.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* upload photos  */}
        <div className=' mt-5'>
          <p className=' text-slate-800 text-2xl font-semibold'>Upload Photos</p>
          {/* drag & drop */}
          <div className=' w-10/12 p-5 py-24 mt-5 flex flex-col gap-1 border-[3px] border-dashed border-slate-300' {...getRootProps()}>
            <input {...getInputProps()} />
            <MdOutlineCloudUpload className='mx-auto text-5xl text-blue-700' />
            <p className='mx-auto'><span className='text-blue-700 text-lg font-bold mx-auto'>Browse photo</span> or drop here</p>
            <p className='text-slate-500 mx-auto'>A photo larger than 400 pixels works best. Max photo size 5 MB</p>
            {formData.files.length > 0 && (
              <div className='mt-3'>
                <p className='text-lg text-slate-800 font-semibold'>Selected Files:</p>
                <ul className='list-disc pl-5'>
                  {formData.files.map((file, index) => (
                    <li key={index} className='text-slate-600'>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className='mt-4 flex flex-col gap-4'>
          <p className='text-2xl text-slate-800 font-semibold'>Project Description</p>
          <textarea
            id='projectDescription'
            rows={12}
            placeholder='Add Your Project Description'
            value={formData.projectDescription}
            onChange={handleInputChange}
            className='text-lg text-slate-800 p-3 outline-none border-[2px] border-slate-300 w-full'
          />
        </div>

        <div
          className='mt-4 bg-blue-600 px-5 py-5 rounded-xl w-fit text-white font-semibold cursor-pointer'
          onClick={handlesavechanges} // replace this with your form submission logic
        >
          Post A Project
        </div>
      </div>
    </div>
  );
};

export default Page;
