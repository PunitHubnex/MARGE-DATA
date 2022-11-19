import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineFileDone } from "react-icons/ai";
import { BsChevronDown, BsFilterLeft } from "react-icons/bs";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

const ApplicationsCompanyPostedJobs = () => {



  

  const [companyData,setCompany] = useState([])


  useEffect(() => {

    fetch('http://localhost:5000/company/companyData').then((res) => res.json())
        .then((data) => {
          setCompany(data)
          console.log(data);
        })
}, [])









  return (


    <div>
      <div className="flex justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-lg"
          />
          <BsFilterLeft className="text-3xl" />
        </div>

        <div>
          <ProfileCard />
        </div>
      </div>

      <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Companies
      </h2>

      <div className="py-6 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">

{
companyData.map((value)=>(




  
  <div key={value._id}>

          <div className="border-2 shadow-sm hover:shadow-md rounded-lg overflow-hidden cursor-pointer h-max p-3">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <img
                src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/2017/April/35-Famous-Circle-Logos/19_400.png"
                alt=""
                className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
              />
              <h3 className="font-semibold text-xl lg:text-2xl my-3">
               {value.companyName}
             
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 items-center justify-end mt-10 lg:mt-14 font-medium">
              <Link to={`/admin/companypostedjobs/${value._id}`}>
                <button className="px-3 py-1.5 bg-[color:var(--blue)] text-white rounded-md font-medium text-sm">
                  View jobs
                </button>
              </Link>
            </div>
          </div>
  </div>
))

}



          
        </div>
      </div>
    </div>
  );
};

export default ApplicationsCompanyPostedJobs;
