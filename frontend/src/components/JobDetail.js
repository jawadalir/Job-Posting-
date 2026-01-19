import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../utils/api';
import '../styles/App.css';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchJobDetail = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getJobById(id);

      if (result.success) {
        setJob(result.data);
      } else {
        setError(result.message || 'Failed to fetch job details');
      }
    } catch (err) {
      setError('An error occurred while fetching job details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJobDetail();
  }, [fetchJobDetail]);

  const formatSalary = (salary) => {
    if (salary === undefined || salary === null || salary === '') return '';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  if (loading) {
    return <div className="container"><p className="loading">Loading job details...</p></div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/jobs')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Jobs
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container">
        <div className="error-message">Job not found</div>
        <button onClick={() => navigate('/jobs')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/jobs')} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Back to Jobs
      </button>

      <div className="job-detail-container">
        <div className="job-detail-header">
          <h1>{job.jobTitle}</h1>
          <span className="job-type-large">{job.jobType}</span>
        </div>

        <div className="job-detail-info">
          <div className="info-item">
            <strong>Location:</strong>
            <span>{job.location}</span>
          </div>
          <div className="info-item">
            <strong>Salary:</strong>
            <span>{formatSalary(job.salary)}</span>
          </div>
          <div className="info-item">
            <strong>Working Hours:</strong>
            <span>{job.workingHours}</span>
          </div>
          <div className="info-item">
            <strong>Apply At:</strong>
            <span>{job.applyAt}</span>
          </div>
          <div className="info-item">
            <strong>Posted by:</strong>
            <span>{job.postedBy?.fullName || 'Unknown'}</span>
          </div>
          <div className="info-item">
            <strong>Posted on:</strong>
            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="job-detail-description">
          <h2>Job Description</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: job.description || '' }}
            style={{ 
              lineHeight: '1.6',
              color: '#333'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
