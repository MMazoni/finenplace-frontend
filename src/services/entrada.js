import axios from "./config";

export const getEntradasByCaixa = caixaId => axios.get(`caixa/entrada/${caixaId}/`);

export const storeEntradas = data => axios.post("caixa/entrada/", {
    funcionario: {
        id: 1 //[TODO] remove this from here in backend
    },
    caixa: {
        id: data.idCaixa
    },
    valor: data.entrada
});

export const entradasPorCaixa = caixaId => axios.get(`caixa/entrada/lista/${caixaId}`);

export const deleteEntrada = entradaId => axios.delete(`caixa/entrada/${entradaId}`);
