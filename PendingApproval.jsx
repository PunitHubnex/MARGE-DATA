import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineFileDone, AiOutlineSearch } from "react-icons/ai";

const PendingApproval = () => {

  const [candidateData,setCandidateData] = useState([])


  useEffect(() => {

    fetch('http://localhost:5000/company/companyPending').then((res) => res.json())
        .then((data) => {
          setCandidateData(data)
        })
}, [])









  return (
    <div>
      <div className="flex justify-between gap-5 flex-wrap pb-4 group">
        <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full group-focus-within:ring-2 group-focus-within:shadow-lg">
          <AiOutlineSearch className="text-3xl text-[color:var(--blue)]" />
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full outline-none text-lg"
          />
        </div>
      </div>

      <div>
        <h2 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
          Pending Approval
        </h2>
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
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Package
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Experience
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Job Type
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      JD
                    </th>
                    <th
                      scope="col"
                      className="font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidateData.map((data) => (
                    <tr className="border-b" key={data.id}>
                      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
                        {data._id}
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap text-sm font-medium text-gray-900">
                        {data.jobTitle}
                      </td>
                      <td className="text-sm font-medium px-6 py-4 whitespace-pre-wrap">
                        {data.package}
                      </td>
                      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
                        {data.experience}
                      </td>
                      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
                        {data.jobType}
                      </td>
                      <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-pre-wrap">
                        <AiOutlineFileDone className="text-[color:var(--blue)] text-xl" />
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-5">
                        <div className="flex gap-2 items-center font-bold bg-yellow-600 text-white p-2 rounded-md cursor-pointer">
                          Pending
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
