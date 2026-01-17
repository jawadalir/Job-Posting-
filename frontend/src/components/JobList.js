import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs } from '../utils/api';
import '../styles/App.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

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
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(salary);
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

              <p className="job-description">{job.description.substring(0, 150)}...</p>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
