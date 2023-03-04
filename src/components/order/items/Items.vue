<script setup lang="ts">
import Item from './Item.vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)

const totalPrice = cartItems.value.reduce((accumulator, cartItem) => {
  /* Have to convert to String then to Number, otherwise it does a 
  concatenation instead of an addition */    
  const price = cartItem.price.toString()
  const quantity = cartItem.quantityAsked
  accumulator += parseFloat(price) * quantity
    return accumulator
  }, 0)
</script>

<template>
  <section class="order-items">
    <h2 class="order-items__title">Order Summary</h2>
    <div class="order-labels">
      <span class="label-image">Image</span>
      <span class="label-name">Name</span>
      <span class="label-price">Price</span>
      <span class="label-quantity">Quantity</span>
      <span class="label-total">Total</span>
    </div>
    <Item v-for="cartItem in cartItems" :key="cartItem.item_id" :cartItem="cartItem"/>
    <div class="total-price">
      <span>Total price :</span>
      <span>{{ totalPrice.toFixed(2) }} €</span>
    </div>
  </section>
</template>

<style>
.order-items {
  flex-grow: 2;
  display: flex;
    flex-direction: column;
    gap: 15px;

  background-color: var(--light);
  box-shadow: 2px 2px 3px 1px var(--secondary);
  border-radius: 3px;
  overflow: scroll;
  padding: 30px 0;
  min-width: 400px;
  height: max-content;
}

.order-items__title {
  margin-left: 30px;
}

.order-labels {
  display: flex;
    align-items: center;
  font-size: 20px;
  padding: 0px 25px;
}
.order-labels > span { text-align: center; }
.label-image { width: 10%; }
.label-name { width: 25%; }
.label-price { width: 25%; }
.label-quantity { width: 15%; }
.label-total { width: 25%; }

.total-price {
  display: flex;
    justify-content: space-between;
  font-size: 28px;
  padding: 0 30px;
}
</style>