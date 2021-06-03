<template>
  <div class="home">

    <b-button variant = "success"  @click="peeterPaan()">Peeter Paan</b-button>
    <b-button variant="success"  @click="peetriIsa()">Peetri isa</b-button>
    <b-button variant="success"  @click="toomas()">Toomas Mahlane</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
//import Button from '@/components/Button.vue'

export default {
  props:{
    user: Object
  },
  components: {
    //Button
  },
  methods: {
    peeterPaan(){
      this.user.id = 1
    },
    peetriIsa(){
      this.user.id = 2
    },
    toomas(){
      this.user.id = 3
    }
  }
}
</script>
