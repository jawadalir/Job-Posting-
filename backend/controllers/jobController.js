const Job = require('../models/Job');

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private
exports.createJob = async (req, res) => {
  try {
    const { jobTitle, location, jobType, salary, description, workingHours, applyAt } = req.body;

    // Validate required fields
    if (!jobTitle || !location || !jobType || !description || !applyAt) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Prepare job data - convert empty strings to undefined for optional fields
    const jobData = {
      jobTitle,
      location,
      jobType,
      description,
      applyAt,
      postedBy: req.userId,
    };

    // Only include salary if it's provided and not empty
    if (salary !== undefined && salary !== null && salary !== '') {
      jobData.salary = Number(salary);
    }

    // Only include workingHours if it's provided and not empty
    if (workingHours !== undefined && workingHours !== null && workingHours !== '') {
      jobData.workingHours = workingHours;
    }

    // Create job with posted by user ID
    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'fullName email _id');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'fullName email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get jobs posted by current user
// @route   GET /api/jobs/user/my-jobs
// @access  Private
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.userId });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job posting
// @route   PUT /api/jobs/:id
// @access  Private
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the one who posted the job
    if (job.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    // Prepare update data - handle empty strings for optional fields
    const updateData = { ...req.body };
    
    // Convert empty strings to undefined for optional fields
    if (updateData.salary !== undefined && updateData.salary !== null && updateData.salary !== '') {
      updateData.salary = Number(updateData.salary);
    } else if (updateData.salary === '') {
      updateData.salary = undefined;
    }

    if (updateData.workingHours === '') {
      updateData.workingHours = undefined;
    }

    job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
// @access  Private
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the one who posted the job
    if (job.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
