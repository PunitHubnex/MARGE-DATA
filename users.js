const TermsAndConditions = require('../models/TermsAndConditions');
const PrivacyPolicy = require('../models/privacyPolicy');
const DataProtection = require('../models/dataProtection');
const CandidatesProfile = require('../models/candidateProfiles');
const Users = require('../models/users');
const PostedJobs = require('../models/postJobs');


exports.getTermsAndConditions = async (req, res, next)=>{
    try {
        const result = await TermsAndConditions.findOne({});
        if (! result) {
            throw new Error("Something went wrong.");
        }
    
        res.status(200).json({'message':"Terms and conditions fetched successfully.", posts:result});
    } catch (error) {
        next(error);
    }
};

exports.getPrivacyPolicy = async (req, res, next)=>{
    try {
        const result = await PrivacyPolicy.findOne({});
        if (! result) {
            throw new Error("Something went wrong.");
        }

        res.status(200).json({'message':"Privacy Policy fetched successfully.", posts:result});
    } catch (error) {
        next(error);
    }
};

exports.getDataProtection = async (req, res, next)=>{
    try {
        const result = await DataProtection.findOne({});
        if (! result) {
            throw new Error("Something went wrong.");
        }
        
        res.status(200).json({'message':"Data Protection fetched successfully.", posts:result});
    } catch (error) {
        next(error);
    }
};

exports.getCandidatesProfile = async (req, res, next)=>{
    try {
        const result = await CandidatesProfile.find({status:"add_Profile_req"})

        const result1 = await CandidatesProfile.find().populate(['jobId','recruiterId']).exec();
        if (! result) {
            const error = new Error('No Candiates founds');
            error.statusCode= 404;
            throw error;
        }
        res.status(200).json({message:"Candidates profile successfully fetched.",posts:result});
    } catch (error) {
        next(error);
    }
};

exports.getRecruiters =  async (req, res, next) => {
    try {
      const userData = await Users.find({role:'recruiter'}).populate('recruiterId').exec();
      res.status(200).json(userData);
  } catch (error) {
      next(error);
  }
};

exports.getCompanies =  async (req, res, next) => {
    try {
      const userData = await Users.find({role:'company'}).populate('companyId').exec();
      res.status(200).json({message:"Data successfully fetched.",posts:userData});
    } catch (error) {
        next(error);
    }
  };