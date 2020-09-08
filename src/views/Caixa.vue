<template>
  <div class="caixa">
    <v-subheader class="grey--text">Caixa</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row dense align="center" justify="center">
        <v-col cols="4">
          <v-card color="pa-3 mt-5">
            <v-card-title class="subheading d-flex justify-center">Caixa Inicial</v-card-title>
            <v-card-actions>
              <v-container fluid class>
                <v-row align="center" justify="center">
                  <v-col cols="7">
                    <v-form @submit.prevent="submit">
                      <v-text-field
                        v-model="valorInicial"
                        class="mt-0 pt-0"
                        prepend-inner-icon="local_atm"
                        label="Insira o valor"
                      ></v-text-field>
                      <v-btn text color="#ecc30b" block @click.stop="confirm" type="submit">
                        <span>Abrir Caixa</span>
                        <v-icon small right>lock_open</v-icon>
                      </v-btn>
                    </v-form>
                  </v-col>
                </v-row>
              </v-container>
              <Confirmation />
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
import Confirmation from "@/components/Confirmation";
import { bus } from "@/plugins/bus.js";

export default {
  name: "Caixa",
  components: { Confirmation },
  data() {
    return {
      valorInicial: "",
      confirmation: null
    };
  },
  methods: {
    submit() {
      console.log(this.valorInicial)
    },
    confirm() {
      bus.$emit('toggle', true);
    }
  },
  created() {
    bus.$on("runConfirmation", data => this.confirmation = data);
  }
};
</script>
