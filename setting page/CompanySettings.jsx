import React, { useState,useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const CompanySettings = () => {
  const [active, setActive] = useState(<CompanyDetails />);
  const [activeColor, setActiveColor] = useState(1);

  return (
    <div>
      <div className="flex justify-between items-center gap-5 flex-wrap pb-4 group">
        <h2 className="font-medium text-xl lg:text-2xl lg:font-semibold xl:text-3xl">
          Settings
        </h2>
      </div>

      <div className="flex justify-start gap-10 border-b-2 my-5">
        <h6
          className={`font-medium text-lg cursor-pointer 
            ${
              activeColor === 1 &&
              "text-[color:var(--blue)] border-b-2 border-[color:var(--blue)]"
            }
          `}
          onClick={() => {
            setActiveColor(1);
            setActive(<CompanyDetails />);
          }}
        >
          Company Details
        </h6>
        <h6
          className={`font-medium text-lg cursor-pointer 
          ${
            activeColor === 2 &&
            "text-[color:var(--blue)] border-b-2 border-[color:var(--blue)]"
          }
          `}
          onClick={() => {
            setActiveColor(2);
            setActive(<CompanySecurity />);
          }}
        >
          Security
        </h6>
      </div>

      <div>{active}</div>
    </div>
  );
};

const CompanyDetails = () => {
  const [companyTagline, setcompanyTagline] = useState("");
  const [logo, setLogo] = useState("");

  const [email, setEmail] = useState(false);
  const [JD, setJD] = useState(false);
  const [jobPost, setJobPost] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [contactNum1, setcontactNum1] = useState("");
  const [contactNum2, setcontactNum2] = useState("");
  const [contactPersonEmail, setcontactPersonEmail] = useState("");
  const [linkedIn, setlinkedIn] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");

  const companyid = window.localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/company/companyinformation/${companyid}`)
      .then((res) => res.json())
      .then((data) => {
        setcompanyTagline(data.companyTagline);
        // setLogo(data.)
        setEmail(data.email);
        setJD(data.JD);
        setJobPost(data.jobPost);
        setCompanyName(data.companyName);
        setcontactNum1(data.contactNum1);
        setcontactNum2(data.contactNum2);
        setcontactPersonEmail(data.contactPersonEmail);
        setlinkedIn(data.linkedIn);
        setfacebook(data.facebook);
        settwitter(data.twitter);
      });
  }, []);

  let hndlSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("contactNum1", contactNum1);
    formData.append("contactNum2", contactNum2);
    formData.append("contactPersonEmail", contactPersonEmail);
    formData.append("linkedIn", linkedIn);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("email", email);
    formData.append("JD", JD);
    formData.append("jobPost", jobPost);
    formData.append("companyTagline", companyTagline);
    formData.append("logo", logo);

    console.log(formData);
    fetch(
      `http://localhost:5000/company/companyinformationUpdate/${companyid}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert("submitted");
        console.log(data);
      });
  };

  return (
    <div>
      <div className="my-10">
        <h6 className="text-lg font-semibold lg:text-xl xl:text-2xl">
          Company Profile
        </h6>
        <p className="text-gray-600">
          Update your company logo and details here!
        </p>
      </div>

      <form
        className="flex flex-col gap-10"
        onSubmit={(e) => {
          hndlSubmit(e);
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="profileName" className="font-medium">
              Public Profile Name
            </label>
            <p className="text-gray-500 text-sm">
              This will be displayed on your profile
            </p>
          </div>
          <input
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            type="text"
            id="profileName"
            placeholder="Seeman Corporation"
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="tagline" className="font-medium">
              TagLine
            </label>
            <p className="text-gray-500 text-sm">A quick intro of company!</p>
          </div>
          <input
            value={companyTagline}
            onChange={(e) => {
              setcompanyTagline(e.target.value);
            }}
            type="text"
            id="tagline"
            placeholder="Write your tagline..."
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="mobile1" className="font-medium">
              Company Logo
            </label>
            <p className="text-gray-500 text-sm">
              Company Logo (Displayed on profile){" "}
            </p>
          </div>
          <div className="flex-[2] flex justify-between items-center">
            <img
              src="https://seeklogo.com/images/D/d2_design_studio-logo-C0FF316400-seeklogo.com.png"
              alt=""
              className="w-10 h-10 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full"
            />

            <div className="border shadow-sm rounded-md p-5">
              <input
                type="file"
                name=""
                id="updateLogo"
                className="hidden"
                onChange={(e) => {
                  setLogo(e.target.files[0]);
                }}
              />
              <label
                htmlFor="updateLogo"
                className="flex flex-col items-center flex-wrap gap-5"
              >
                <FaCloudUploadAlt className="text-2xl text-gray-600 cursor-pointer" />
                <p className="text-sm text-gray-600" id="updateLogo">
                  Upload the new logo of the Company.
                </p>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="branding" className="font-medium">
              Branding
            </label>
            <p className="text-gray-500 text-sm">Check your branding areas</p>
          </div>

          <div className="flex-[2] flex justify-start">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="brandEmails"
                className="my-1.5"
                value={email}
                onChange={(e) => {
                  setEmail(!email);
                }}
              />
              <div className="flex flex-col ">
                <label htmlFor="brandEmails" className="font-medium">
                  Emails
                </label>
                <p className="text-gray-500 text-sm">
                  Includes your logo and details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="JD"
                className="my-1.5"
                value={JD}
                onChange={(e) => {
                  setJD(!JD);
                }}
              />
              <div className="flex flex-col ">
                <label htmlFor="JD" className="font-medium">
                  JD
                </label>
                <p className="text-gray-500 text-sm">
                  Includes your logo and details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="brandJobPost"
                className="my-1.5"
                value={jobPost}
                onChange={(e) => {
                  setJobPost(!jobPost);
                }}
              />
              <div className="flex flex-col ">
                <label htmlFor="brandJobPost" className="font-medium">
                  Job Post
                </label>
                <p className="text-gray-500 text-sm">
                  Includes your logo and details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="mobile1" className="font-medium">
              Contact Number
            </label>
            <p className="text-gray-500 text-sm">Company contact number</p>
          </div>
          <input
            value={contactNum1}
            onChange={(e) => {
              setcontactNum1(e.target.value);
            }}
            type="text"
            id="mobile1"
            placeholder="9876543210"
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="mobile2" className="font-medium">
              Alternative contact number
            </label>
            <p className="text-gray-500 text-sm">Company Alternative number</p>
          </div>
          <input
            value={contactNum2}
            onChange={(e) => {
              setcontactNum2(e.target.value);
            }}
            type="text"
            id="mobile2"
            placeholder="1234567890"
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="email" className="font-medium">
              Company Email
            </label>
            <p className="text-gray-500 text-sm">Comapny email ID</p>
          </div>
          <input
            value={contactPersonEmail}
            onChange={(e) => {
              setcontactPersonEmail(e.target.value);
            }}
            type="email"
            id="email"
            placeholder="company@email.com"
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <label htmlFor="socialProfiles" className="font-medium">
              Social Profiles
            </label>
            <p className="text-gray-500 text-sm">Add your social profiles</p>
          </div>
          <div className="flex-[2] flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="twitterProfile" className="text-sm font-medium">
                Twitter Link
              </label>
              <input
                value={twitter}
                onChange={(e) => {
                  settwitter(e.target.value);
                }}
                type="text"
                id="twitterProfile"
                placeholder="Twitter"
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="facebookLink" className="text-sm font-medium">
                Facebook Link
              </label>
              <input
                value={facebook}
                onChange={(e) => {
                  setfacebook(e.target.value);
                }}
                type="text"
                id="facebookLink"
                placeholder="Facebook"
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedinLink" className="text-sm font-medium">
                Linkedin Link
              </label>
              <input
                value={linkedIn}
                onChange={(e) => {
                  setlinkedIn(e.target.value);
                }}
                type="text"
                id="linkedinLink"
                placeholder="Linkedin"
                className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 text-white">
          <button className="font-semibold px-4 py-1.5 border bg-gray-400 hover:bg-gray-500 rounded-md">
            Cancel
          </button>

          <button className="font-semibold px-4 py-1.5 border bg-[color:var(--blue)] rounded-md">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const CompanySecurity = () => {
  const  id  = window.localStorage.getItem("userId");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [etUserName, setUser] = useState("");
  const [er, setEr] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/company/companyData/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.userName);
        console.log(data);
      });
  }, []);

  let hndlsubmit = (e) => {
    e.preventDefault();

    const data = {
      currentPassword,
      newPassword,
      confirmNewPassword,
      etUserName,
    };

    fetch(`http://localhost:5000/company/EditPaaword`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
          setEr(data.msg);
        } else {
          alert("updated");
        }
      });
  };

  return (
    <div>
      <div className="my-10">
        <h6 className="text-lg font-semibold lg:text-xl xl:text-2xl">
          Password
        </h6>
        <p className="text-gray-600">
          Please enter your current password to change your password!
        </p>
      </div>
      <h2>{er}</h2>
      <form className="flex flex-col gap-10" onSubmit={hndlsubmit}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label htmlFor="currPass" className="flex-1 font-medium">
            Current Password
          </label>
          <input
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            type="text"
            id="currPass"
            placeholder="current password"
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="newPass" className="flex-1 font-medium">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="text"
              id="newPass"
              placeholder="new password"
              className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
            />
          </div>
          <p className="sm:text-end text-gray-400 text-sm">
            Your password should be more than 8 characters.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label htmlFor="confirmPass" className="flex-1 font-medium">
            Confirm Password
          </label>
          <input
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            type="text"
            id="confirmPass"
            placeholder="confirm new password"
            className="flex-[2] outline-none px-3 py-2 border rounded-md focus:ring-2"
          />
        </div>

        <div className="flex items-center justify-end gap-5 text-white">
          <button className="font-semibold px-4 py-1.5 border bg-gray-400 hover:bg-gray-500 rounded-md">
            Cancel
          </button>

          <button className="font-semibold px-4 py-1.5 border bg-[color:var(--blue)] rounded-md">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanySettings;
