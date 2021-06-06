import axios from "./config";

export const dre = ({ data_inicio, data_fim }) => axios.post("dre/", {
    data_inicio, data_fim
});