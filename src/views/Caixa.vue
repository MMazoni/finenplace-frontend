<template>
  <div class="caixa">
    <v-subheader class="grey--text">Caixa</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row dense align="center" justify="center">
        <v-col cols="4">
          <v-card color="pa-3 mt-5">
            <v-card-title class="dark_gray--text subheading d-flex justify-center">Caixa Inicial</v-card-title>
            <v-card-actions>
              <v-container fluid class>
                <v-row align="center" justify="center">
                  <v-col cols="7">
                    <v-form>
                      <v-text-field
                        v-model="valorInicial"
                        class="mt-0 pt-0"
                        prepend-inner-icon="local_atm"
                        label="Insira o valor"
                      ></v-text-field>
                      <v-btn text color="secondary" block @click.stop="confirm">
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

<script>
import Confirmation from "@/components/Confirmation";
import { bus } from "@/plugins/bus.js";
import { storeCaixa, storeControleCaixa } from "@/services/caixa";

export default {
  name: "Caixa",
  components: { Confirmation },
  data() {
    return {
      valorInicial: "",
      confirmation: null,
      errors: []
    };
  },

  watch: {
    confirmation(value) {
      if (value === true) {
        this.abrirCaixa();
      }
    }
  },

  methods: {
    abrirCaixa() {
      console.log(this.valorInicial)
      storeControleCaixa()
        .then(res => {
          this.controleCaixa = res.data.cd_ControleCaixa;
          storeCaixa({
            cd_ControleCaixa: res.data.cd_ControleCaixa,
            vl_CaixaInicial: this.valorInicial
          })
            .then(res => {
              this.caixa = res.data;
              this.$router.push({
                name: "Caixa Aberto",
                params: { caixaId: res.data.cd_Caixa }
              });
            })
            .catch(err => this.errors.push(err.response));
        })
        .catch(err => this.errors.push(err.response));
    },
    confirm() {
      bus.$emit('toggle', true);
    }
  },
  created() {
    bus.$on("runConfirmation", data => {
      this.confirmation = data;
    });
  }
};
</script>
