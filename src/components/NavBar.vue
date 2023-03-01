<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="app-nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>

<style>
.app-nav {
  display: flex;
    justify-content: space-between;

  background-color: var(--rgb-light);
  box-shadow: 2px 2px 3px 2px var(--rgb-secondary);
  padding: 30px 100px;
}
.app-nav a {
  position: relative;
  color: #000;
  font-size: 22px;
  text-shadow: 2px 2px 3px var(--rgb-secondary);
}
.app-nav a::before {
  position: absolute;
    bottom: -7px;
  content: '';
  background-color: var(--rgb-primary);
  width: 0;
  height: 2px;
  transition: 0.25s;
}
.app-nav a:hover::before {
  width: 100%;
}
.app-nav a.router-link-active {
  color: var(--rgb-primary);
}
</style>