<template>
  <div class="caixa-aberto">
    <v-subheader class="grey--text">Fechamento</v-subheader>
      <v-container class="my-5 pt-5">
        <v-row dense align="center" justify="center">
          <v-col cols="6" lg="8">

            <v-form @submit.prevent="">
          <v-text-field 
            v-model="dinheiro"
            label="Dinheiro em caixa"
            required
          ></v-text-field>

          <v-text-field
            v-model="credito"
            label="Cartão de crédito"
            required
          ></v-text-field>

          <v-text-field
            v-model="debito"
            label="Cartão de débito"
            required
          ></v-text-field>

          <v-text-field
            v-model="refeicao"
            label="Vale refeição"
            required
          ></v-text-field>

          <v-text-field
            v-model="online"
            label="Valor Online"
            required
          ></v-text-field>

          <v-row justify="end">
            <v-btn
            color="secondary"
            type="submit"
            right
          >Fechar Caixa</v-btn>
          </v-row>
        </v-form>
          </v-col>

        </v-row>
        
          
        
      </v-container>
  </div>
</template>
<script>
export default {
  name: "Fechamento",
  data: () => ({
    caixa: {},
    dinheiro: 0,
    credito: 0,
    debito: 0,
    refeicao: 0,
    online: 0,
    sangrias: [],
    sangriaTotal: 0,
    entradas: [],
    entradaTotal: 0,
    despesas: [],
    despesaTotal: 0,
    errors: []
  }),
}
</script>