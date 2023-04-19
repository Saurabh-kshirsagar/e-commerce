import axios from "axios";
const url= process.env.REACT_APP_BACKEND_ENDPOINT


export const addProducts = async (data) => {

   const addP = await axios.post(`${url }product`, data);
   return addP;
}