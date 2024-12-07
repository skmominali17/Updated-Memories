import axios from "axios";

const url = "http://localhost:3000";

// Helper function to get the token
const getToken = () => {
	return localStorage.getItem("token");
};

// Create Post
export const createPost = (data: any) =>
	axios.post(`${url}/create/post`, data, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

// Get All Posts
export const getPosts = () =>
	axios.get(`${url}/get/all-posts`, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

// Update Post by ID
export const updatePostById = (id: any, data: any) =>
	axios.put(`${url}/update/post/${id}`, data, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

// Delete Post by ID
export const deletePostById = (id: any) =>
	axios.delete(`${url}/delete/post/${id}`, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

// Like Post
export const likePost = async (id:any) =>{
	  const response=await axios.post(`${url}/like/post/${id}/`)
	  return response.data;
	  console.log(`Post Liked! ${id}`);
	  
}	

// Register
export const register = (data: any) => axios.post(`${url}/register`, data);

// Login
export const login = (data: any) => axios.post(`${url}/login`, data);
