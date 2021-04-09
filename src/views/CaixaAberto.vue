<template>
  <div class="caixa-aberto">
    <v-subheader class="grey--text">Caixa Aberto</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row>
        <v-col cols="11" md="3" class="mr-5 pr-5">
          <v-form @submit.prevent="saveEntrada('entrada')">
            <v-text-field v-model.lazy="entrada" v-money="money" ref="entrada" label="Entrada"></v-text-field>
            <v-btn text icon color="secondary" type="submit">
              <v-icon>add</v-icon>
            </v-btn>
          </v-form>
        </v-col>

        <v-col cols="1">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="11" md="3" class="mr-5 pr-5">
          <v-form @submit.prevent="saveDespesa('despesa')">
            <v-select
              v-model="tipoDespesa"
              :items="tipoDespesas"
              ref="tipos"
              item-text="tipo"
              item-value="id"
              label="Tipo"
              required
            ></v-select>
            <v-text-field v-model.lazy="despesa" v-money="money" ref="despesa" label="Despesa"></v-text-field>
            <v-btn text icon color="secondary" type="submit">
              <v-icon>add</v-icon>
            </v-btn>
          </v-form>
        </v-col>

        <v-col cols="1">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="12" md="3" class="mr-5 pr-5">
          <v-form @submit.prevent="saveSangria('sangria')">
            <v-text-field v-model.lazy="sangria" v-money="money" ref="sangria" label="Sangria"></v-text-field>
            <v-btn text icon color="secondary" type="submit">
              <v-icon>add</v-icon>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-btn block color="secondary" class="mb-5" @click="confirm()">Preparar fechamento</v-btn>
      <v-row>
        <v-col cols="12">
          <v-list v-for="item in items" :key="items.indexOf(item)">
            <v-flex justify="end" class="py-0 my-0 border-bottom">
              <v-list-item class="py-0 my-0">- {{ item.categoria }} | {{ item.valor }}</v-list-item>
              <v-list-item-action class="py-0 my-0">
                <v-btn icon color="red" class="mr-3" @click="removeItem(items.indexOf(item))">
                  <v-icon>remove_circle_outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-flex>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <Confirmation />
  </div>
</template>
<script>
import Confirmation from "@/components/Confirmation";
import { confirmation, dialogConclude, openDialog } from '../store.js';
import { showCaixa, turnNumber } from "@/services/caixa";
import { getTipoDespesas, storeDespesas } from "@/services/despesa";
import { storeSangrias } from "@/services/sangria";
import { storeEntradas } from "@/services/entrada";
import { VMoney } from "v-money";

export default {
  name: "CaixaAberto",
  components: { Confirmation },
  computed: {
    dialogConfirmation() {
      return confirmation.confirm;
    },
    dialog() {
      return confirmation.dialog;
    },
  },
  data: () => ({
    caixa: {},
    id: 0,
    entrada: "",
    tipoDespesas: [],
    tipoDespesa: 0,
    items: [],
    despesa: "",
    sangria: "",
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 2,
      masked: false,
    },
    error: []
  }),

  watch: {
    dialogConfirmation(value) {
      if (value === true) {
        console.log(value)
        this.prepararFechamento();
      }
    },
  },

  directives: { money: VMoney },

  methods: {
    saveEntrada(category) {
      const data = {
        idCaixa: this.$route.params.caixaId,
        entrada: turnNumber(this.entrada),
      };
      console.log(data)
      storeEntradas(data)
            .then((response) => {
              console.log(response.data);
              this.addToList(category);
            })
            .catch((error) => this.error.push(error.response));
    },
    saveDespesa(category) {
      const data = {
        idCaixa: this.$route.params.caixaId,
        idTipo: this.tipoDespesa,
        despesa: turnNumber(this.despesa),
      };
      console.log(data)
      storeDespesas(data)
        .then((response) => {
          console.log(response.data);
          this.addToList(category);
        })
        .catch((error) => this.error.push(error.response));
    },
    saveSangria(category) {
      const data = {
        idCaixa: this.$route.params.caixaId,
        sangria: turnNumber(this.sangria),
      };
      console.log(data)
      storeSangrias(data)
        .then((response) => {
          console.log(response.data);
          this.addToList(category);
        })
        .catch((error) => this.error.push(error.response));
    },
    addToList(category) {
      console.log("tipo: ", this.tipoDespesa)
      console.log("refs: ", this.$refs.tipos.selectedItems[0])
      const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      this.$set(this.items, this.id, {
        id: this.id,
        categoria: capitalizedCategory,
        valor: this[category],
      });
      if (category === "despesa") {
        this.items[
          this.id
        ].categoria = `${this.$refs.tipos.selectedItems[0].tipo}(despesa)`;
        this.items[this.id][
          "tipo"
        ] = this.$refs.tipos.selectedItems[0].id;
      }
      this.id += 1;
      this.cleanFields();
    },
    cleanFields() {
      const inputs = {
        entrada: this.$refs.entrada.$el.querySelector('input'),
        despesa: this.$refs.despesa.$el.querySelector('input'),
        sangria: this.$refs.sangria.$el.querySelector('input')
      }
      inputs.entrada.value = "R$ 0.00";
      this.tipoDespesa = 0;
      inputs.despesa.value = "R$ 0.00";
      inputs.sangria.value = "R$ 0.00";
    },
    removeItem(id) {
      this.items.splice(id, 1);
      this.id -= 1;
    },
    fetchDespesaTipo() {
      getTipoDespesas()
        .then(response => {
          this.tipoDespesas = response.data;
          console.log("Despesa: ", this.tipoDespesas);
        })
        .catch((error) => this.error.push(error.response));
    },
    fetchCaixa() {
      showCaixa(this.$route.params.caixaId)
        .then((res) => (this.caixa = res.data))
        .catch((err) => this.error.push(err.response));
    },
    prepararFechamento() {
      dialogConclude();
      this.$router.push({
        name: "Fechamento",
        params: { caixaId: this.$route.params.caixaId },
      });
    },
    confirm() {
      openDialog();
    },
  },

  mounted() {
    this.fetchCaixa();
    this.fetchDespesaTipo();
  },

};
</script>