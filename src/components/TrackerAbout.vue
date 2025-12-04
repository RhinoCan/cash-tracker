<script setup lang="ts">
defineOptions({
  name: "TrackerAbout",
});
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel color="primary">
      <v-expansion-panel-title class="bg-primary text-primary-foreground app-title">
        About
        <template v-slot:actions="{ expanded }">
          <v-icon
            :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          ></v-icon>
        </template>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-card flat class="mx-auto maincard-width" color="surface">
          <v-card-text class="maincard-title">Origins</v-card-text>
          <p>
            This app is a descendant of one I originally built while following
            <a href="https://www.youtube.com/watch?v=hNPwdOZ3qFU"
              >one of Brad Traversy's courses</a
            >. I then made a number of upgrades which are summarized below:
          </p>
          <ul class="custom-list">
            <li>Tests for the original version of the program were added.</li>
            <li>The props were replaced by a Pinia store.</li>
            <li>Vue components were replaced by Vuetify components.</li>
            <li>
              A confirm dialog was added to ensure that the user really means to
              delete the transaction chosen for deletion.
            </li>
            <li>
              Most of the code was changed to use Typescript rather than
              Javascript.
            </li>
            <li>
              Some internationalization/localization was done to make monetary
              amounts appear in the correct format for the locale in which the
              app is running. A provision for the user to change the locale to
              one of his choice and to change the appearance of monetary amounts
              beyond the norms for that locale was also provided via two new
              dialogs accessed from a Settings menu.
            </li>
          </ul>
        </v-card>

        <v-card flat class="mx-auto maincard-width" color="surface">
          <v-card-title class="maincard-title"
            >Major Packages Used</v-card-title
          >
          <v-row dense class="text-center">
            <v-col cols="4">
              <v-card class="pa-2 text-center h-100" elevation="2" color="surface">
                <div
                  class="d-flex justify-center align-center mt-2 mx-auto logo-container"
                >
                  <img src="/vue3-logo.png" alt="Vue logo" class="logo-img" />
                </div>
                <v-card-text class="pa-0 pt-1 font-weight-medium" color="surface"
                  >Vue 3</v-card-text
                >
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card class="pa-2 text-center h-100" elevation="2" color="surface">
                <div
                  class="d-flex justify-center align-center mt-2 mx-auto logo-container"
                >
                  <img
                    src="/vuetify3-logo.png"
                    alt="Vuetify logo"
                    class="logo-img"
                  />
                </div>
                <v-card-text class="pa-0 pt-1 font-weight-medium" color="surface"
                  >Vuetify 3</v-card-text
                >
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card class="pa-2 text-center h-100" elevation="2" color="surface">
                <div
                  class="d-flex justify-center align-center mt-2 mx-auto logo-container"
                >
                  <img
                    src="/pinia-logo.png"
                    alt="Pinia logo"
                    class="logo-img"
                  />
                </div>
                <v-card-text class="pa-0 pt-1 font-weight-medium" color="surface"
                  >Pinia</v-card-text
                >
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.custom-list {
  list-style-type: square;
  padding-left: 30px;
  margin-top: 10px;
}
.custom-list li {
  padding-left: 10px;
  margin-bottom: 8px;
}
.maincard-title {
  color: blue;
  font-weight: 900;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.logo-container {
  width: 64px;
  height: 64px;
}

.logo-img {
  max-width: 100%;
  max-height: 100%;
}
</style>
