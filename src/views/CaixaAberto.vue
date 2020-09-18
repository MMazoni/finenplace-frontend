<template>
  <div class="caixa-aberto">
    <v-subheader class="grey--text">Caixa Aberto</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row>
        <v-col cols="11" md="3" class="mr-5 pr-5">
          <v-form>
            <v-text-field v-model="entrada" label="Entrada"></v-text-field>
            <v-btn text icon color="secondary" @click="addToList('entrada')">
              <v-icon>add</v-icon>
            </v-btn>
          </v-form>
        </v-col>

        <v-col cols="1">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="11" md="3" class="mr-5 pr-5">
          <v-form>
            <v-select
              v-model="tipoDespesa"
              :items="tipoDespesas"
              item-text="ds_DespesaTipo"
              ref="tipos"
              label="Tipo"
              required
            ></v-select>
            <v-text-field v-model="despesa" label="Despesa"></v-text-field>
            <v-btn text icon color="secondary" @click="addToList('despesa')">
              <v-icon>add</v-icon>
            </v-btn>
          </v-form>
        </v-col>

        <v-col cols="1">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="12" md="3" class="mr-5 pr-5">
          <v-form>
            <v-text-field v-model="sangria" label="Sangria"></v-text-field>
            <v-btn text icon color="secondary" @click="addToList('sangria')">
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
              <v-list-item class="py-0 my-0">- {{ item.categoria }} | R$ {{ item.valor }}</v-list-item>
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
import { bus } from "@/plugins/bus.js";
import { showCaixa } from "@/services/caixa";
import { getTipoDespesas, storeDespesas } from "@/services/despesa";
import { storeSangrias } from "@/services/sangria";
import { storeEntradas } from "@/services/entrada";

export default {
  name: "CaixaAberto",
  components: { Confirmation },
  data: () => ({
    caixa: {},
    confirmation: null,
    id: 0,
    entrada: "",
    tipoDespesas: [],
    tipoDespesa: 0,
    items: [],
    despesa: "",
    sangria: "",
  }),

  watch: {
    confirmation(value) {
      if (value === true) {
        this.prepararFechamento();
      }
    },
  },

  methods: {
    addToList(category) {
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
        ].categoria = `${this.$refs.tipos.selectedItems[0].ds_DespesaTipo}(despesa)`;
        this.items[this.id][
          "tipo"
        ] = this.$refs.tipos.selectedItems[0].cd_DespesaTipo;
      }
      this.id += 1;
      this.cleanFields();
    },
    cleanFields() {
      this.entrada = "";
      this.tipoDespesa = 0;
      this.despesa = "";
      this.sangria = "";
    },
    removeItem(id) {
      this.items.splice(id, 1);
      this.id -= 1;
    },
    fetchDespesaTipo() {
      // GET "Lista todos os tipos de despesa"
      getTipoDespesas()
        .then((res) => (this.tipoDespesas = res.data))
        .catch((err) => this.error.push(err.response));
    },
    fetchCaixa() {
      // GET 'Exibe o caixa pelo seu id'
      showCaixa(this.$route.params.caixaId)
        .then((res) => (this.caixa = res.data))
        .catch((err) => this.error.push(err.response));
    },
    prepararFechamento() {
      this.salvarDados();
    },
    confirm() {
      bus.$emit("toggle", true);
    },
    salvarDados() {
      console.log("eu2");
      this.items.forEach((element) => {
        if (element.categoria === "Entrada") {
          storeEntradas({
            idCaixa: this.$route.params.caixaId,
            entrada: element.valor,
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => this.error.push(err.response));
        } else if ("tipo" in element) {
          storeDespesas({
            idCaixa: this.$route.params.caixaId,
            idTipo: element.tipo,
            despesa: element.valor,
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => this.error.push(err.response));
        } else if (element.categoria === "Sangria") {
          storeSangrias({
            idCaixa: this.$route.params.caixaId,
            sangria: element.valor,
          })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => this.error.push(err.response));
        }
      });
      this.$router.push({
        name: "Fechamento",
        params: { caixaId: this.$route.params.caixaId },
      });
    },
  },

  mounted() {
    this.fetchCaixa();
    this.fetchDespesaTipo();
  },

  created() {
    bus.$on("runConfirmation", (data) => {
      this.confirmation = data;
    });
  },
};
</script>