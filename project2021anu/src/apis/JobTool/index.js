// import axios from "../../libs/axios";
import axios from 'axios'
import config from "../../configs/endpoints"
const { baseUrl } = config;

// let response = {
//   "status": "Success",
//   "message": "Successfully retrieved records from the database.",
//   "fileJobConfigurationRequests": [
//     {
//       jobid: "ABC-002",
//       jobname: "job B",
//       applicationname: "PSP",
//     },
//     {
//       jobid: "ABC-003",
//       jobname: "job C",
//       applicationname: "Sapphire",
//     },
//     {
//       jobid: "ABC-004",
//       jobname: "job D",
//       applicationname: "PSP",
//     }
//   ]}

const fetchJobData = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/ebs/api/v1/jobs/getjobnames`, {});
        return data;
        // return response
    } catch (err) {
        console.error(err && err.message);
    }
};

const fetchJobApplications = async () => {
  try {
      const { data } = await axios.get(`${baseUrl}/ebs/api/v1/jobs/getapplications`, {});
      return data;
  } catch (err) {
      console.error(err && err.message);
  }
};

export default { fetchJobData, fetchJobApplications };