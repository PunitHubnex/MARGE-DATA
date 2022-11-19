import React, { useState } from "react";
import { Switch } from "@material-tailwind/react";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { BsChevronDown, BsFilterLeft } from "react-icons/bs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const nav = useNavigate()
  const [er, setEr] = useState("");
  
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Dashboard, setDashboard] = useState(false);
  const [company, setCompany] = useState(false);
  const [manageRoles, setManageRoles] = useState(false);
  const [forms, setForms] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const [referral, setReferral] = useState(false);
  const [cms, setCms] = useState(false);
  const [payment, setPayment] = useState(false);



  let handleSubmit = (e) => {
    e.preventDefault()

if (password !== confirmPassword) {
  setEr('password not match')
}else{


    const data = { userName, email, mobile, password,  Dashboard,company,manageRoles,forms,recruiter,referral,cms,payment}
 
    fetch('http://localhost:5000/auth/signupAdminPanel',{
    method:"PUT",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(data)
    })
      
.then((res)=>res.json())
.then((data)=>{
   if (data.message) {
    console.log(data.message);
   }else{
    console.log(data);
    nav('/admin/manageroles')
   }
})}
  }



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

        <div className="flex items-center gap-5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU"
            alt=""
            className="rounded-full w-14 h-14 border-4 border-white"
          />

          <div className="flex flex-col">
            <h2 className="font-bold">Joseph N</h2>
            <h3 className="flex items-center gap-3">
              Super Admin <BsChevronDown />
            </h3>
          </div>
        </div>
      </div>

      <h2 className="text-[color:var(--blue)] font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl mt-4 mb-8">
        Add User
      </h2>

      <div className="border-2">
        <div className="flex flex-col p-5 lg:p-8 xl:px-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 style={{color:"red"}}>{er}</h3>
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-medium">
                Full Name
              </label>
              <input
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}
                type="text"
                placeholder="Full Name"
                id="fullName"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                type="email"
                placeholder="name@email.com"
                id="email"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="font-medium">
                Mobile Number
              </label>
              <input
                value={mobile}
                onChange={(e)=>{setMobile(e.target.value)}}
                type="text"
                placeholder="1234567890"
                id="phone"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pass" className="font-medium">
                Create Password
              </label>
              <input
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                type="text"
                placeholder="password"
                id="pass"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPass" className="font-medium">
                Confirm Password
              </label>
              <input
                type="text"
                placeholder="confirm password"
                id="confirmPass"
                className="px-3 py-2 border max-w-lg rounded-md outline-none focus:ring-1"
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
              />
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <label className="font-medium text-lg">User Access</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                  <Switch
                    value={"Dashboard"}
                    onClick={(e) => {setDashboard(!Dashboard);}}
                    // onChange={(e) => {hndlClick(e.target.value);}}
                checked={Dashboard}
                    id="1"
                    label="Dashboard"
                    color="green"
                  />
                  <Switch
                    value={"company"}
                    onClick={(e) => {setCompany(!company);}}
                    // onChange={(e) => {hndlClick(e.target.value);}}
                checked={company}           
                         id="2"
                    label="Company"
                    color="green"
                  />
                  <Switch
                    value={manageRoles}
                    checked={manageRoles}
                    onClick={() => setManageRoles(!manageRoles)}
                    id="3"
                    label="Manage Roles"
                    color="green"
                  />
                  <Switch
                    value={forms}
                    checked={forms}
                    onClick={() => setForms(!forms)}
                    id="4"
                    label="Forms"
                    color="green"
                  />
                </div> 
                <div className="flex flex-col gap-5">
                  <Switch
                    value={recruiter}
                    checked={recruiter}
                    onClick={() => setRecruiter(!recruiter)}
                    id="5"
                    label="Recruiter"
                    color="green"
                  />
                  <Switch
                    value={referral}
                    checked={referral}
                    onClick={() => setReferral(!referral)}
                    id="6"
                    label="Referral"
                    color="green"
                  />
                  <Switch
                    value={cms}
                    checked={cms}
                    onClick={() => setCms(!cms)}
                    id="7"
                    label="CMS"
                    color="green"
                  />
                  <Switch
                    value={payment}
                    checked={payment}
                    onClick={() => setPayment(!payment)}
                    id="8"
                    label="Payments"
                    color="green"
                  />
                </div>
              </div>
            </div>

            <div className="text-white flex justify-end gap-5 mt-10">
              <button className="bg-red-500 px-4 py-2 rounded-md flex gap-1.5 items-center font-medium">
                <AiOutlineDelete />
                Discard
              </button>

              <button className="bg-[color:var(--blue)] px-4 py-2 rounded-md font-medium">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
