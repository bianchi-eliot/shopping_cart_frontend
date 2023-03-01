<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<style>
#app {
  display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>