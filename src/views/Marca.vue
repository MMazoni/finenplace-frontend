<template>
  <div id="marca">
    <v-snackbar
      v-model="alert"
      top
      color="success"
      timeout="3000"
    >
      Marca criada com sucesso.
    </v-snackbar>
    <v-subheader class="grey--text">Marca</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Marcas</h1>
      <v-col class="text-right">
        <v-btn
          elevation="2"
          color="primary"
          fab
          relative
          right
          to="/marca/criar"
        ><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-card class="px-3 py-1 mt-2" v-for="marca in marcas" :key="marca.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ marca.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Nome</div>
            <div class="body-5">{{ marca.marca }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { marcas } from "@/services/marca";

export default {
  name: "Marca",
  data: () =>  {
    return {
      marcas: []
    }
  },
  computed: {
    alert () {
      return this.$route.params.alert;
    }
  },
  methods: {
    fetchMarca() {
      marcas()
        .then(response => this.marcas = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },
  mounted() {
    this.fetchMarca();
  }
}
</script>
