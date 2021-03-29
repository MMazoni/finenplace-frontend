<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Você tem certeza?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary darken-1" text @click="runConfirmation(false)">Não</v-btn>

          <v-btn color="secondary darken-1" text @click="runConfirmation(true)">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { confirmation } from "../store.js";

export default {
  name: "Confirmation",
  computed: {
    dialog() {
      return confirmation.dialog;
    }
  },
  methods: {
    runConfirmation(enable) {
      confirmation.dialog = enable;
      confirmation.confirm = enable;
    }
  },
};
</script>
