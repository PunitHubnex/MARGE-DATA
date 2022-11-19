const express = require ('express');
const router = express.Router();
const companyControllers = require('../controllers/company');
const upload = require("../middlewares/upload");

router.post ('/postJob/:id',upload.single('jobDetailsFile'),companyControllers.postJob);

// ==================================================================================================

const Company_AddJobs = require('../models/postJobs')
const users_company = require('../models/users')

// company penal pendding....
router.get('/companyPending', async (req, res) => {
    try {
        const share = await Company_AddJobs.find({ status: 'company_addJobs_fress' })
        res.status(200).json(share)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// company page reject....
router.get('/companyRejected', async (req, res) => {
    try {
        const share = await Company_AddJobs.find({ status: 'Admin-Rejected' })
        res.status(200).json(share)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// company data
router.get('/companyData', async (req, res) => {
    try {
        const companyData = await users_company.find({ role:"company" })
        res.status(200).json(companyData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// sinle company data
router.get('/companyData/:id', async (req, res) => {
    const {id } =req.params
    // console.log(id);
    try {
        const companyData = await users_company.findById(id)
res.status(200).json(companyData)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})


// company jobs data by id
router.get('/companyJobData/:id', async (req, res) => {
  const id  =req.params.id
    try {
        const companyJobData = await Company_AddJobs.find({
            "$and":[{id},{status:"company_addJobs_fress"}]
            })
        res.status(200).json(companyJobData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



// aaprrov by admin api
router.put('/AdminStatusChange/:id', async (req, res) => {
    const id = req.params.id
    // console.log(id);
    // console.log(req.body);
    try {
        const { statusDb } = req.body
        const data = await Company_AddJobs.findByIdAndUpdate(id, { status: statusDb }, { new: true })
        res.status(200).json(data)
        // console.log(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})





// ---------------------------------------------------------------------------------------------------------
const ComanyINFORMATION = require('../models/company')


router.get('/companyinformation/:id', async (req, res) => {
    const id  =req.params.id
    // console.log(id);
    try {
        const companyData = await ComanyINFORMATION.findById(id)
console.log(companyData);
    res.status(200).json(companyData)

    } catch (error) {
        res.status(500).json({ error })
    }
})




router.put('/companyinformationUpdate/:id', async (req, res) => {
    const id  =req.params.id
    const {companyName,contactNum1,contactNum2,contactPersonEmail,linkedIn,facebook,twitter,companyTagline,logo,email,JD,jobPost} = req.body
    console.log(req.body);
    try {
        const companyData = await ComanyINFORMATION.findByIdAndUpdate(id,{companyName,contactNum1,contactNum2,contactPersonEmail,linkedIn,facebook,twitter,branding,companyTagline,logo,email,JD,jobPost})
// console.log(companyData);
    res.status(200).json(companyData)
    } catch (error) {
        res.status(500).json({ error })
    }
})




// forgot password 
router.post("/EditPaaword", async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword, etUserName } = req.body;
    // console.log(req.body);
  
    let errors = [];
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      res.status(500).json({ msg: "Please fill in all fields." });
    }
  
    if (newPassword !== confirmNewPassword) {
      res.status(500).json({ msg: "New passwords do not match." });
    }
  
  
    if (errors.length > 0) {
      res.status(500).json(errors)
    } else {
  const data = await users_company.findOne({userName:etUserName})
      console.log(data);
      if (data !== null) {
        const pcompare = await bcrypt.compare(currentPassword, data.password)
        console.log(pcompare);
        if (pcompare) {
  
          const newOne = await bcrypt.hash(newPassword, 10)
          data.password = newOne;
          const a = await data.save();
          console.log(a);
          res.status(201).json(a);
        } else {
          res.status(500).json({ msg: "Current password is not a match." })
        }
  
      }
  
    }
  })




// ---------------------------------------------------------------------------------------------------------













// ==================================================================================================





module.exports = router;