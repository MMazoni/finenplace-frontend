import axios from "./config";

export const storeMarca = ({ marca }) => 
    axios.post("marca/", { marca });

export const marcas = () => axios.get("marca/");
