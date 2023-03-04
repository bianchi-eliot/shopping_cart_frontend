<script setup lang="ts">
import CartItemComponent from './CartItem.vue'
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
</script>

<template>
  <section class="cart">
    <div class="cart-items">
      <CartItemComponent v-for="cartItem in cartItems" :key="cartItem.item_id" :cartItem="cartItem"/>
    </div>
    <RouterLink v-if="cartItems.length !== 0" class="btn success" :to="{ name: 'order' }">
      Order
    </RouterLink>
    <button v-else class="btn secondary no-cart-item">
      No item
    </button>
  </section>
</template>

<style>
.cart {
  position: absolute;
    top: 60px;
    right: 10px;
  display: flex;
    flex-direction: column;
    gap: 20px;
  background-color: var(--light);
  box-shadow: 2px 2px 3px 2px var(--secondary);
  height: max-content;
  padding: 15px;
  min-width: 250px;
}
.cart-items {
  display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>