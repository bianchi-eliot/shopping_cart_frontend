import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem, Item } from '@/types'


export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

  function addItemToCart(item: Item, quantityAsked: number): string | null {

    if(quantityAsked.toString() === '') quantityAsked = 1
    else if (item.quantity < quantityAsked) quantityAsked = item.quantity

    const isItemInCart = cartItems.value.some(cartItem => cartItem.item_id === item.item_id)

    if (isItemInCart) return null

    cartItems.value.push({
      item_id: item.item_id,
      name: item.name,
      price: item.price,
      totalPrice: item.price * quantityAsked,
      quantityAsked,
      totalQuantity: item.quantity,
      image_url: item.image_url
    })
    return item.name
  }

  function deleteCartItem(itemId: number) {
    const index = cartItems.value.findIndex(cartItem => cartItem.item_id === itemId)
    cartItems.value.splice(index, 1)
  }

  return { cartItems, addItemToCart, deleteCartItem }
})
