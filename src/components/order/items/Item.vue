<script setup lang="ts">
import type { CartItem } from '@/types'

defineProps<{
  cartItem: CartItem
}>()
</script>

<template>
  <div class="order-item">
    <img class="order-item__image" src="@/assets/images/no_image.svg" alt="#" 
      width="64" height="64">
    <span class="order-item__name">{{ cartItem.name }}</span>
    <span class="order-item__price">{{ cartItem.price }} €</span>
    <span class="order-item__quantity">{{ cartItem.quantityAsked }}</span>
    <span class="order-item__total">
      {{ (cartItem.price * cartItem.quantityAsked).toFixed(2) }} €
    </span>
  </div>
</template>

<style>
.order-item {
  display: flex;
    align-items: center;

  border-top: 2px solid var(--secondary);
  border-bottom: 2px solid var(--secondary);
  font-size: 20px;
  height: max-content;
  padding: 5px;
}
.order-item > span {
  text-align: center;
}
.order-item__image { width: 10%; }
.order-item__name { width: 25%; }
.order-item__price { width: 25%; }
.order-item__quantity { width: 15%; }
.order-item__total { width: 25%; }
</style>