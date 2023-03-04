<script setup lang="ts">
import ItemsComponent from '@/components/order/items/Items.vue'
import PaymentComponent from '@/components/order/Payment.vue'
</script>

<template>
  <main class="order">  
    <ItemsComponent />
    <PaymentComponent />
  </main>
</template>

<style>
main.order {
  display: flex;
    flex-direction: column;
    gap: 30px;
  padding: 0 0 0 10px;
}

@media all and (min-width: 850px) {
  main.order {
    flex-direction: row;
  }
}
</style>
