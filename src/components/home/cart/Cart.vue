<script setup lang="ts">
import CartItemComponent from '@/components/home/cart/CartItem.vue'
import { useCartStore } from '@/stores/cart.js'
import { storeToRefs } from 'pinia'

const store = useCartStore()
const { cartItems } = storeToRefs(store)
</script>

<template>
  <section class="cart">
    <div class="cart-items">
      <CartItemComponent v-for="cartItem in cartItems" :key="cartItem.item_id" :cartItem="cartItem"/>
    </div>
    <button class="btn success">Order</button>
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
  background-color: var(--rgb-light);
  box-shadow: 2px 2px 3px 2px var(--rgb-secondary);
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