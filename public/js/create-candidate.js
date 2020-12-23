/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const axios = require('axios');
const { showAlert } = require('./alerts');

exports.createCandidate = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/candidates/createCandidate',
      data,
    });

    if (res.data.status === 'success') {
      showAlert(res.data.status, 'Candidate object created successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
