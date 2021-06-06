<template>
  <div id="funcionario-novo">
    <v-subheader class="grey--text">Funcionário / Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Funcionário</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">

            <v-text-field
              v-model.lazy="nome"
              label="Nome da Marca"
              required
            ></v-text-field>

            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Criar</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { storeUsuario } from "@/services/usuario";

export default {
  name: "Novo Funcionário",

  data: () => ({
    nome: "",
    errors: [],
  }),

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar esse funcionário?',
      });
      if (res) {
        this.criarUsuario();
      }
    },

    criarUsuario() {
      const usuario = {
        usuario: this.nome,
      };
      storeUsuario(usuario)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: "Funcionário"
          });
        })
        .catch((error) => this.errors.push(error.response));
    },
  }
}
</script>
