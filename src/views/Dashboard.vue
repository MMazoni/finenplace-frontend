<template>
  <div class="dashboard">
    <v-subheader class="grey--text">Dashboard</v-subheader>
    <v-container class="my-5">
      <h1 class="grey--text subtitle-1">Caixas</h1>
      <v-card class="px-3 py-1 mt-2" v-for="caixa in caixas" :key="caixa.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2">{{ caixa.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Entrada</div>
            <div class="body-2">{{ caixa.entrada }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Despesa</div>
            <div class="body-2">{{ caixa.despesa }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Sangria</div>
            <div class="body-2">{{ caixa.sangria }}</div>
          </v-col>
          <v-col sm="2" md="4" lg="2s">
            <div class="caption grey--text">Faturamento</div>
            <div class="body-2">{{ caixa.faturamento }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      caixas: [
        { id: 1, entrada: "R$ 1000,00", despesa: "R$ 150,00", sangria: "R$ 300,12", faturamento: "R$ 1349,12"},
        { id: 2, entrada: "R$ 1450,00", despesa: "R$ 21,10", sangria: "R$ 6,20", faturamento: "R$ 990,20"},
        { id: 3, entrada: "R$ 1100,80", despesa: "R$ 890,00", sangria: "R$ 70,22", faturamento: "R$ 1219,98"},
        { id: 4, entrada: "R$ 20,00", despesa: "R$ 260,80", sangria: "R$ 367,50", faturamento: "R$ 2210,21"},
        { id: 5, entrada: "R$ 76,10", despesa: "R$ 117,11", sangria: "R$ 26,62", faturamento: "R$ 589,82"},
      ]
    }
  }
};
</script>
