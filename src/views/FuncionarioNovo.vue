<template>
  <div id="funcionario-novo">
    <v-subheader class="grey--text">Funcionário / Novo</v-subheader>
    <v-container class="my-5 pt-5">
      <h1 class="grey--text subtitle-1">Criar Funcionário</h1>
      <v-row dense align="center" justify="center">
        <v-col cols="6" lg="8">
          <v-form @submit.prevent="confirm">
            <v-text-field
              v-model.lazy="nome"
              label="Nome"
              required
            ></v-text-field>
            <v-select
              v-model="cargo"
              :items="cargos"
              item-text="cargo"
              item-value="id"
              label="Cargo"
              required
            ></v-select>
            <v-text-field
              v-model.lazy="email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model.lazy="username"
              label="Usuário"
              name="username"
              required
            ></v-text-field>

            <v-text-field
              id="password"
              v-model.lazy="password"
              label="Senha"
              name="password"
              type="password"
            ></v-text-field>
            <v-row justify="end">
              <v-btn color="secondary" type="submit" right>Criar</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { storeUsuario, cargos } from "@/services/usuario";

export default {
  name: "NovoFuncionario",

  data: () => ({
    nome: "",
    cargo: "",
    email: "",
    username: "",
    password: "",
    cargos: [],
    errors: [],
  }),

  methods: {
    async confirm() {
      const res = await this.$dialog.confirm({
        text: 'Você gostaria de criar esse funcionário?',
      });
      if (res) {
        this.criarUsuario();
      }
    },

    criarUsuario() {
      const usuario = {
        nome: this.nome,
        cargo: {
          id: this.cargo
        },
        email: this.email,
        username: this.username,
        password: this.password,
      };
      storeUsuario(usuario)
        .then(response => {
          console.log(response)
          this.$router.push({
            name: "Funcionario",
            params: { alert: true },
          });
        })
        .catch((error) => this.errors.push(error.response));
    },

    fetchCargo() {
      cargos()
        .then(response => this.cargos = response.data)
        .catch(error => this.errors.push(error.response));
    }
  },

  mounted() {
    this.fetchCargo();
  }
}
</script>
