/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteCandidate = async (candidateId) => {
  try {
    const res = await axios.delete(
      `/api/v1/candidates/deleteCandidate/${candidateId}`
    );

    showAlert(res.data.status, 'Candidate object deleted successfully');
    window.setTimeout(() => {
      location.assign('/getAllCandidates');
    }, 1500);
  } catch (error) {
    showAlert('error', err.response.data.message);
  }
};
