// import axios from "../../libs/axios";
import axios from 'axios'
import config from "../../configs/endpoints"
const { baseUrl } = config;

const addFile = async (addFileData) => {
  try {
    let url = `${baseUrl}/ebs/api/v1/addFile`;
    const { data } = await axios.post(url, addFileData)
    return data;
  } catch (err) {
    const errorData = err && err.response && err.response.data
    console.error(errorData);
    return errorData

  }
  // return [];
};

export default { addFile };