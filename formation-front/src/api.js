import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8080", // attention, ici juste le domaine
  withCredentials: true,            // obligatoire pour Sanctum
});

export default API;
