<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ItemType } from '@/types'

const itemTypes = ref<ItemType[] | null>(null)

onMounted(async () => {
  const responce = await fetch('http://localhost:3000/item-types')
  if (responce.ok && responce.status === 200) {
    itemTypes.value = await responce.json()
  } 
  else if (responce.ok && responce.status === 204) {
    itemTypes.value = []
  } 
  else if (!responce.ok) {
    alert('An error occured on the server')
  }
})
</script>

<template>
  <div class="item-types">
    <div v-for="itemType in itemTypes" :key="itemType.item_type_id" class="item-type">
      <label :for="itemType.name">{{ itemType.name }}</label>
      <input type="checkbox" :id="itemType.name">
    </div>
  </div>
</template>

<style>
.item-types {
  display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  border: 2px solid var(--secondary);
  padding: 20px 0;
}
.item-type {
  display: flex;
    gap: 10px;
  font-size: 20px;
}
</style>