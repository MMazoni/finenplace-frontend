<template>
  <div class="caixas">
    <v-subheader class="grey--text">Dashboard</v-subheader>
    <v-container class="my-5">
      <h1 class="grey--text subtitle-1">Caixas</h1>
      <v-card class="px-3 py-1 mt-2" v-for="caixa in caixas" :key="caixa.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2">{{ caixa.cd_Caixa }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Entradas</div>
            <div class="body-2">R$ {{ caixa.vl_Entradas }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Despesas</div>
            <div class="body-2">R$ {{ caixa.vl_Despesas }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Sangrias</div>
            <div class="body-2">R$ {{ caixa.vl_Sangrias }}</div>
          </v-col>
          <v-col sm="2" md="4" lg="2s">
            <div class="caption grey--text">Faturamento</div>
            <div class="body-2">R$ {{ caixa.vl_Faturamento }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { getCaixas } from "@/services/caixa";

export default {
  name: "ListaCaixas",
  data: () => ({
    caixas: []
  }),
  methods: {
    fetchCaixa() {
      getCaixas()
        .then(res => this.caixas = res.data)
        .catch(err => this.errors.push(err.response));
    }
  },
  mounted() {
    this.fetchCaixa();
  }
};
</script>
