import React, { useState } from "react";
import ClaimedPosAddCandidateModal from "../modal/ClaimedPosAddCandidateModal";
import JobDetailsModal from "../modal/JobDetailsModal";

const ClaimedJob = ({claimedPosition}) => {
  const [modelOpened, setModelOpened] = useState(false);
  const [addCandidateModal, setAddCandidateModal] = useState(false);

  let date = new Date(claimedPosition.createdAt).toLocaleDateString('en-us' , {day:'2-digit', year:'2-digit',month:'short'});
  let dateArray = date.split(',');
  let day= ((dateArray[0].split(' '))[1]).trim();
  let month= ((dateArray[0].split(' '))[0]).trim();
  let year= (dateArray[1]).trim();
  let finalDate= `${day}-${month}-${year}`;

  return (
    <div className="border-2 border-gray-400 rounded-md my-4 p-3 sm:p-5 md:p-8 (hover):shadow-md">
      <div className="flex flex-col gap-7">
        <div className="flex justify-between gap-5">
          <img
            src="https://seeklogo.com/images/D/d2_design_studio-logo-C0FF316400-seeklogo.com.png"
            alt=""
            className="w-10 h-10 md:w-14 md:h-14 xl:w-16 xl:h-16 object-cover"
          />

          <div className="flex flex-col items-center justify-start">
            <h4 className="text-[color:var(--blue)] text-3xl font-semibold">
            {claimedPosition.rewardType === "Money" ? `₹${claimedPosition.earnPerClosure}` : `${claimedPosition.earnPerClosure}%`}
            </h4>
            <div className="font-medium">Earn per Closure</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-5">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-xl">Role</span>
              <span className="text-lg text-gray-600 font-medium">
                {(claimedPosition.jobId).jobTitle}
              </span>
            </div>

            <div className="flex flex-col text-right">
              <span className="font-semibold text-xl">Location</span>
              <span className="text-lg text-gray-600 font-medium">
                {(claimedPosition.jobId).location}
              </span>
            </div>
          </div>

          <div className="flex justify-between gap-5">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-xl">Package</span>
              <span className="text-lg text-gray-600 font-medium">{(claimedPosition.jobId).package}</span>
            </div>

            <div className="flex flex-col text-right">
              <span className="font-semibold text-xl">Claimed on</span>
              <span className="text-lg text-gray-600 font-medium">
                {finalDate}
              </span>
            </div>
          </div>
        </div>

        <div className="text-white flex gap-5 justify-around mt-5 font-semibold">
          <button
            className="bg-[color:var(--blue)] rounded-md px-4 py-2"
            onClick={() => setModelOpened(true)}
          >
            <JobDetailsModal
              modelOpened={modelOpened}
              setModelOpened={setModelOpened}
              data = {claimedPosition.jobId}
              // send the job data here and then fetch in JobDetailsModal
            />
            View Details
          </button>
          <button
            className="bg-red-500 rounded-md px-4 py-2"
            onClick={() => setAddCandidateModal(true)}
          >
            <ClaimedPosAddCandidateModal
              modelOpened={addCandidateModal}
              setModelOpened={setAddCandidateModal}
              data = {claimedPosition.jobId}
              // send the data here
            />
            Add Candidate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimedJob;
