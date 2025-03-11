import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js"; // Correct import for default export

// export const applyJob = async (req, res) => {
//     try {
//         const userId = req.id;
//         const jobId = req.params.id;
//         if (!jobId) {
//             return res.status(400).json({
//                 message: "Job id is required.",
//                 success: false
//             })
//         };
//         // check if the user has already applied for the job
//         const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

//         if (existingApplication) {
//             return res.status(400).json({
//                 message: "You have already applied for this jobs",
//                 success: false
//             });
//         }

//         // check if the jobs exists
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             })
//         }
//         // create a new application
//         const newApplication = await Application.create({
//             job:jobId,
//             applicant:userId,
//         });

//         job.applications.push(newApplication._id);
//         await job.save();
//         return res.status(201).json({
//             message:"Job applied successfully.",
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Validate job ID
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Get user details for email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Update job with the new application
    job.applications.push(newApplication._id);
    await job.save();

    // Automation: Send confirmation email
    const emailSubject = `Application Confirmation - ${job.title}`;
    const emailText = `
            Hello ${user.fullname},
            
            Thank you for applying to the ${job.title} position at ${
      job.company
    }.
            
            Application Details:
            - Position: ${job.title}
            - Location: ${job.location}
            - Applied Date: ${new Date().toLocaleDateString()}
            
            We will review your application and contact you if your qualifications 
            match our requirements. Please allow 3-5 business days for processing.
            
            Best regards,
            ${job.company} Team
        `;

    // Send email (fire and forget)
    sendEmail(user.email, emailSubject, emailText).catch((error) =>
      console.error("Email sending failed:", error)
    );

    return res.status(201).json({
      message: "Job applied successfully. Check your email for confirmation.",
      success: true,
    });
  } catch (error) {
    console.error("Application error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant"
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      succees: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const updateStatus = async (req,res) => {
//     try {
//         const {status} = req.body;
//         const applicationId = req.params.id;
//         if(!status){
//             return res.status(400).json({
//                 message:'status is required',
//                 success:false
//             })
//         };

//         // find the application by applicantion id
//         const application = await Application.findOne({_id:applicationId});
//         if(!application){
//             return res.status(404).json({
//                 message:"Application not found.",
//                 success:false
//             })
//         };

//         // update the status
//         application.status = status.toLowerCase();
//         await application.save();

//         return res.status(200).json({
//             message:"Status updated successfully.",
//             success:true
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // Validate status
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // Find the application by ID
    const application = await Application.findOne({
      _id: applicationId,
    }).populate("applicant")
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });
    const company = application.job.company.name;
    const jobTitle = application.job.title;

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }
    // Update the status
    application.status = status.toLowerCase();
    await application.save();

    // Send email based on status
    const applicantEmail = application.applicant.email;
    const applicantName = application.applicant.fullname;

    // Check if status is accepted or rejected  and send email accordingly
    if (status.toLowerCase() === "accepted") {
      // Send acceptance email
      await sendEmail(
        applicantEmail,
        "Application Accepted", // Email subject
        `Dear ${applicantName},

    We are delighted to inform you that your application for the position at ${company} has been **accepted**. Congratulations on this achievement!

    After carefully reviewing your qualifications and experience, we are confident that you will make a meaningful contribution to our team. We truly appreciate your interest in joining us and look forward to a successful collaboration.

    As the next step, our HR team will reach out to you with details regarding the onboarding process. Please check your email regularly for further instructions. In case you have any questions, feel free to contact us.

    Once again, congratulations on your success! We are excited to welcome you to the ${company} family.

    Best regards,  
    The ${company} Team`
      );

    } else if (status.toLowerCase() === "rejected") {
      // Send rejection email
      await sendEmail(
        applicantEmail,
        "Application Rejected", // Email subject
        `Dear ${applicantName},
    
    We regret to inform you that after careful consideration, your application for the position at ${company} has not been selected at this time. 
    
    Please know that this decision was not a reflection of your skills or potential, but rather the result of a highly competitive selection process. We truly appreciate the time and effort you put into your application and thank you for considering ${companyName} as a place to grow your career.
    
    We encourage you to stay connected and apply for future opportunities that align with your skills. We wish you all the best in your professional journey.
    
    Best regards,  
    The ${company} Team`
      );
    }

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
