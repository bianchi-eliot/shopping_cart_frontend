<script setup lang="ts">
import { ref } from 'vue'
import ItemsComponent from '@/components/home/items/Items.vue'
import FilterComponent from '@/components/home/filter/Filter.vue'
import CartComponent from '@/components/home/cart/Cart.vue'
import FlashMessagesComponent from '@/components/flash_messages/FlashMessages.vue'

const showFilter = ref(true)
const showCart = ref(true)
</script>

<template>
  <main class="home">
    <FlashMessagesComponent/>

    <button class="btn secondary round btn-filter" @click="showFilter = !showFilter">
      <img src="@/assets/images/filter.svg" alt="filter image">
    </button>
    <FilterComponent v-if="showFilter" />
    <ItemsComponent />
    <CartComponent v-if="showCart" />
    <button class="btn primary round btn-cart" @click="showCart = !showCart">
      <img src="@/assets/images/shop.svg" alt="cart image">
    </button>
  </main>
</template>

<style>
main.home {
  position: relative;
  display: flex;
    column-gap: 20px;
  padding: 0 10px;
}

.btn-filter {
  position: absolute;
    top: 0px;
  z-index: 1;
}
.btn-cart {
  position: absolute;
    top: 0px;
    right: 10px;
  z-index: 1;
}

</style>