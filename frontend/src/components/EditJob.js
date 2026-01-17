import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, updateJob } from '../utils/api';
import '../styles/App.css';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    jobType: 'Full-Time',
    salary: '',
    description: '',
    workingHours: '',
    applyAt: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setFetching(true);
        const result = await getJobById(id);

        if (result.success) {
          const job = result.data;
          setFormData({
            jobTitle: job.jobTitle,
            location: job.location,
            jobType: job.jobType,
            salary: job.salary,
            description: job.description,
            workingHours: job.workingHours,
            applyAt: job.applyAt,
          });
        } else {
          setError(result.message || 'Failed to fetch job');
        }
      } catch (err) {
        setError('An error occurred while fetching the job');
      } finally {
        setFetching(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await updateJob(id, formData);

      if (result.success) {
        setSuccess('Job updated successfully!');
        setTimeout(() => {
          navigate('/my-jobs');
        }, 1500);
      } else {
        setError(result.message || 'Failed to update job');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="container"><p className="loading">Loading job details...</p></div>;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Edit Job Posting</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              placeholder="e.g., Senior React Developer"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., New York, Remote"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary (Annual in EUR)</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              placeholder="e.g., 75000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Enter detailed job description, responsibilities, requirements, etc."
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="workingHours">Working Hours</label>
              <input
                type="text"
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                required
                placeholder="e.g., 9 AM - 5 PM, Flexible"
              />
            </div>

            <div className="form-group">
              <label htmlFor="applyAt">Apply At (Email/Link)</label>
              <input
                type="text"
                id="applyAt"
                name="applyAt"
                value={formData.applyAt}
                onChange={handleChange}
                required
                placeholder="e.g., jobs@company.com or www.company.com/apply"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating Job...' : 'Update Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
