const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// import axios from 'axios';
const axios = require('axios');

exports.getHomePage = (req, res) => {
	res.status(200).render('home', {
		title: 'Home',
	});
};

exports.getLoginPage = (req, res) => {
	res.status(200).render('login', {
		title: 'Login',
	});
};

exports.getRegisterPage = (req, res) => {
	res.status(200).render('register', {
		title: 'Register',
	});
};

exports.getLoadingPage = (req, res) => {
	res.status(200).render('loading', {
		title: 'Loading',
	});
};

exports.getOverviewPage = catchAsync(async (req, res, next) => {
	if (!req.user) {
		const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
		return next(err);
	}
	const user = req.user;
	res.status(200).render('overview', {
		title: 'Overview',
		user: user,
		domain: user.domain_id,
		competitors: user.competitorSites,
	});
});

exports.getMetricsPage = catchAsync(async (req, res, next) => {
	if (!req.user) {
		const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
		return next(err);
	}
	const user = req.user;
	res.status(200).render('compare_metrics', {
		title: 'Metrics Comparison',
		user: user,
		domain: user.domain_id,
		competitors: user.competitorSites,
	});
});

exports.getKeywordsPage = catchAsync(async (req, res, next) => {
	if (!req.user) {
		const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
		return next(err);
	}
	const user = req.user;
	res.status(200).render('compare_keywords', {
		title: 'Keywords Comparison',
		user: user,
		domain: user.domain_id,
		competitors: user.competitorSites,
	});
});

exports.getProfilePage = (req, res) => {
	const user = req.user;
	res.status(200).render('profile', {
		title: `Profile | ${user.fullName.split(' ')[0]}`,
		user: user,
		domain: user.domain_id,
	});
};

exports.getFeedbackPage = (req, res) => {
	if (!req.user) {
		const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
		return next(err);
	}
	const user = req.user;
	res.status(200).render('feedback', {
		title: `Feedback`,
		user: user,
	});
};

exports.getPasswordForgotPage = (req, res) => {
	res.status(200).render('passwordForgot', {
		title: 'Forgot Password',
	});
};

exports.getPasswordResetPage = async (req, res, next) => {
	//Get user based on the token
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
	const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

	if (!user) {
		const err = new AppError('Your token is invalid or has expired, please try again..', 400);
		return next(err);
	}

	res.status(200).render('passwordReset', {
		title: 'Reset Password',
	});
};

exports.getAdminOverviewPage = catchAsync(async (req, res, next) => {
	if (!req.user) {
		const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
		return next(err);
	}
	// declaring required information
	let domainCount,
		feedbackCount,
		userCount,
		adminCount = 0,
		allUsers;

	// querying required information

	// total no. of domains
	// api/v1/domains
	let response = await axios({
		method: 'GET',
		url: 'http://127.0.0.1:3000/api/v1/domains',
	});
	if (response.data.status === 'success') {
		domainCount = response.data.results;
	}

	// total no. of feedbacks
	// api/v1/feedbacks
	response = await axios({
		method: 'GET',
		url: 'http://127.0.0.1:3000/api/v1/feedbacks',
	});
	if (response.data.status === 'success') {
		feedbackCount = response.data.results;
	}

	// total no. of users
	// api/v1/users
	// get all user's username*, email*, domainName*, competitorsName*, feedbackCount*
	response = await axios({
		method: 'GET',
		url: 'http://127.0.0.1:3000/api/v1/users',
	});
	if (response.data.status === 'success') {
		allUsers = response.data.data.data;
		allUsers.forEach((user) => {
			if (user.role == 'admin') adminCount++;
		});
		userCount = response.data.results - adminCount;
	}

	// console.log(domainCount, feedbackCount, userCount, adminCount, allUsers);
	const currentUser = req.user;

	res.status(200).render('adminOverview', {
		title: 'Admin Overview',
		currentUser: currentUser,
		userCount: userCount,
		domainCount: domainCount,
		feedbackCount: feedbackCount,
		adminCount: adminCount,
		allUsers: allUsers,
	});
});

exports.getAdminFeedbackPage = catchAsync(async (req, res, next) => {
	if (!req.user) {
		const err = new AppError('You are not logged in to view this dashboard. Please login to proceed.', 403);
		return next(err);
	}
	// declaring required information
	let allFeedbacks;

	// querying required information

	// api/v1/feedbacks
	response = await axios({
		method: 'GET',
		url: 'http://127.0.0.1:3000/api/v1/feedbacks',
	});
	if (response.data.status === 'success') {
		allFeedbacks = response.data.data.data;
	}

	const user = req.user;
	res.status(200).render('adminFeedback', {
		title: 'Admin Feedback',
		currentUser: user,
		allFeedbacks: allFeedbacks,
	});
});

exports.getAdminProfilePage = (req, res) => {
	const user = req.user;
	res.status(200).render('adminProfile', {
		title: `Profile | ${user.fullName.split(' ')[0]}`,
		currentUser: user,
	});
};
