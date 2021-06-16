import axios from "./config";

export const dre = inicio  => axios.post("dre/", inicio);

export const listDre = () => axios.get("dre/");