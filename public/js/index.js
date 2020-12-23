/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
import '@babel/polyfill';
const { createCandidate } = require('./create-candidate');
const { editCandidate } = require('./edit-candidate');
const { deleteCandidate } = require('./delete-candidate');
const { showAlert } = require('./alerts');

//DOM Elements
const applyForJobForm = document.querySelector('.form--apply');
const updateCandidateForm = document.querySelector('.form-user-data');
const deleteCandidateForm = document.querySelector('.form-user-data-delete');

if (applyForJobForm) {
  applyForJobForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //FormData is for creating "multipart/form-data" for Multer file upload
    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append(
      'currentAddress',
      document.getElementById('currentAddress').value
    );
    form.append('city', document.getElementById('city').value);
    form.append('province', document.getElementById('province').value);
    form.append('zipCode', document.getElementById('zipCode').value);
    form.append('email', document.getElementById('email').value);
    form.append('phone', document.getElementById('phone').value);
    form.append('position', document.getElementById('position').value);
    form.append('resume', document.getElementById('resume').files[0]);

    createCandidate(form);
  });
}

if (updateCandidateForm) {
  updateCandidateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const candidateId = document.getElementById('cID').value;

    form.append('name', document.getElementById('name').value);
    form.append(
      'currentAddress',
      document.getElementById('currentAddress').value
    );
    form.append('city', document.getElementById('city').value);
    form.append('province', document.getElementById('province').value);
    form.append('zipCode', document.getElementById('zipCode').value);
    form.append('email', document.getElementById('email').value);
    form.append('phone', document.getElementById('phone').value);
    form.append('position', document.getElementById('position').value);
    form.append('resume', document.getElementById('resume').files[0]);

    editCandidate(candidateId, form);
  });
}

if (deleteCandidateForm) {
  deleteCandidateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const candidateId = document.getElementById('cID').value;
    deleteCandidate(candidateId);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;

if (alertMessage) {
  showAlert('success', alertMessage, 20);
}
