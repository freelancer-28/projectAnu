// import axios from "../../libs/axios";
import axios from 'axios'
import config from "../../configs/endpoints"
const { baseUrl } = config;

const updateFile = async (updateFileData) => {
  try {
    let url = `${baseUrl}/ebs/api/v1/configurations/updateFileConfiguration`;
    const { data } = await axios.post(url, updateFileData)
    return data;
  } catch (err) {
    const errorData = err && err.response && err.response.data
    console.error(errorData);
    return errorData

  }
  // return [];
};

export default { updateFile };