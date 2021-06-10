import axios from "./config";

export const storeMarca = ({ marca }) =>
    axios.post("produto/marca/", { marca });

export const marcas = () => axios.get("produto/marca/");
