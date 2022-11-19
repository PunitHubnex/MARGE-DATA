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
    const id  =req.params.id
    // console.log(id);
    try {
        const companyData = await users_company.find(id)
console.log(companyData);
companyData.forEach((value)=>{
    res.status(200).json(value)

})

    } catch (error) {
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





// ==================================================================================================





module.exports = router;