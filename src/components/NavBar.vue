<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="app-nav">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
  </nav>
</template>

<style>
.app-nav {
  display: flex;
    justify-content: space-between;
    align-items: center;

  background-color: var(--light);
  box-shadow: 2px 2px 3px 2px var(--secondary);
  padding: 0 100px;
  height: var(--navbar-height);
}
.app-nav a {
  position: relative;
  color: #000;
  font-size: 22px;
  text-shadow: 2px 2px 3px var(--secondary);
}
.app-nav a::before {
  position: absolute;
    bottom: -7px;
  content: '';
  background-color: var(--primary);
  width: 0;
  height: 2px;
  transition: 0.25s;
}
.app-nav a:hover::before {
  width: 100%;
}
.app-nav a.router-link-active {
  color: var(--primary);
}
</style>