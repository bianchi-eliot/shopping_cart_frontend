<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ItemComponent from './Item.vue'
import type { Item } from '@/types'

const items = ref<Item[] | null>(null)

onMounted(async () => {
  const responce = await fetch('http://localhost:3000/items')
  if (responce.ok && responce.status === 200) {
    items.value = await responce.json()
  } 
  else if (responce.ok && responce.status === 204) {
    items.value = []
  } 
  else if (!responce.ok) {
    alert('An error occured on the server')
  }
})
</script>

<template>
    <div v-if="items == null">Loading items</div>
    <div v-if="items?.length === 0">No item found</div>
    <section v-else class="items">
      <ItemComponent v-for="item in items" :key="item.item_id" :item="item" />
    </section>
</template>

<style>
.items {
  flex-grow: 2;
  display: grid;
    grid-template-columns: repeat(auto-fill, 400px);
    justify-content: center;
    gap: 35px;
}
</style>