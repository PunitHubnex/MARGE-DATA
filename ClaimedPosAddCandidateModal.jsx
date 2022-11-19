import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import useInput from '../../hook/use-input';
import validator from "validator";
import '../../hook/ErrorValidation.css'



const ClaimedPosAddCandidateModal = ({ modelOpened, setModelOpened, data }) => {
  const theme = useMantineTheme();
  const [count, setCount] = useState(1);
  const [resume, setResume] = useState();
  const [additionalFile, setAdditionalFile] = useState();
  const [relocate, setRelocate] = useState(false);
  const [noticePeriod1, setNoticePeriod1] = useState(false);
  const [experienceYear, setExperienceYear] = useState('');
  const [experienceMonth, setExperienceMonth] = useState('');
  const [currentWorkingMonth, setCurrentWorkingMonth] = useState('');
  const [currentWorkingYear, setCurrentWorkingYear] = useState('');

  
  const {value:name,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler:nameChangeHandler,
    reset: nameResetInput,
    inputBlurHandler: nameInputBlurHandler} = useInput(value=>value.trim() !=='');

  const {value:email,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler:emailChangeHandler,
    reset: emailResetInput,
    inputBlurHandler: emailInputBlurHandler} =useInput(value=>{if (validator.isEmail(value)) {
                                                                  return true;
                                                                } else {
                                                                  return false;
                                                                }});
    

  const {value:phoneNumber,
    hasError: phoneNumberHasError,
    isValid: phoneNumberIsValid,
    valueChangeHandler:phoneNumberChangeHandler,
    reset: phoneNumberResetInput,
    inputBlurHandler: phoneNumberInputBlurHandler} =useInput(value=>value.trim() !=='');


  const {value:last_or_current_ctc,
    hasError: last_or_current_ctcHasError,
    isValid: last_or_current_ctcIsValid,
    valueChangeHandler:last_or_current_ctcChangeHandler,
    reset: last_or_current_ctcResetInput,
    inputBlurHandler: last_or_current_ctcInputBlurHandler} =useInput(value=>value.trim() !=='');
  
  const {value:expected_ctc,
    hasError: expected_ctcHasError,
    isValid: expected_ctcIsValid,
    valueChangeHandler:expected_ctcChangeHandler,
    reset: expected_ctcResetInput,
    inputBlurHandler: expected_ctcInputBlurHandler} =useInput(value=>value.trim() !=='');
  
  const {value:noticePeriod,
    hasError: noticePeriodHasError,
    isValid: noticePeriodIsValid,
    valueChangeHandler:noticePeriodChangeHandler,
    reset: noticePeriodResetInput,
    inputBlurHandler: noticePeriodInputBlurHandler} =useInput(value=>value.trim() !=='');
  
  const {value:lastWorkingDay,
    hasError: lastWorkingDayHasError,
    isValid: lastWorkingDayIsValid,
    valueChangeHandler:lastWorkingDayChangeHandler,
    reset: lastWorkingDayResetInput,
    inputBlurHandler: lastWorkingDayInputBlurHandler} =useInput(value=>value.trim() !=='');
  
  const {value:currentLocation,
    hasError: currentLocationHasError,
    isValid: currentLocationIsValid,
    valueChangeHandler:currentLocationChangeHandler,
    reset: currentLocationResetInput,
    inputBlurHandler: currentLocationInputBlurHandler} =useInput(value=>value.trim() !=='');
  
  const {value: remarks,
    hasError: remarksHasError,
    isValid: remarksIsValid,
    valueChangeHandler: remarksChangeHandler,
    reset: remarksResetInput,
    inputBlurHandler: remarksInputBlurHandler} =useInput(value=>value.trim() !=='');

  
  const formHandler =  async (event)=>{
    event.preventDefault();
    try {
      let experience = `${experienceYear}Y ${experienceMonth}M`;
      let currentWorking = `${currentWorkingYear}Y ${currentWorkingMonth}M`
      const formData = new FormData();
      formData.append("name",name);
      formData.append("email",email);
      formData.append("phoneNumber",phoneNumber);
      formData.append("experience",experience);
      formData.append("currentWorking",currentWorking);
      formData.append("last_or_current_ctc",last_or_current_ctc);
      formData.append("expected_ctc",expected_ctc);
      formData.append("noticePeriod",noticePeriod);
      formData.append("lastWorkingDay",lastWorkingDay);
      formData.append("currentLocation",currentLocation);
      formData.append("readyToRelocate",relocate);
      formData.append("noticePeriodBuyoutAvailable", noticePeriod1);
      formData.append("resume",resume);
      formData.append("additionalFiles",additionalFile);
      formData.append("additionalLinks",count);
      formData.append("remarks",remarks);
      
      console.log('name',name);
      // const result = await fetch(`http://localhost:5000/recruiter/addCandidate/${data._id}/${localStorage.userId}`,{
      const result = await fetch(`http://localhost:5000/recruiter/addCandidate`,{
        method:'post',
        body: formData
      });
     alert("form submitted")
      const jsonData = await result.json();
      if(! result.ok){
         throw new Error(jsonData.message);
      }
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      size="70%"
      opened={modelOpened}
      onClose={() => setModelOpened(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="md:px-10">
        <div
          className="absolute top-5 right-12 cursor-pointer flex flex-col items-center"
          onClick={() => setModelOpened(false)}
        >
          <AiOutlineCloseCircle className=" text-3xl text-red-500" />
          <span className="font-semibold text-red-500">Close</span>
        </div>

        <h2 className="text-[color:var(--blue)] text-xl md:text-2xl font-bold pb-4">
          Add Candidate
        </h2>

        <h4 className="font-medium text-xl mb-5">Role - {data.role}</h4>

        <div className="border-2">
          <div className="flex flex-col p-5 lg:p-8 xl:px-10">
            <form className="flex flex-col gap-4" onSubmit={formHandler}>
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  value={name}
                  type="text"
                  placeholder="Aman Garg"
                  id="name"
                  className={! nameHasError ? "px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1" : "px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1 invalid"}
                  onChange={nameChangeHandler}
                  onBlur={nameInputBlurHandler}
                />
                {nameHasError && (
                  <p className="error-text">*Name is required.</p>
                )}
              </div>
             
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  value={email}
                  type="text"
                  placeholder="name@gmail.com"
                  id="email"
                  className={!emailHasError ? "px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1" : "px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1 invalid" }
                  onChange={emailChangeHandler}
                  onBlur={emailInputBlurHandler}
                />
                {emailHasError && (
                  <p className="error-text">*Email address is invalid.</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="font-medium">
                  Phone Number
                </label>
                <input
                  value={phoneNumber}
                  type="text"
                  placeholder="1234567890"
                  id="phone"
                  className={! phoneNumberHasError ? "px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1" :"px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1 invalid"}
                  onChange={phoneNumberChangeHandler}
                  onBlur={phoneNumberInputBlurHandler}
 
                />
                {phoneNumberHasError && (
                  <p className="error-text">*Phone number is required.</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="experience" className="font-medium">
                  Experience
                </label>
                <div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    value={experienceYear}
                    onChange={(e)=>{setExperienceYear(e.target.value)}}
                    type="text"
                    placeholder="YY"
                    id="experience"
                    className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                  />
                  <input
                    type="text"
                    value={experienceMonth}
                    onChange={(e)=>{setExperienceMonth(e.target.value)}}
                    placeholder="MM"
                    id="experience"
                    className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="currWork" className="font-medium">
                  Currently Working
                </label>
                <div className="max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={currentWorkingYear}
                    onChange={(e)=>{
                      setCurrentWorkingYear(e.target.value)
                    }}
                    placeholder="YY"
                    id="currWork"
                    className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                  />
                  <input
                    type="text"
                    value={currentWorkingMonth}
                    onChange={(e)=>{setCurrentWorkingMonth(e.target.value)}}
                    placeholder="MM"
                    id="currWork"
                    className="px-3 py-2 border max-w-sm rounded-md outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="ctc" className="font-medium">
                    Last / Current CTC
                  </label>
                  <input
                    type="text"
                    value={last_or_current_ctc}
                    onChange={last_or_current_ctcChangeHandler}
                    onBlur={last_or_current_ctcInputBlurHandler}
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
                    value={expected_ctc}
                    onChange={expected_ctcChangeHandler}
                    onBlur={expected_ctcInputBlurHandler}
                    placeholder="CTC"
                    id="CTC"
                    className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="noticePeriod" className="font-medium">
                    Notice Period
                  </label>
                  <input
                    type="text"
                    value={noticePeriod}
                    onChange={noticePeriodChangeHandler}
                    onBlur={noticePeriodInputBlurHandler}
                    placeholder="Ex. 30 days"
                    id="noticePeriod"
                    className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="lwd" className="font-medium">
                    Last Working Day (LWD)
                  </label>
                  <input
                    type="text"
                    value={lastWorkingDay}
                    onChange={lastWorkingDayChangeHandler}
                    onBlur={lastWorkingDayInputBlurHandler}
                    placeholder="01-11-2022"
                    id="lwd"
                    className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="location" className="font-medium">
                  Current Location
                </label>
                <input
                  type="text"
                  value={currentLocation}
                  onChange={currentLocationChangeHandler}
                  onBlur={currentLocationInputBlurHandler}
                  placeholder="Delhi"
                  id="location"
                  className={! currentLocationHasError ? "px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1" : "px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1 invalid" }
                  
                />
                {currentLocationHasError && (
                    <p className="error-text">*Current Location is required.</p>
                  )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="relocation" className="font-medium">
                    Ready to Relocate?
                  </label>
                  <div className="flex gap-5 items-center">
                    <div
                      className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
                        relocate && "bg-[color:var(--blue)] text-white"
                      } `}
                      onClick={() => setRelocate(true)}
                    >
                      Yes
                    </div>
                    <div
                      className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
                        !relocate && "bg-[color:var(--blue)] text-white"
                      } `}
                      onClick={() => setRelocate(false)}
                    >
                      No
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="npba" className="font-medium">
                    Notice Period buyout available?
                  </label>
                  <div className="flex gap-5 items-center">
                    <div
                      className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
                        noticePeriod1 && "bg-[color:var(--blue)] text-white"
                      } `}
                      onClick={() => setNoticePeriod1(true)}
                    >
                      Yes
                    </div>
                    <div
                      className={`flex-1 px-5 py-2 border rounded-md flex justify-center items-center ${
                        !noticePeriod1 && "bg-[color:var(--blue)] text-white"
                      } `}
                      onClick={() => setNoticePeriod1(false)}
                    >
                      No
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="resume" className="font-medium">
                  Upload Resume
                </label>
                <input
                  type="file"
                  placeholder="Choose CV"
                  id="resume"
                  className="hidden px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                  onChange={(event) => setResume(event.target.files[0])}
                />
                <label
                  htmlFor="resume"
                  className="px-3 py-2 border max-w-md rounded-md flex justify-between items-center"
                >
                  <p className="text-gray-400">
                    {resume ? resume.name : "Choose CV"}
                  </p>
                  <FiUpload className="text-[color:var(--blue)]" />
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="additionalfiles" className="font-medium">
                  Additional Files
                </label>
                <input
                  type="file"
                  placeholder="Choose Files"
                  id="additionalfiles"
                  className="hidden px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                  onChange={(event) => setAdditionalFile(event.target.files[0])}
                />
                <label
                  htmlFor="additionalfiles"
                  className="px-3 py-2 border max-w-md rounded-md flex justify-between items-center"
                >
                  <p className="text-gray-400">
                    {additionalFile ? additionalFile.name : "Choose File"}
                  </p>
                  <FiUpload className="text-[color:var(--blue)]" />
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="links" className="font-medium">
                  Additional Links
                </label>

                {[...Array(count)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder="Links"
                    id="links"
                    className="px-3 py-2 border max-w-md rounded-md outline-none focus:ring-1"
                  />
                ))}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCount(count + 1);
                  }}
                  className="text-[color:var(--blue)] underline"
                >
                  Add more links
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="remarks" className="font-medium">
                  Remarks
                </label>
                <textarea
                  type="text"
                  value={remarks}
                  onChange={remarksChangeHandler}
                  onBlur={remarksInputBlurHandler}
                  rows={6}
                  placeholder="Write remarks here..."
                  id="remarks"
                  className="px-3 py-2 border max-w-3xl rounded-md outline-none focus:ring-1"
                />
              </div>

              <div className="text-white flex justify-end gap-5 mt-10">
                <button className="bg-[color:var(--blue)] px-3 py-2 rounded-md font-semibold lg:text-xl" type="submit">
                  Submit Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimedPosAddCandidateModal;
