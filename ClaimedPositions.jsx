import React, { useState, useCallback, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import ClaimedJob from "./ClaimedJob";

const ClaimedPositions = () => {
  const [IT, setIT] = useState(true);
  const [claimedPositions, setClaimedPositions] = useState();

  const fetchData = useCallback ( async ()=>{
    try {
      const result = await fetch(`http://localhost:5000/recruiter/getClaimedPositions/${localStorage.userId}`);
      if (! result) {
        throw new Error("No open jobs found.");
      }
      const jsonData = await result.json();
      setClaimedPositions(jsonData.posts) ;
      console.log(claimedPositions);
    } catch (error) {
      console.log(error);
    }
  },[]);
  useEffect( ()=>{
    fetchData();
    
  },[fetchData]);

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

        {claimedPositions && <div className="">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

          {Object.keys(claimedPositions).map(i=>{ 
           
            return <ClaimedJob key={i} claimedPosition = {claimedPositions[i]} />
            
          }) }
          </div>
        </div>}
      </div>
    </div>
  );
};

export default ClaimedPositions;
