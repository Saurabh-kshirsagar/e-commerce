import axios from "axios";
 const url= process.env.REACT_APP_BACKEND_ENDPOINT
export const GetProductD = async (data) => {

    const getProduct = await axios.get(`${url }product`, data);
    return getProduct;
}
export const DeleteProduct = async (id) => {

    const deleteProduct = await axios.delete(`${url }product/ ${id}`);
    return deleteProduct;
}


export const updateProducts = async (id,data) => {

    const editProduct = await axios.put(`${url }product/ ${id}`,data);
    return editProduct;
}
export const get_Products = async (id)=> {
    return axios.get(`${url }product/ ${id}`);
    
  
  }