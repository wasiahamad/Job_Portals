import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const DeleteJob = ({ jobId }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`);
      console.log(response);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Job</button>
      {success ? (
        <p>Job deleted successfully!</p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default DeleteJob;