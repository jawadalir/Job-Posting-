import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../utils/api';
import RichTextEditor from './RichTextEditor';
import '../styles/App.css';

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    jobType: 'Full-Time',
    salary: '',
    description: '',
    workingHours: '',
    applyAt: 'sajjad_hussain@analytus.be',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const result = await createJob(formData);

      if (result.success) {
        setSuccess('Job posted successfully!');
        setFormData({
          jobTitle: '',
          location: '',
          jobType: 'Full-Time',
          salary: '',
          description: '',
          workingHours: '',
          applyAt: 'sajjad_hussain@analytus.be',
        });
        setTimeout(() => {
          navigate('/jobs');
        }, 1500);
      } else {
        setError(result.message || 'Failed to post job');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Post a New Job</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title *</label>
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
              <label htmlFor="location">Location *</label>
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
              placeholder="e.g., 75000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <RichTextEditor
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed job description, responsibilities, requirements, etc. Use Ctrl+B for bold, Ctrl+I for italic."
              required
              rows={6}
            />
            <input
              type="hidden"
              name="description"
              value={formData.description}
              required
            />
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
                placeholder="e.g., 9 AM - 5 PM, Flexible"
              />
            </div>

            <div className="form-group">
              <label htmlFor="applyAt">Apply At</label>
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
            {loading ? 'Posting Job...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
