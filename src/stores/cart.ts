import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem, Item } from '@/types'


export const useCartStore = defineStore('Cart', () => {
  const cartItems = ref<CartItem[]>([])

  function loadCartItemsFromLocalStorage() {
    const cartItemsString = localStorage.getItem('cartItems')
    if (cartItemsString == null) return

    const cartItemsJSON: CartItem[] = JSON.parse(cartItemsString)
    cartItemsJSON.forEach(cartItem => cartItems.value.push(cartItem))
  }

  function addItemToCart(item: Item, quantityAsked: number): string | null {

    if(quantityAsked.toString() === '') quantityAsked = 1
    else if (item.quantity < quantityAsked) quantityAsked = item.quantity

    const isItemInCart = cartItems.value.some(cartItem => cartItem.item_id === item.item_id)

    if (isItemInCart) return null

    const cartItem: CartItem = {
      item_id: item.item_id,
      name: item.name,
      price: item.price,
      quantityAsked,
      totalQuantity: item.quantity,
      image_url: item.image_url
    }
    cartItems.value.push(cartItem)
    
    addItemToLocalStorage(cartItem)

    return cartItem.name
  }

  function removeItemFromCart(itemId: number) {
    const index = cartItems.value.findIndex(cartItem => cartItem.item_id === itemId)
    cartItems.value.splice(index, 1)
    removeItemFromLocalStorage(itemId)
  }

  function decreaseItemQuantityAsked(itemId: number) {
    const index = cartItems.value.findIndex(cartItem => cartItem.item_id === itemId)
    cartItems.value[index].quantityAsked--

    decreaseItemQuantityInLocalStorage(itemId)
  }

  function increaseItemQuantityAsked(itemId: number) {
    const index = cartItems.value.findIndex(cartItem => cartItem.item_id === itemId)
    cartItems.value[index].quantityAsked++

    increaseItemQuantityInLocalStorage(itemId)
  }

  function addItemToLocalStorage(cartItem: CartItem) {
    const cartItemsString = localStorage.getItem('cartItems')
    if (cartItemsString == null) {
      localStorage.setItem('cartItems', JSON.stringify([cartItem]))
    }
    else {
      const cartItemsJSON: CartItem[] = JSON.parse(cartItemsString)
      cartItemsJSON.push(cartItem)
      localStorage.setItem('cartItems', JSON.stringify(cartItemsJSON))
    }
  }

  function removeItemFromLocalStorage(itemId: number) {
    const cartItemsString = localStorage.getItem('cartItems') as string
    const cartItemsJSON: CartItem[] = JSON.parse(cartItemsString)
    const index = cartItemsJSON.findIndex(cartItem => cartItem.item_id === itemId)
    cartItemsJSON.splice(index, 1)
    localStorage.setItem('cartItems', JSON.stringify(cartItemsJSON))
  }

  function decreaseItemQuantityInLocalStorage(itemId: number) {
    const cartItemsString = localStorage.getItem('cartItems') as string
    const cartItemsJSON: CartItem[] = JSON.parse(cartItemsString)

    const index = cartItemsJSON.findIndex(cartItem => cartItem.item_id === itemId)
    cartItemsJSON[index].quantityAsked--
    localStorage.setItem('cartItems', JSON.stringify(cartItemsJSON))
  }

  function increaseItemQuantityInLocalStorage(itemId: number) {
    const cartItemsString = localStorage.getItem('cartItems') as string
    const cartItemsJSON: CartItem[] = JSON.parse(cartItemsString)

    const index = cartItemsJSON.findIndex(cartItem => cartItem.item_id === itemId)
    cartItemsJSON[index].quantityAsked++
    localStorage.setItem('cartItems', JSON.stringify(cartItemsJSON))
  }

  return { 
    cartItems, loadCartItemsFromLocalStorage, 
    addItemToCart, removeItemFromCart,
    decreaseItemQuantityAsked, increaseItemQuantityAsked
  }
})
