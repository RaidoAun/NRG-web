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
      this.axios.post('/api/messages', message)
      this.getData()
    },
    getData(){
      this.axios.get('/api/messages')
          .then((response) => {
            // handle
            //console.log(response)
            this.messages = response.data
            //this.$set(this.result, response.data, response.data)

          })
          .catch((error) => {
            // handle error
            console.log(error)
          })

    }
  },
  data(){
      return {
          messages: [],
          result: []
      }
  },
  mounted() {
      this.getData();

  },
}
</script>