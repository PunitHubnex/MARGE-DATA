import { Select, Option } from "@material-tailwind/react";
import React, { useState, useRef, useCallback } from "react";
import { FiUpload } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import JoditEditor from "jodit-react";

const AddNewJob = () => {
  const editor = useRef(null);
  const [jobDetailsFile, setjobDetailsFile] = useState();
  const [skills, setSkills] = useState([]);
  const [value, setValue] = useState();
  const [jobTitle, setjobTitle] = useState();
  const [jobType, setJobType] = useState(null);
  const [experienceYear, setExperienceYEAR] = useState();
  const [experienceMonth, setExperienceMONTH] = useState();
  const [packageMinimum, setPackageMINIMUM] = useState();
  const [packageMaximum, setPackageMAXIMUM] = useState();
  const [earnPerClosure, setearnPerClosure] = useState();
  const [noticePeriod, setNoticePeriod] = useState();
  const [location, setLocation] = useState();
  const [communication, setCommunication] = useState();
  const [qualification, setQualification] = useState();
  const [status] = useState("company_addJobs_fress");
  const [rewardType, setRewardType] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [benefits, setBenefits] = useState();
  const handleChangeJOBTYPE = (value) => {
    setJobType(value);
  };
  const handleChangeReward = (value) => {
    setRewardType(value);
  };
  const handleChangeCommunication = (value) => {
    setCommunication(value);
  };

  const saveSkills = (e) => {
    setValue(e.target.value);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const copySkills = [...skills];
    copySkills.push(value);
    setSkills(copySkills);
    setValue("");
  };
  const handleRemoveSkill = (e, index) => {
    e.preventDefault();

    const copySkills = [...skills];
    copySkills.splice(index, 1);
    setSkills(copySkills);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
   const companyid = window.localStorage.getItem('userId')
    const companyId = 'this is try id'
    let experience= `${experienceYear}Y ${experienceMonth}M`;
    let packages= `${packageMinimum}-${packageMaximum}`;
    const formData = new FormData();
    formData.append("jobTitle",jobTitle);
    formData.append("jobType",jobType);
    formData.append("skills",skills);
    formData.append("experience",experience);
    formData.append("package",packages);
    formData.append("rewardType",rewardType);
    formData.append("earnPerClosure",earnPerClosure);
    formData.append("communication",communication);
    formData.append("location",location);
    formData.append("noticePeriod",noticePeriod);
    const a = formData.append("jobDetailsFile",jobDetailsFile);
    formData.append("responsibilities",responsibilities);
    formData.append("qualifications",qualification);
    formData.append("benefits",benefits);
    formData.append("status",status);
  
    alert("submitted");
    fetch(`http://localhost:5000/company/postJob/${companyid}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };


  return (
    <div className="">
      <div className="flex justify-end gap-5 flex-wrap pb-4 border-b-2 border-black group">
        <div className="flex items-center gap-5">
          <h6 className="font-bold text-xl lg:text-2xl py-2 text-gray-700">
            Hi, Seeman Corporation
          </h6>
        </div>
      </div>

      <div className="border-2 shadow-md rounded-md my-5 md:px-2 lg:px-4 xl:px-6 ">
        <div className="flex flex-col gap-5 p-5">
          <h6 className="font-medium text-[color:var(--blue)] text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-6">
            Post new Job
          </h6>

          <div>
            <div className="flex flex-col">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="jobTitle" className="font-medium">
                    Job Title
                  </label>
                  <input
                    value={jobTitle}
                    onChange={(e) => {
                      setjobTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="Type the job title"
                    id="jobTitle"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Job Type</label>
                  <Select
                    label="Job Type"
                    value={jobType}
                    onChange={handleChangeJOBTYPE}
                  >
                    <Option value="Full Time">Full Time</Option>
                    <Option value="Part Time">Part Time</Option>
                    <Option value="Internship">Internship</Option>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="skills" className="font-medium">
                    Skills
                  </label>
                  <input
                    type="text"
                    placeholder="add skill and enter"
                    id="skills"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                    value={value}
                    onChange={saveSkills}
                  />
                  <button onClick={handleAddSkill} className="hidden">
                    Enter
                  </button>
                  <div className="flex flex-wrap my-2">
                    {skills?.map((skill, i) => (
                      <div
                        className="px-3 py-1 flex items-center gap-2 border border-gray-500 rounded-xl mr-2 mb-2"
                        key={i}
                      >
                        {skill}
                        <AiOutlineCloseCircle
                          className="cursor-pointer text-red-500"
                          onClick={(e) => handleRemoveSkill(e, i)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="experience" className="font-medium">
                    Experience
                  </label>
                  <div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      value={experienceYear}
                      onChange={(e) => {
                        setExperienceYEAR(e.target.value);
                      }}
                      type="text"
                      placeholder="Year"
                      id="experience"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                    <input
                      value={experienceMonth}
                      onChange={(e) => {
                        setExperienceMONTH(e.target.value);
                      }}
                      type="text"
                      placeholder="Month"
                      id="experience"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="currWork" className="font-medium">
                    Package{" "}
                    <span className="text-[color:var(--blue)]">(₹)</span>
                  </label>
                  <div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      value={packageMinimum}
                      onChange={(e) => {
                        setPackageMINIMUM(e.target.value);
                      }}
                      type="text"
                      placeholder="minimum"
                      id="currWork"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                    <input
                      value={packageMaximum}
                      onChange={(e) => {
                        setPackageMAXIMUM(e.target.value);
                      }}
                      type="text"
                      placeholder="maximum"
                      id="currWork"
                      className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                    />
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="ctc" className="font-medium">
                      Last / Current CTC
                    </label>
                    <input
                      type="text"
                      placeholder="CTC"
                      id="ctc"
                      className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="CTC" className="font-medium">
                      Expected CTC
                    </label>
                    <input
                      type="text"
                      placeholder="CTC"
                      id="CTC"
                      className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                    />
                  </div>
                </div> */}
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Reward Loyalty Type</label>
                  <Select
                    label="reward type"
                    value={rewardType}
                    onChange={handleChangeReward}
                  >
                    <Option value="Percentage">Percentage</Option>
                    <Option value="Money">Money</Option>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="closure" className="font-medium">
                    Earn Per Closure
                  </label>
                  <input
                    value={earnPerClosure}
                    onChange={(e) => {
                      setearnPerClosure(e.target.value);
                    }}
                    type="text"
                    placeholder="money or percentage"
                    id="closure"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Communication</label>
                  <Select
                    label="communication medium"
                    value={communication}
                    onChange={handleChangeCommunication}
                  >
                    <Option value="Beginner">Beginner</Option>
                    <Option value="Intermediate">Intermediate</Option>
                    <Option value="Advanced">Advanced</Option>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="location" className="font-medium">
                    Location
                  </label>
                  <input
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    type="text"
                    placeholder="Delhi"
                    id="location"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="noticePeriod" className="font-medium">
                    Notice Period
                  </label>
                  <input
                    value={noticePeriod}
                    onChange={(e) => {
                      setNoticePeriod(e.target.value);
                    }}
                    type="text"
                    placeholder="Number of days"
                    id="noticePeriod"
                    className="px-3 py-2 border rounded-md outline-none focus:ring-1"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="resume" className="font-medium">
                    JD (Job Details)
                  </label>
                  <input
                    type="file"
                    placeholder="Choose CV"
                    id="resume"
                    className="hidden px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                    onChange={(e) => setjobDetailsFile(e.target.files[0])}
                  />
                  <label
                    htmlFor="resume"
                    className="px-3 py-2 border rounded-md flex justify-between items-center"
                  >
                    <p className="text-gray-400">
                      {jobDetailsFile ? jobDetailsFile.name : "Upload Job Description"}
                    </p>
                    <FiUpload className="text-[color:var(--blue)] cursor-pointer" />
                  </label>
                </div>

                <div className="flex flex-col gap-1 my-2">
                  <label htmlFor="qualifications" className="font-medium">
                    Responsibilities
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={responsibilities}
                    //config={config}
                    // tabIndex={1} // tabIndex of textarea
                    //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => setResponsibilities(newContent)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="qualifications" className="font-medium">
                    Qualifications
                  </label>
                  <input
                    value={qualification}
                    onChange={(e) => {
                      setQualification(e.target.value);
                    }}
                    type="text"
                    rows={6}
                    placeholder="Your Qualifications"
                    id="qualifications"
                    className="px-3 py-2 border max-w-3xl rounded-md outline-none focus:ring-1"
                  />
                </div>

                <div className="flex flex-col gap-1 my-2">
                  <label htmlFor="benefits" className="font-medium">
                    Benefits
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={benefits}
                    //config={config}
                    // tabIndex={1} // tabIndex of textarea
                    //onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => setBenefits(newContent)}
                  />
                </div>

                <div className="text-white flex justify-end gap-5 mt-10">
                  <button className="bg-[color:var(--blue)] px-5 lg:px-7 py-2 rounded-md font-semibold lg:text-xl" type="submit" >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewJob;
