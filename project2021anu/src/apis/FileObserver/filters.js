// import axios from "../../libs/axios";
import axios from 'axios'
import config from "../../configs/endpoints"
const { baseUrl } = config;


const fetchProducerOptions = async () => {
  try {
    // const { data } = await axios.get(`${baseUrl}/ebs/api/v1/producers/names`, {});
    const data = {
      "name": [
        "NASCO",
        "Edifecs",
        "Oneil",
        "NEB",
        "Salesconnect",
        "Incomm"
      ],
      "status": "Success"
    }
      return data.name.map(d=>({
        value: d,
        label: d
      }))
  } catch (err) {
    console.error(err && err.message);
  }
  return [];
};

const fetchFileMaskOptions = async ({ producer }) => {
  try {
    const { data } = await axios.get(`${baseUrl}/ebs/api/v1/producers/files/masks${producer ? `?producer=${producer}` : ''}`, {});
      return data.prefix.map(d=>({
        value: d,
        label: d
      }))
  } catch (err) {
    console.error(err && err.message);
  }
  return [];
};

export default { fetchProducerOptions, fetchFileMaskOptions };
