<script setup lang="ts">
import FlashMessageComponent from './FlashMessage.vue';

import { useFlashMessageStore } from '@/stores/flashMessage.js'
import { storeToRefs } from 'pinia'

const flashMessageStore = useFlashMessageStore()
const { flashMessages } = storeToRefs(flashMessageStore)
</script>

<template>
  <section class="flash-messages">
      <FlashMessageComponent v-for="flashMessage in flashMessages" 
        :key="flashMessage.flash_message_id" :flashMessage="flashMessage" />
    </section>
</template>

<style>
.flash-messages {
  position: fixed;
    bottom: 25px;
    right: 0;

  display: flex;
    flex-direction: column;
    gap: 20px;
  
  z-index: 2;
}
</style>