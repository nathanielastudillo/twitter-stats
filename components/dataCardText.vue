<template>
  <v-card class="ma-3">
    <v-badge overlap large color="blue" :icon="badgeIcon">
      <v-icon class="ma-1" x-large>{{ mainIcon }}</v-icon>
    </v-badge>

    <v-card-title>
      {{ text }}
    </v-card-title>
    <v-card-text>
      {{ label }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DataCardText",
  props: {
    text: String,
    label: String,
    mainIcon: String,
    badgeIcon: String,
  },
};
</script>

<style lang="scss" scoped>
</style>