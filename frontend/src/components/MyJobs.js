import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyJobs, deleteJob } from '../utils/api';
import '../styles/App.css';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const result = await getMyJobs();

      if (result.success) {
        setJobs(result.data);
      } else {
        setError(result.message || 'Failed to fetch your jobs');
      }
    } catch (err) {
      setError('An error occurred while fetching your jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const result = await deleteJob(jobId);

        if (result.success) {
          setJobs(jobs.filter((job) => job._id !== jobId));
          alert('Job deleted successfully');
        } else {
          alert(result.message || 'Failed to delete job');
        }
      } catch (err) {
        alert('An error occurred while deleting the job');
      }
    }
  };

  const formatSalary = (salary) => {
    if (salary === undefined || salary === null || salary === '') return '';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return <div className="container"><p className="loading">Loading your jobs...</p></div>;
  }

  return (
    <div className="container">
      <div className="jobs-header">
        <h2>My Job Postings</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      {jobs.length === 0 ? (
        <div className="no-jobs">
          <p>You haven't posted any jobs yet.</p>
          <button onClick={() => navigate('/post-job')} className="btn btn-primary">
            Post Your First Job
          </button>
        </div>
      ) : (
        <div className="my-jobs-list">
          {jobs.map((job) => (
            <div key={job._id} className="my-job-card">
              <div className="job-content">
                <h3>{job.jobTitle}</h3>
                <div className="job-info">
                  <span>{job.location}</span>
                  <span>{formatSalary(job.salary)}</span>
                  <span className="job-type-badge">{job.jobType}</span>
                  <span>{job.workingHours}</span>
                </div>
                <p className="job-desc">{stripHtml(job.description).substring(0, 150)}...</p>
                <div className="job-meta">
                  <small className="job-date">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </small>
                  <small className="job-posted">
                    Posted by: You
                  </small>
                </div>
              </div>

              <div className="job-actions">
                <button
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
