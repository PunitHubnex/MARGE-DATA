const CandidateProfiles = require('../models/candidateProfiles');
const PostedJobs = require('../models/postJobs');
const Recruiters = require('../models/recruiters');
const connection=require('../db');
const mongoose = require('mongoose');
const Grid=require('gridfs-stream');
const Users = require('../models/users');
const Documents= require('../models/documents.files');
const ClaimedPositions = require('../models/claimedPositions');
const { UserInstance } = require('twilio/lib/rest/conversations/v1/user');

/*-----------------------------------for file uploading------------------------------------------------------------------------------- */
let gfs,gridFsBucket;
connection();

const conn = mongoose.connection;
conn.once('open' ,function () {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection("photos");
});

/*------------------------------------------------------------------------------------------------------------------------------------- */

exports.getOpenPositions = async (req, res, next)=>{
    try {
        
        // const result = await PostedJobs.find().populate('companyId').exec();
        const result = await PostedJobs.find({status:"Admin-Approve"})
        if (! result) {
            const error = new Error('No open positions found.');
            error.statusCode = 404;
            throw error;
        }
        console.log(result);
        res.status(200).json({message:'Open positions successfully fetched.', posts:result})
    } catch (error) {
        next(error);
    }
};

exports.claimPosition = async (req, res, next)=>{
    
    try {
        const {status} = req.body
        const {jobId, userId} = req.params ;
        const post = new ClaimedPositions({jobId, recruiterId: userId});
        const result = await PostedJobs.findByIdAndUpdate(jobId, { status, $push: {recruiterIdClaimed: userId}});
        const result_2 = await Users.findById(userId);
        const result_3 = await Recruiters.findByIdAndUpdate(result_2._id, {$push: {claimedJobId: jobId}});
        const result_4 = await post.save();

        res.status(201).json({message:"Position successfully claimed.", posts:[result,result_3,result_4]});
    } catch (error) {
        next(error);

    }
};

exports.getClaimedPositions = async (req, res, next) =>{
    try {
        const userId = req.params.userId;

        const result1 = await PostedJobs
                             .find({status: "open_position_Cliam"})
                             
        const result = await ClaimedPositions
                             .find({recruiterId: userId})
                             .populate(['recruiterId','jobId']).exec();
        // const result = await ClaimedPositions
        //                      .find({recruiterId: userId})
        //                      .populate(['recruiterId','jobId']).exec();
                            
        if(! result ){                    
            const error = new Error('No claimed position found for given user id.');
            error.statusCode= 404;
            throw error;
        }
        console.log(result);
        res.status(200).json({message:"Claimed positions successfully found.", posts:result});
    } catch (error) {
        next(error);
    }
};

exports.addCandidate = async (req, res, next)=>{
    try {
        // let {jobId, recruiterId} = req.params;
        // console.log(req.params);
        const {name, email, phoneNumber, experience, currentWorking, last_or_current_ctc, expected_ctc, noticePeriod, lastWorkingDay, currentLocation, readyToRelocate, noticePeriodBuyoutAvailable, additionalLinks, remarks} = req.body;
        // console.log(typeof recruiterId)
        // recruiterId = recruiterId.trim();
        console.log(req.body);
        // let resumeId;
        // let additionalFilesIds=[];
        
        let x= req.files;
       // console.log("heelo",req.files);
        if (req.files === undefined){
             return res.status(400).json({message:"you must select a file."});
            }
        else{
            resumeId= req.files['resume'][0].id;
            req.files['additionalFiles'].forEach(element => {
                additionalFilesIds.push(element.id);
            });
             
        }
       
        const post =  new CandidateProfiles({name, email, phoneNumber, experience, currentWorking, last_or_current_ctc, expected_ctc, noticePeriod, lastWorkingDay, currentLocation, readyToRelocate, noticePeriodBuyoutAvailable, additionalLinks, remarks, jobId, recruiterId: recruiterId, resume: resumeId,additionalFiles: additionalFilesIds,status:"add_Profile_req"});

        const result = await post.save();
        if (! result) {
            throw new Error("Something went wrong.");
        }
        console.log(result);
        res.status(201).json({message:"Candidate profile added successfully.",posts:result});
    } catch (error) {
        console.log(error);
        next(error);
    }
};