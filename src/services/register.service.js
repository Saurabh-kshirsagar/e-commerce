import axios from "axios";
 const url= process.env.REACT_APP_BACKEND_ENDPOINT
export const Register = async (data) => {

    const RegisterResponse = await axios.post(`${url }user/register`, data);
    return RegisterResponse;
}