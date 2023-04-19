import axios from "axios";
const url= process.env.REACT_APP_BACKEND_ENDPOINT


export const category = async (data) => {

   const category = await axios.post(`${url }category`, data);
   return category;
}