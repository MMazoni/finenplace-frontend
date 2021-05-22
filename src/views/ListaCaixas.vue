<template>
  <div class="caixas">
    <v-subheader class="grey--text">Dashboard</v-subheader>
    <v-container class="my-5">
      <h1 class="grey--text subtitle-1">Caixas</h1>
      <v-card class="px-3 py-1 mt-2" v-for="caixa in caixas" :key="caixa.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ caixa.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Funcionário</div>
            <div class="body-2">{{ firstName(caixa.abertura.funcionario.nome) }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Turno</div>
            <div class="body-2">{{ caixa.abertura.turno }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Valor Inicial</div>
            <div class="body-2">R$ {{ caixa.abertura.valorInicial.toFixed(2) }}</div>
          </v-col>
          <v-col sm="2" md="4" lg="2s">
            <div class="caption grey--text">Valor Crédito</div>
            <div class="body-2">R$ {{ caixa.totalCredito.toFixed(2) }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { caixasFechados } from "@/services/caixa";

export default {
  name: "ListaCaixas",
  data: () => ({
    caixas: []
  }),
  methods: {
    fetchCaixas() {
      caixasFechados()
        .then(res => this.caixas = res.data)
        .catch(err => this.errors.push(err.response));
    },
    firstName(name) {
      const array = name.split(" ");
      return array[0];
    }
  },
  mounted() {
    this.fetchCaixas();
  }
};
</script>
