import axios from "axios";
const url = "http://localhost:3000/";

export const createPost = (data: any) => axios.post(url, data)
export const getPosts = () => axios.get(url)
export const updatePostById = (id: any, data: any) => axios.put(`${url}post/edit/${id}`, data);
export const deletePostById = (id: any) => axios.delete(`${url}post/delete/${id}`);
export const register = (data: any) => axios.post(`${url}register`, data);
export const login = (data: any) => axios.post(`${url}login`, data);


