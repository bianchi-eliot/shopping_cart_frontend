<script setup lang="ts">
import { ref } from 'vue'
import type { CartItem } from '@/types'
import { useCartStore } from '@/stores/cart.js'
import { useFlashMessageStore } from '@/stores/flashMessage'
const cartStore = useCartStore()
const flashMessageStore = useFlashMessageStore()

const props = defineProps<{
  cartItem: CartItem
}>()

const quantity = ref(props.cartItem.quantityAsked)

function subtractQuantity() {
  if (quantity.value - 1 === 0) return deleteItem()
  quantity.value--
  const price = props.cartItem.price
  props.cartItem.totalPrice -= price
}
function addQuantity() {
  if (quantity.value === props.cartItem.totalQuantity) return
  quantity.value++
  // Have to convert to String then to Number, otherwise it does a concatenation instead of an addition
  const price:string = props.cartItem.price.toString()
  props.cartItem.totalPrice += parseInt(price)
}
function deleteItem() {
  const itemId = props.cartItem.item_id
  cartStore.deleteCartItem(itemId)
  flashMessageStore.addFlashMessage('Item deleted from Cart', 'danger')
}
</script>

<template>
  <article class="cart-item">
    <button class="btn little danger delete" @click="deleteItem">&#9747</button>
    <div class="cart-item__description">
      <img class="cart-item__image" src="@/assets/images/no_image.svg" alt="#" width="128" height="128">
      <div class="cart-item__quantity_price">
        <div class="cart-item__quantity">
          <button class="btn little warning subtract" @click="subtractQuantity">-</button>
          <span>{{ quantity }}</span>
          <button class="btn little success add" @click="addQuantity">+</button>
        </div>
        <p class="cart-item__price">{{ cartItem.totalPrice.toFixed(2) }} €</p>
      </div>
    </div>
    <h2 class="cart-item__title">{{ cartItem.name }}</h2>
  </article>
</template>

<style>
article.cart-item {
  position: relative;
  border: 2px solid var(--rgb-secondary);
}
article.cart-item > .btn.delete {
  position: absolute;
    top: -10px;
    left: -10px;
}
.cart-item__description {
  display: flex;
}
.cart-item__quantity_price {
  flex-grow: 1;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
}
.cart-item__quantity {
  display: flex;
    align-items: center;
    gap: 10px;
}
.cart-item__quantity > .btn.subtract, .cart-item__quantity > .btn.add {
  font-size: 18px;
  font-weight: bold;
  width: 30px;
}
.cart-item__quantity > span {
  font-size: 22px;
}
.cart-item__price {
  font-size: 24px;
  margin: 0;
}
.cart-item__title {
  margin-left: 20px;
}
</style>