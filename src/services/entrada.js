import axios from "./config";

export const getEntradasByCaixa = caixaId => axios.get(`entrada/caixa/${caixaId}/`);

export const storeEntradas = data => axios.post("entrada/", {
    cd_Caixa: data.idCaixa,
    vl_Entrada: data.entrada
});
