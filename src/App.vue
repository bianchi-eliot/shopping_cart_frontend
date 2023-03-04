<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useCartStore } from './stores/cart.js'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCartItemsFromLocalStorage()
})
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