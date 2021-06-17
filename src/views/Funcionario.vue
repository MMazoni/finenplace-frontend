<template>
  <div id="funcionario">
    <v-snackbar
      v-model="alert"
      top
      color="success"
      timeout="3000"
    >
      Funcionário criado com sucesso.
    </v-snackbar>
    <v-subheader class="grey--text">Funcionário</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Funcionários</h1>
      <v-col class="text-right">
        <v-btn
          elevation="2"
          color="primary"
          fab
          relative
          right
          to="/funcionario/criar"
        ><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-card class="px-3 py-1 mt-2" v-for="funcionario in funcionarios" :key="funcionario.id">
        <v-row dense>
          <v-col>
            <div class="caption grey--text">#</div>
            <div class="body-2 secondary--text">{{ funcionario.id }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Nome</div>
            <div class="body-5">{{ funcionario.nome }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">Cargo</div>
            <div class="body-5">{{ funcionario.cargo.cargo }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { usuarios } from "@/services/usuario";

export default {
  name: "Funcionário",
  data: () =>  {
    return {
      funcionarios: []
    }
  },
  computed: {
    alert () {
      return this.$route.params.alert;
    }
  },
  methods: {
    fetchUsuarios() {
      usuarios()
        .then(response => this.funcionarios = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },
  mounted() {
    this.fetchUsuarios();
  }
}
</script>
