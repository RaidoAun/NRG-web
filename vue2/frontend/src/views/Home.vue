<template>
  <div class="home">

    <b-button variant = "success"  @click="peeterPaan()">Peeter Paan</b-button>
    <b-button variant="success"  @click="peetriIsa()">Peetri isa</b-button>
    <b-button variant="success"  @click="toomas()">Toomas Mahlane</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import UsersRequests from  '@/requests/UsersRequests.js'
export default {
  
  components: {
    //Button
  },
  methods: {
    async peeterPaan(){
      this.$session.set('user',await UsersRequests.getUserById(1))
      this.$emit("user-changed")
    },
    async peetriIsa(){
      this.$session.set('user',await UsersRequests.getUserById(2))
      this.$emit("user-changed")
    },
    async toomas(){
      this.$session.set('user',await UsersRequests.getUserById(3))
      this.$emit("user-changed")
    }
  },
  data: ()=>{
    return {
    }
  },
  mounted(){

  },
  computed: {
  }
}
</script>
