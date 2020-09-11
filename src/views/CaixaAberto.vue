<template>
  <div class="caixa-aberto">
    <v-subheader class="grey--text">Caixa Aberto</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row>
        <v-col cols="11" md="3">
          <v-form>
            <v-text-field
              v-model="entrada"
              label="Entrada"
            ></v-text-field>
            <v-btn
              text
              icon
              color="secondary"
            ><v-icon>add</v-icon></v-btn>
          </v-form>
        </v-col>

        <v-col cols="1">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="11" md="3">
          <v-form>
            <v-select
              v-model="tipo" 
              :items="tipos"
              label="Tipo"
              required
            ></v-select>
            <v-text-field
              v-model="despesa"
              label="Despesa"
            ></v-text-field>
            <v-btn
              text
              icon
              color="secondary"
            ><v-icon>add</v-icon></v-btn>
          </v-form>
        </v-col>
        
        <v-col cols="1">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="11" md="3">
          <v-form>
            <v-text-field 
              v-model="sangria" 
              label="Sangria"
            ></v-text-field>
            <v-btn
              text
              icon
              color="secondary"
            ><v-icon>add</v-icon></v-btn>
          </v-form>
        </v-col>

        <v-col cols="1">
          <v-divider vertical></v-divider>
        </v-col>
      </v-row>
      <v-btn
        block
        color="secondary"
      >Preparar fechamento</v-btn>
      <v-divider></v-divider>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "CaixaAberto",
  data: () => ({
    entrada: "",
    tipo: null,
    tipos: [
      { value: null, text: "Selecione..."},
      { value: 1, text: "Fornecedor"},
      { value: 2, text: "Petit Cash"},
      { value: 3, text: "Esqueci"},
    ],
    despesa: "",
    sangria: ""
  }),
};
</script>