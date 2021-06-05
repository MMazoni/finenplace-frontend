<template>
  <div id="novo-produto">
    <v-subheader class="grey--text">Marca / Nova</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Marca</h1>
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
import { storeMarca } from "@/services/marca";

export default {
  name: "Marca Nova",

  data: () => ({
    nome: "",
    errors: [],
  }),

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar esse produto?',
      });
      if (res) {
        this.criarProduto();
      }
    },

    criarMarca() {
      const marca = {
        marca: this.nome,
      };
      storeMarca(marca)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: "Marca"
          });
        })
        .catch((error) => this.errors.push(error.response));
    },
  }
}
</script>
