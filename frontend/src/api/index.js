import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function register({ username, email, password }) {
  const res = await axios.post(`${API_URL}/api/auth/register`, {
    username,
    email,
    password,
  });
  return res.data;
}

export async function login({ email, password }) {
  const res = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  return res.data;
}

export async function getProtected(token) {
  const res = await axios.get(`${API_URL}/api/auth/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
