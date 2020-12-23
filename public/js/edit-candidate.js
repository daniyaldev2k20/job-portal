/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const editCandidate = async (candidateId, data) => {
  try {
    await axios
      .patch(`/api/v1/candidates/editCandidate/${candidateId}`, data)
      .then((res) => {
        if (res.data.status === 'success') {
          showAlert(res.data.status, 'Candidate object updated successfully');
          window.setTimeout(() => {
            location.assign('/getAllCandidates');
          }, 1500);
        }
      });
  } catch (error) {
    showAlert('error', err.response.data.message);
  }
};
