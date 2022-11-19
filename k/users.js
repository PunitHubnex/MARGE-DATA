const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users');

router.get('/getTermsAndConditions', usersControllers.getTermsAndConditions);
router.get('/getPrivacyPolicy', usersControllers.getPrivacyPolicy);
router.get('/getDataProtection', usersControllers.getDataProtection);
router.get('/getCandidatesProfile',usersControllers.getCandidatesProfile);
router.get('/getRecruiters',usersControllers.getRecruiters);
router.get('/getCompanies',usersControllers.getCompanies );

module.exports = router;