<template>
  <div class="msgsgsgs">
      <MessageBoxIn @new-message-added = "addMessage"></MessageBoxIn>
      <MessageBoxOut :messages = "messages"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MessageBoxIn from '@/components/MessageBoxIn.vue'
import MessageBoxOut from '@/components/MessageBoxOut.vue'

export default {
  name: 'Messagespage',
  components: {
    MessageBoxIn,
    MessageBoxOut
  },
  methods:{
    addMessage(message){
        this.messages = [...this.messages, message]
    }
  },
  data(){
      return {
          messages: []
      }
  }
}
</script>