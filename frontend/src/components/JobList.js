import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllJobs, deleteJob } from '../utils/api';
import '../styles/App.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  // Get current user ID
  let currentUserId = null;
  try {
    const userData = user ? JSON.parse(user) : null;
    currentUserId = userData?.id || null;
  } catch (e) {
    currentUserId = null;
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const result = await getAllJobs();

      if (result.success) {
        setJobs(result.data);
      } else {
        setError(result.message || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('An error occurred while fetching jobs');
    } finally {
      setLoading(false);
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

  const isJobOwner = (job) => {
    if (!currentUserId || !job.postedBy) return false;
    // Check if postedBy is an object with _id or if it's just an ID string
    const postedById = job.postedBy._id || job.postedBy;
    return postedById === currentUserId || postedById?.toString() === currentUserId?.toString();
  };

  if (loading) {
    return <div className="container"><p className="loading">Loading jobs...</p></div>;
  }

  return (
    <div className="container">
      <div className="jobs-header">
        <h2>Available Jobs</h2>
        {token && (
          <Link to="/post-job" className="btn btn-primary">
            Post a Job
          </Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {jobs.length === 0 ? (
        <div className="no-jobs">
          <p>No jobs available at the moment.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h3>{job.jobTitle}</h3>
                <span className="job-type">{job.jobType}</span>
              </div>
              
              <div className="job-details">
                <span className="job-location">{job.location}</span>
                <span className="job-salary">{formatSalary(job.salary)}</span>
              </div>

              <div className="job-meta-info">
                <span className="job-hours">{job.workingHours}</span>
              </div>

              <p className="job-description">{stripHtml(job.description).substring(0, 150)}...</p>

              <div className="job-footer">
                <div className="job-posted-info">
                  <small className="job-posted">
                    {job.postedBy?.fullName || 'Unknown'}
                  </small>
                  <small className="job-date">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>

              <Link to={`/jobs/${job._id}`} className="btn btn-secondary">
                View Details
              </Link>

              {isJobOwner(job) && (
                <div className="job-actions" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => navigate(`/edit-job/${job._id}`)}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
