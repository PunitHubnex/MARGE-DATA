import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import SingleJob from "./SingleJob";
import { useSelector, useDispatch} from 'react-redux';

const OpenJobs = () => {
  const [IT, setIT] = useState(true);
  const [openPositions, setOpenPositions] = useState();
  const statusAfterClaimedJob = useSelector((state) => state.counter.claim_rerender);

  const fetchData = async ()=>{
    try {
      const result = await fetch('http://localhost:5000/recruiter/getOpenPositions');
      if (! result) {
        throw new Error("No open jobs found.");
      }
      const jsonData = await result.json();
      setOpenPositions(jsonData.posts);
     
    } catch (error) {
      console.log(error);
    }
  };

  console.warn(openPositions);
  useEffect( ()=>{
    fetchData();
   
  },[statusAfterClaimedJob]);

  return (
    <div>
      <div className="">
        <div className="flex justify-between gap-5 flex-wrap pb-4 border-b-2 border-black group">
          <div className="flex">
            <button
              className={`flex-1 px-5 min-w-fit border rounded-l-md font-semibold ${
                IT && "bg-[color:var(--blue)] text-white"
              } `}
              onClick={() => setIT(true)}
            >
              IT
            </button>
            <button
              className={`flex-1 px-5 min-w-fit border rounded-r-md font-semibold  ${
                !IT && "bg-[color:var(--blue)] text-white"
              } `}
              onClick={() => setIT(false)}
            >
              NON - IT
            </button>
          </div>

          <div className="border-2 flex items-center gap-5 px-5 py-3 rounded-md w-full lg:w-96 group-focus-within:ring-2 group-focus-within:shadow-lg">
            <AiOutlineSearch className="text-3xl" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-lg"
            />
            <BsFilterLeft className="text-3xl" />
          </div>
        </div>
        
        {openPositions && <div className="">

          {Object.keys(openPositions).map(i=>{ let x= (openPositions[i].recruiterIdClaimed).indexOf(localStorage.getItem('userId'));
           if ( x === -1) {
            return <SingleJob key={i} openPosition = {openPositions[i]} />
          }
            
          }) }
        </div>}
      </div>
    </div>
  );
};

export default OpenJobs;
