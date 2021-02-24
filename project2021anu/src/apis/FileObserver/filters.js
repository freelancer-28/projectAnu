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
      "route": [
        {
          "routeId": 1,
          "displayName": "PSP",
          "hopId": [ 2,3 ]
        },
        {
          "routeId": 2,
          "displayName": "RBMS",
          "hopId": [ 5, 6 ]
        },
        {
          "routeId": 3,
          "displayName": "SAPHIRE",
          "hopId": [ 8, 9 ]
        },
        {
          "routeId": 4,
          "displayName": "CIP",
          "hopId": [ 11, 12 ]
        }
      ],
      "status": "Success"
    }
      return data
      // return data.name.map(d=>({
      //   value: d,
      //   label: d
      // }))
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
