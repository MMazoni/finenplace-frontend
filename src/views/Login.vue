<template>
  <v-app>
    <v-main class="blue lighten-5">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title class="text-uppercase">
                  <span class="font-weight-light">Finen</span>
                  <span>Place</span>
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  id="form"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="logar()"
                >
                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="email"
                    :rules="emailRegras"
                    prepend-icon="mdi-account"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    :rules="passwordRegras"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="secondary"
                  type="submit"
                  form="form"
                  :disabled="!valid"
                >
                  <span>Entrar</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { login } from "@/services/auth";
//import { axios as Usuario } from "@/services/config";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    emailRegras: [
      (v) => !!v || "Email é obrigatório",
      //v => /.+@.+\..+/.test(v) || "É necessário um email válido"
    ],
    password: "",
    passwordRegras: [(v) => !!v || "Senha é obrigatória"],
    error: "",
  }),
  methods: {
    validar() {
      this.$refs.form.validate();
    },
    logar() {
      this.validar();
      login({
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          //localStorage.setItem('key', response.data.token);
          //this.$router.push('/');
          alert(response.data.token);
        })
        .catch((erro) => (this.error = erro.response.data.message));
    },
  },
};
</script>