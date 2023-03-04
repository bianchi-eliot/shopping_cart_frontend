<script setup lang="ts">
import FilterTypeComponent from './FilterType.vue'
</script>

<template>
    <section class="filter">
      <FilterTypeComponent />
    </section>
</template>

<style>
.filter {
  position: absolute;
    top: 60px;
  display: flex;
    flex-direction: column;
    gap: 20px;
  background-color: var(--light);
  box-shadow: 2px 2px 3px 2px var(--secondary);
  height: max-content;
  padding: 5px 10px;
  min-width: 250px;
}
</style>