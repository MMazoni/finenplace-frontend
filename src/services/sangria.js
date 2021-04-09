import axios from "./config";

export const getSangriasByCaixa = caixaId => axios.get(`sangria/caixa/${caixaId}/`);

export const storeSangrias = data => axios.post("sangria/", {
    funcionario: {
        id: 1 //[TODO] remove this from here in backend
    },
    caixa: {
        id: data.idCaixa
    },
    valor: data.sangria
});