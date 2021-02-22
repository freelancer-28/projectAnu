import axios from "../../libs/axios";
import config from "../../configs/endpoints"
const { baseUrl } = config;

const placeHolderData = [
    {
        active: "string",
        comments: "string",
        direction: "string",
        time: "string",
        id: 1,
    },
    {
        active: "string",
        comments: "string",
        direction: "string",
        time: "string",
        id: 2,
    },
];


const fetchData = async () => {
    // return placeHolderData;
    try {
        const { data } = await axios.get(`${baseUrl}/ebs/api/v1/configuration/getFileConfig`, {});
        return data;
    } catch (err) {
        // const errorData = err && err.response && err.response.data
        console.error(err && err.message);
        // return errorData
    }
    //   return [];
};


export default { fetchData };