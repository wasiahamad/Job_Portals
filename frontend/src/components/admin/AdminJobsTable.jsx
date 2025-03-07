// // import React, { useEffect, useState } from 'react'
// // import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// // import { Avatar, AvatarImage } from '../ui/avatar'
// // import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// // import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
// // import { useSelector } from 'react-redux'
// // import { useNavigate } from 'react-router-dom'
// // import { JOB_API_END_POINT } from '@/utils/constant';
// // import axios from 'axios';

// // const AdminJobsTable = () => {
// //     const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
// //     const [filterJobs, setFilterJobs] = useState(allAdminJobs);
// //     const navigate = useNavigate();

// //     const handleDeleteJob = async (jobId) => {
// //         try {
// //             const token = localStorage.getItem('authToken'); // Replace with your token retrieval logic

// //             if (!token) {
// //                 console.error("No token found. User is not authenticated.");
// //                 return;
// //             }

// //             const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //             });

// //             if (response.data.success) {
// //                 const updatedJobs = allAdminJobs.filter((job) => job._id !== jobId);
// //                 setFilterJobs(updatedJobs);
// //                 console.log("Job deleted successfully!");
// //             } else {
// //                 console.error("Failed to delete job:", response.data.message);
// //             }
// //         } catch (error) {
// //             console.error("Error deleting job:", error.response?.data?.message || error.message);
// //         }
// //     };

// //     useEffect(() => {
// //         console.log('called');
// //         const filteredJobs = allAdminJobs.filter((job) => {
// //             if (!searchJobByText) {
// //                 return true;
// //             };
// //             return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

// //         });
// //         setFilterJobs(filteredJobs);
// //     }, [allAdminJobs, searchJobByText])
// //     return (
// //         <div>
// //             <Table>
// //                 <TableCaption>A list of your recent  posted jobs</TableCaption>
// //                 <TableHeader>
// //                     <TableRow>
// //                         <TableHead>Company Name</TableHead>
// //                         <TableHead>Role</TableHead>
// //                         <TableHead>Date</TableHead>
// //                         <TableHead className="text-right">Action</TableHead>
// //                     </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                     {
// //                         filterJobs?.map((job) => (
// //                             <tr>
// //                                 <TableCell>{job?.company?.name}</TableCell>
// //                                 <TableCell>{job?.title}</TableCell>
// //                                 <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
// //                                 <TableCell className="text-right cursor-pointer">
// //                                     <Popover>
// //                                         <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
// //                                         <PopoverContent className="w-32">
// //                                             <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
// //                                                 <Edit2 className='w-4' />
// //                                                 <span>Edit</span>
// //                                             </div>

// //                                             {/* Delete logic */}
// //                                             <div onClick={() => handleDeleteJob(job._id)} className='flex items-center gap-2 w-fit cursor-pointer'>
// //                                                 <Trash2 className='w-4' />
// //                                                 <span>Delete</span>
// //                                             </div>

// //                                             <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
// //                                                 <Eye className='w-4' />
// //                                                 <span>Applicants</span>
// //                                             </div>
// //                                         </PopoverContent>
// //                                     </Popover>
// //                                 </TableCell>
// //                             </tr>

// //                         ))
// //                     }
// //                 </TableBody>
// //             </Table>
// //         </div>
// //     )
// // }

// // export default AdminJobsTable


// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Avatar, AvatarImage } from '../ui/avatar';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';

// const AdminJobsTable = () => {
//   const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState(allAdminJobs);
//   const navigate = useNavigate();

//   // Function to handle job deletion
//   const handleDeleteJob = async (jobId) => {
//     try {
//       const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

//       if (!token) {
//         console.error('No token found. User is not authenticated.');
//         return;
//       }

//       // Make DELETE request to backend
//       const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         // Update the jobs list by filtering out the deleted job
//         const updatedJobs = allAdminJobs.filter((job) => job._id !== jobId);
//         setFilterJobs(updatedJobs); // Update state
//         console.log('Job deleted successfully!');
//       } else {
//         console.error('Failed to delete job:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error deleting job:', error.response?.data?.message || error.message);
//     }
//   };

//   // Filter jobs based on search text
//   useEffect(() => {
//     const filteredJobs = allAdminJobs.filter((job) => {
//       if (!searchJobByText) {
//         return true;
//       }
//       return (
//         job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
//         job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
//       );
//     });
//     setFilterJobs(filteredJobs);
//   }, [allAdminJobs, searchJobByText]);

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent posted jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterJobs?.map((job) => (
//             <TableRow key={job._id}>
//               <TableCell>{job?.company?.name}</TableCell>
//               <TableCell>{job?.title}</TableCell>
//               <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
//               <TableCell className="text-right cursor-pointer">
//                 <Popover>
//                   <PopoverTrigger>
//                     <MoreHorizontal />
//                   </PopoverTrigger>
//                   <PopoverContent className="w-32">
//                     {/* Edit Button */}
//                     <div
//                       onClick={() => navigate(`/admin/companies/${job._id}`)}
//                       className="flex items-center gap-2 w-fit cursor-pointer"
//                     >
//                       <Edit2 className="w-4" />
//                       <span>Edit</span>
//                     </div>

//                     {/* Delete Button */}
//                     <div
//                       onClick={() => handleDeleteJob(job._id)}
//                       className="flex items-center gap-2 w-fit cursor-pointer"
//                     >
//                       <Trash2 className="w-4" />
//                       <span>Delete</span>
//                     </div>

//                     {/* View Applicants Button */}
//                     <div
//                       onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
//                       className="flex items-center w-fit gap-2 cursor-pointer mt-2"
//                     >
//                       <Eye className="w-4" />
//                       <span>Applicants</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminJobsTable;


import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px]">
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div onClick={() => handleDeleteJob(job._id)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Trash2 className="w-4" />
                      <span>Delete</span>
                    </div>
                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
