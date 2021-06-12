<template>
  <div id="caixa-aberto">
    <v-subheader class="grey--text">Caixa Aberto</v-subheader>
    <v-container class="my-5 pt-5">
      <v-row>
        <v-col cols="11" md="3" class="mr-5 pr-5">
          <v-form @submit.prevent="confirmSaveCategory('entrada')">
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
          <v-form @submit.prevent="confirmSaveCategory('despesa')">
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
          <v-form @submit.prevent="confirmSaveCategory('sangria')">
            <v-text-field v-model.lazy="sangria" v-money="money" ref="sangria" label="Sangria"></v-text-field>
            <v-btn text icon color="secondary" type="submit">
              <v-icon>add</v-icon>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-btn block color="secondary" class="mb-5" @click="confirmFechamento()">Preparar fechamento</v-btn>
      <v-row>
        <v-col cols="12">
          <v-list v-for="item in items" :key="items.indexOf(item)">
            <v-flex class="flex-space py-0 my-0 border-bottom">
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
  </div>
</template>
<script>
import { showCaixa, turnNumber, money } from "@/services/caixa";
import { deleteDespesa, despesasPorCaixa, getTipoDespesas, storeDespesas } from "@/services/despesa";
import { deleteSangria, sangriasPorCaixa, storeSangrias } from "@/services/sangria";
import { deleteEntrada, entradasPorCaixa, storeEntradas } from "@/services/entrada";
import { VMoney } from "v-money";

export default {
  name: "CaixaAberto",

  data: () => ({
    caixa: {},
    id: 0,
    entrada: "",
    tipoDespesas: [],
    tipoDespesa: 0,
    items: [],
    despesa: "",
    sangria: "",
    error: [],

  }),

  computed: {
    money() {
      return money;
    },
  },

  directives: {money: VMoney},

  methods: {
    categorySaveMethods(category) {
      const methods = {
        entrada: this.saveEntrada,
        despesa: this.saveDespesa,
        sangria: this.saveSangria,
      }
      return methods[category]();
    },
    saveEntrada() {
      const data = {
        idCaixa: this.$route.params.caixaId,
        entrada: turnNumber(this.entrada),
      };
      storeEntradas(data)
        .then(response => {
          console.log(response.data);
          this.addToList(response.data.id,'entrada');
        })
        .catch(error => this.error.push(error));
    },
    saveDespesa() {
      const data = {
        idCaixa: this.$route.params.caixaId,
        idTipo: this.tipoDespesa,
        despesa: turnNumber(this.despesa),
      };
      storeDespesas(data)
        .then(response => {
          console.log(response.data);
          this.addToList(response.data.id,'despesa');
        })
        .catch(error => this.error.push(error));
    },
    saveSangria() {
      const data = {
        idCaixa: this.$route.params.caixaId,
        sangria: turnNumber(this.sangria),
      };
      storeSangrias(data)
        .then(response => {
          console.log(response.data);
          this.addToList(response.data.id,'sangria');
        })
        .catch(error => this.error.push(error.response));
    },
    addToList(categoryId, category, tipoNome = null) {
      const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      this.$set(this.items, this.id, {
        id: this.id,
        categoria: capitalizedCategory,
        valor: this[category],
        categoriaId: categoryId,
      });
      if (category === "despesa" && tipoNome) {
        this.items[this.id].categoria = tipoNome;
        this.items[this.id]["tipo"] = this.tipoDespesa;
      } else if (category === "despesa" && !tipoNome) {
        this.items[this.id].categoria = `${this.$refs.tipos.selectedItems[0].tipo}(despesa)`;
        this.items[this.id]["tipo"] = this.$refs.tipos.selectedItems[0].id;
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
      const item = this.items[id];
      if (this.deleteCategory(item.categoriaId, item.categoria)) {
        this.items.splice(id, 1);
        this.id -= 1;
      }
    },
    fetchDespesaTipo() {
      getTipoDespesas()
        .then(response => {
          this.tipoDespesas = response.data;
        })
        .catch((error) => this.error.push(error));
    },
    fetchCaixa() {
      showCaixa(this.$route.params.caixaId)
        .then(response => this.caixa = response.data)
        .catch(error => this.error.push(error));
    },
    prepararFechamento() {
      this.$router.push({
        name: "Fechamento",
        params: {caixaId: this.$route.params.caixaId},
      });
    },
    async confirmSaveCategory(category) {
      const res = await this.$dialog.confirm({
        text: `Você gostaria de salvar a ${category}?`,
      });
      if (res) {
        this.categorySaveMethods(category);
      }
    },
    async confirmFechamento() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de preparar o fechamento do caixa?',
      });
      if (res) {
        this.prepararFechamento();
      }
    },
    fetchDespesasByCaixa() {
      despesasPorCaixa(this.$route.params.caixaId)
        .then(response => {
          if (response.data) {
            response.data.reduce((accumulator, current) => {
              this.despesa = this.numberToReal(current.valor);
              this.tipoDespesa = current.tipo.id;
              const tipoNome = `${current.tipo.tipo}(despesa)`;
              this.addToList(current.id, 'despesa', tipoNome);
            }, []);
          }
        })
        .catch(error => this.error.push(error));
    },
    fetchSangriasByCaixa() {
      sangriasPorCaixa(this.$route.params.caixaId)
        .then(response => {
          if (response.data) {
            response.data.reduce((accumulator, current) => {
              this.sangria = this.numberToReal(current.valor);
              this.addToList(current.id, 'sangria');
            }, []);
          }
        })
        .catch(error => this.error.push(error));
    },
    fetchEntradasByCaixa() {
      entradasPorCaixa(this.$route.params.caixaId)
        .then(response => {
          if (response.data) {
            response.data.reduce((accumulator, current) => {
              this.entrada = this.numberToReal(current.valor);
              this.addToList(current.id, 'entrada');
            }, []);
          }
        })
        .catch(error => this.error.push(error));
    },
    numberToReal(number) {
      return `R$ ${parseFloat(number).toFixed(2)}`;
    },
    deleteCategory(categoriaId, categoria) {
      if (categoria === 'Entrada') {
        return deleteEntrada(categoriaId)
          .then(response => {
            console.log(response)
            return true;
          })
          .catch(error => {
            this.errors.push(error);
            return false;
          });
      } else if (categoria === 'Sangria') {
        return deleteSangria(categoriaId)
          .then(response => {
            console.log(response)
            return true;
          })
          .catch(error => {
            this.errors.push(error);
            return false;
          });
      } else {
        return deleteDespesa(categoriaId)
          .then(response => {
            console.log(response)
            return true;
          })
          .catch(error => {
            this.errors.push(error);
            return false;
          });
      }
    },
  },

  mounted() {
    this.fetchCaixa();
    this.fetchDespesaTipo();
    this.fetchDespesasByCaixa();
    this.fetchSangriasByCaixa();
    this.fetchEntradasByCaixa();
  },
};
</script>

<style>
.flex-space {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid black;
}
</style>