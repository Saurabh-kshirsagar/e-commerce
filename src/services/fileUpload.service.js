import axios from "axios";
const url= process.env.REACT_APP_BACKEND_ENDPOINT;


export const fileUpload = async (data) => {
   const imgUpload = await axios.post(`${url }file/upload`, data);
   return imgUpload;
}