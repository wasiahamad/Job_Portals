import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin k liye job delete
export const deleteJob = async (req, res) => {
    try {
      const jobId = req.params.id;
  
      // Validate jobId (optional but recommended)
      if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
          message: "Invalid job ID.",
          success: false,
        });
      }
  
      // Find and delete the job
      const job = await Job.findByIdAndDelete(jobId);
  
      // Check if the job was found and deleted
      if (!job) {
        return res.status(404).json({
          message: "Job not found.",
          success: false,
        });
      }
  
      // Return success response
      return res.status(200).json({
        message: "Job deleted successfully.",
        success: true,
      });
    } catch (error) {
      console.error("Error deleting job:", error);
  
      // Return a generic error response
      return res.status(500).json({
        message: "Internal server error.",
        success: false,
      });
    }
  };
  
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const job = await Job.findByIdAndUpdate(jobId, { title, description, requirements, salary, location, jobType, experience, position, company: companyId }, { new: true });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };
        return res.status(200).json({
            message: "Job updated successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}