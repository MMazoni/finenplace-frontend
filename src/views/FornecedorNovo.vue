<template>
  <div id="novo-fornecedor">
    <v-subheader class="grey--text">Novo Fornecedor</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">

            <v-text-field v-model.lazy="nome" label="Nome" required></v-text-field>

<!--            <v-text-field v-model.lazy="telefone" label="Telefone" required></v-text-field>-->

            <v-text-field-simplemask
              v-model.lazy="telefone"
              v-bind:label="'Telefone'"
              v-bind:properties="{
                prefix: '',
                suffix: '',
                readonly: false,
                disabled: false,
                outlined: false,
                clearable: true,
                placeholder: '(11) 11111-1111',
              }"
              v-bind:options="{
                inputMask: '(##) #####-####',
                outputMask: '###########',
                empty: null,
                applyAfter: false,
                alphanumeric: false,
                lowerCase: false,
              }"
            />

            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Criar Fornecedor</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FornecedorNovo",


  data: () => ({
    fornecedor: {},
    nome: "",
    telefone: "",
    errors: [],
  }),

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar o fornecedor?',
      });
      if (res) {
        this.criarFornecedor();
      }
    },

    criarFornecedor() {
      console.log(this.nome);
      console.log(this.telefone);
    }
  }
}
</script>
