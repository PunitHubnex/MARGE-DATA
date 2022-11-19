import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineFileDone, AiOutlineSearch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";

const ApplicationsCOmpanyPostedJobsVIewJobs = () => {
const {id} = useParams()

  const [companyData,setCompany] = useState([])
  const [jobsCompanyDetails,setJobsCompanyDetails] = useState('')
  const [updateApi,forceUpdate] =  useReducer(x=>x+1,0)


  useEffect(() => {

    fetch(`http://localhost:5000/company/companyJobData/${id}`).then((res) => res.json())
        .then((data) => {
          setCompany(data)
          console.log(data);
        })
}, [updateApi])

  useEffect(() => {

    fetch(`http://localhost:5000/company/companyData/${id}`).then((res) => res.json())
        .then((data) => {
         setJobsCompanyDetails(data)

        })
}, [updateApi])

let hndleAccept = (e,status,id)=>{

  if (status ==='company_addJobs_fress') {
    const statusDb ='Admin-Approve'
  
//   console.log(addFor);
const s = {statusDb}
console.log(s);
fetch(`http://localhost:5000/company/AdminStatusChange/${id}`,{
  method:'PUT',
  headers:{"content-type":"application/json"},
  body:JSON.stringify(s)
}).then((res) => res.json())
.then((data) => {
 
  alert('Approved.....')
  forceUpdate()
  console.log(data);
})
} 
}

let hndleReject = (e, status, id) => {
  if (status === "company_addJobs_fress") {
    const statusDb = "Admin-Rejected";

    //   console.log(addFor);
    const s = { statusDb };
    console.log(s);
    fetch(`http://localhost:5000/company/AdminStatusChange/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(s),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("This is rejected by you");
        forceUpdate()
     
      });
  } else {
    alert("You already selected");
  }
};




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

      <div className="my-5">
        <div className="flex flex-col sm:flex-row sm:justify-start gap-5">
          <img
            src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/2017/April/35-Famous-Circle-Logos/19_400.png"
            alt=""
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
          />
          <h3 className="font-semibold text-xl lg:text-2xl my-3">
            {jobsCompanyDetails.companyName}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Jobs Posted by Company Name
        </h2>

        <div>
          <input
            type="text"
            placeholder="Search job by title"
            className="px-3 py-2 border border-gray-400 outline-none rounded-md focus:ring-1"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      ID
                    </th>
                    {/* <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Company Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Company Email
                    </th> */}
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Job Type
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Job description
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>

{
  companyData.map((value)=>(

                  <tr className="border-b" key={value._id}>
                    <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
                    {value._id}
                    </td>
                    {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                      {jobscompanyData.companyName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                    {jobscompanyData.email}
                    </td> */}
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                      {value.jobTitle}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                    {value.jobType}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                      <AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />not
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
                      <button onClick={(e)=>{hndleAccept(e,value.status,value._id)}}  className="flex gap-2 items-center font-bold bg-green-500 text-white p-2 rounded-lg cursor-pointer">
                        Approve <FcApprove />
                      </button>
                      <button onClick={(e)=>{hndleReject(e,value.status,value._id)}}  className="flex gap-2 items-center font-bold bg-red-500 text-white p-2 rounded-lg cursor-pointer">
                        Reject <FcDisapprove />
                      </button>
                    </td>
                  </tr>
  ))
}


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsCOmpanyPostedJobsVIewJobs;
