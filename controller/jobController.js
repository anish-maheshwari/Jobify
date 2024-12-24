// import { nanoid } from 'nanoid';

// let jobs = [{id:nanoid(),job:"frontend",country:"india"},{id:nanoid(),job:"backend",country:"australia"}];

import Job from "../models/jobModels.js"
import { StatusCodes } from 'http-status-codes';

import mongoose from 'mongoose';
import day from 'dayjs';

//custom error
import { NotFoundError } from "../errors/customError.js";

export const getAlljobs = async (req,res)=>{
  
  const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(200).json({jobs});
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const singleJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    res.status(200).json({ job });
  };

  // Delete Job
  export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id);
  
    res.status(200).json({ job: removedJob });
  };

  

  export const editJob = async (req, res) => {
    const { id } = req.params;
  
    const editedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  
    res.status(200).json({ job: editedJob });
  };





  export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);
  
    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});
  
    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };
  
    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
  
        const date = day()
          .month(month - 1)
          .year(year)
          .format('MMM YY');
        return { date, count };
      })
      .reverse();
  
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  };