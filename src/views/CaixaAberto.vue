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
            <v-select v-model="tipo" :items="tipos" ref="tipos" label="Tipo" required></v-select>
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
      <v-btn block color="secondary" class="mb-5">Preparar fechamento</v-btn>
      <v-row>
        <v-col cols="12">
          <v-list v-for="item in items" :key="items.indexOf(item)">
            <v-flex justify="end" class="py-0 my-0 border-bottom">
              <v-list-item
                class="py-0 my-0"
              > - {{ item.categoria }} | R$ {{ item.valor }}</v-list-item>
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
export default {
  name: "CaixaAberto",
  data: () => ({
    id: 0,
    entrada: "",
    tipo: null,
    tipos: [
      { value: null, text: "Selecione..." },
      { value: 1, text: "Fornecedor" },
      { value: 2, text: "Petit Cash" },
      { value: 3, text: "Pagamentos" },
    ],
    items: [],
    despesa: "",
    sangria: "",
  }),
  methods: {
    addToList(category) {
      const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      this.$set(this.items, this.id, {
        id: this.id,
        categoria: capitalizedCategory,
        valor: this[category],
      });
      if (category === "despesa") {
        this.items[this.id].categoria = `${this.$refs.tipos.selectedItems[0].text}(despesa)`;
      }
      this.id += 1;
      this.cleanFields();
    },
    cleanFields() {
      this.entrada = "";
      this.tipo = null;
      this.despesa = "";
      this.sangria = "";
    },
    removeItem(id) {
      this.items.splice(id, 1);
      this.id -= 1;
    }
  },
};
</script>