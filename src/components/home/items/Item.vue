<script setup lang="ts">
import { ref } from 'vue'
import type { Item } from '@/types'
import { useCartStore } from '@/stores/cart.js'
import { useFlashMessageStore } from '@/stores/flashMessage.js'

const cartStore = useCartStore()
const flashMessageStore = useFlashMessageStore()

const props = defineProps<{
  item: Item
}>()
const quantityAsked = ref(1)

function addItemToCart() {
  const name: string | null = cartStore.addItemToCart(props.item, quantityAsked.value)
  if (name == null) {
    flashMessageStore.addFlashMessage('Item already in Cart', 'warning')
  } 
  else {
    flashMessageStore.addFlashMessage(`${name}(s) added to Cart`, 'success')
  }
}

</script>

<template>
  <article class="item">
    <div class="item__description">
      <img class="item__image" src="@/assets/images/no_image.svg" alt="#">
      <div>
        <h2 class="item__title">{{ item.name }}</h2>
        <p class="item__price">{{ item.price }} €</p>
        <p class="item__quantity-remaining">Remaining : {{ item.quantity }}</p>
      </div>
    </div>
    <div class="item__buy">
      <input class="item__quantity-asked" type="number" min="1"
        :max="item.quantity" v-model="quantityAsked">
      <button class="btn primary" @pointerdown="addItemToCart">Add to cart</button>
    </div>
  </article>
</template>

<style>
article.item {
  display: flex;
    flex-direction: column;
    gap: 10px;
  background-color: var(--rgb-light);
  border-radius: 2px;
  box-shadow: 2px 2px 4px 2px var(--rgb-secondary);
  padding-bottom: 5px;
  width: 400px;
}
.item__description {
  display: flex;
    gap: 15px;
}
.item__price {
  font-size: 32px;
}
.item__quantity-remaining {
  font-size: 19px;
}
.item__buy {
  display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  border: 2px solid var(--rgb-secondary);
  border-radius: 5px;
  margin: 0 5px;
  padding: 10px;
}
.item__quantity-asked {
  width: 50px;
  height: 35px;
}
</style>