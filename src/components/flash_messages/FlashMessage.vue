<script setup lang="ts">
import type { FlashMessage } from '@/types'

defineProps<{
  flashMessage: FlashMessage
}>()
</script>

<template>
  <div class="flash-message" :class="{ 
    primary: flashMessage.color === 'primary',
    success: flashMessage.color === 'success',
    danger: flashMessage.color === 'danger',
    warning: flashMessage.color === 'warning',
    info: flashMessage.color === 'info',
  }">
    <p>{{ flashMessage.message }}</p>
    <span class="flash-message__timer"></span>
  </div>
</template>

<style>
.flash-message {
  position: relative;

  border-radius: 5px;
  box-shadow: 1px 2px 3px 1px var(--secondary);
  font-size: 24px;
  padding: 0px 20px;
  text-align: center;

  animation: flash-message-appear 1s ease-out 0s 1 normal forwards,
             flash-message-disappear 1s ease-in-out 3s 1 normal forwards;
}

.flash-message__timer {
  position: absolute;
    bottom: 0;
    left: 0;
  background-color: black;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 5px;
  animation: flash-message-timer 3s linear 0s 1 normal forwards;
}

.primary { background-color: var(--primary); }
.secondary {  background-color: var(--secondary); }
.success { background-color: var(--success); }
.danger {  background-color: var(--danger); }
.warning { background-color: var(--warning); }
.info { background-color: var(--info); }

@keyframes flash-message-appear {
  from {
    right: -500px;
  }
  to {
    right: 50px;
  }
}

@keyframes flash-message-disappear {
  20% {
    right: 75px;
  }
  to {
    right: -500px;
  }
}

@keyframes flash-message-timer {
  from {
    right: 0;
  }
  to {
    right: 100%;
  }
}

</style>