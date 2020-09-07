<template>
  <div class="caixa">
    <v-subheader class="grey--text">Caixa</v-subheader>
    <v-container class="my-5">
      <v-row dense>
        <v-col cols="4" offset="4">
            <v-card color="blue lighten-4 pa-3">
              <v-card-title class="subheading d-flex justify-center">Caixa Inicial</v-card-title>
              <v-card-actions>
                <v-form class="form">
                  <v-row align="center" justify="center">
                    <v-col cols="6">
                      <v-text-field v-model="valorInicial" 
                        class="mt-0 pt-0" 
                        prepend-inner-icon="local_atm" 
                        label="Insira o valor"
                      ></v-text-field>
                      <v-btn color="#ecc30b" flat block>Abrir Caixa</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-actions>
            </v-card>
        </v-col>
      </v-row>  
    </v-container>
  </div>
</template>
<style scoped>
.form {
  width: 100%;
}
</style>
<script>
// @ is an alias to /src

export default {
  name: 'Caixa',
  data() {
    return {
      valorInicial: ""
    }
  }
}
</script>
