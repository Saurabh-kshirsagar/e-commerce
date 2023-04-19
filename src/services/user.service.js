import axios from "axios";

export const userLogin = async (data) => {

   const loginResponse = await axios.post("http://localhost:3003/user/login", data);
   return loginResponse;
}