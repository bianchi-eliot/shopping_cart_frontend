import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FlashMessage } from '@/types'

export const useFlashMessageStore = defineStore('Flash Message', () => {

  const flashMessages = ref<FlashMessage[]>([])

  function addFlashMessage(message: string, color: string) {
    const flashMessage = { 
      flash_message_id: flashMessages.value.length + 1, 
      message, 
      color, 
    }
    flashMessages.value.push(flashMessage)
    setTimeout(() => removeFlashMessage(flashMessage.flash_message_id), 4000)
  }

  function removeFlashMessage(flashMessageId: number) {
    const index = flashMessages.value.findIndex(message => message.flash_message_id === flashMessageId)
    flashMessages.value.splice(index, 1)
  }

  return { flashMessages, addFlashMessage }
})
