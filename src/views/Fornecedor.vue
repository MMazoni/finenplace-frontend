<template>
  <div id="fornecedor">
    <v-subheader class="grey--text">Fornecedor</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Fornecedores</h1>
      <v-col class="text-right">
        <v-btn
          elevation="2"
          color="primary"
          fab
          relative
          right
          to="/fornecedor/criar"
        ><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-card class="px-3 py-1 mt-2" v-for="fornecedor in fornecedores" :key="fornecedor.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ fornecedor.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Nome</div>
            <div class="body-5">{{ fornecedor.nome }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Telefone</div>
            <div class="body-5">{{ fornecedor.telefone }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import {fornecedores} from "@/services/fornecedor";

export default {
  name: "Fornecedor",
  data: () =>  {
    return {
      fornecedores: [],
      errors: []
    }
  },

  methods: {
    fetchFornecedores() {
      fornecedores()
        .then(response => this.fornecedores = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },

  mounted() {
    this.fetchFornecedores();
  }
}
</script>
