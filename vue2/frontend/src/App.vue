<template>
  <div id="app">
    <div id="nav" v-if="this.user">
      {{this.user.first_name + " " + this.user.last_name}} <br>
      <router-link to="/" >Home</router-link> |
      <router-link to="/parkimine">Parkimine</router-link> |
      <router-link to="/päevik">Päevik</router-link>
    </div>
    <router-view @user-changed = "onUserChange"/>
  </div>
</template>

<script>
//{{this.user.first_name + " " + this.user.last_name}}
import UsersRequests from  '@/requests/UsersRequests.js'
export default {
  data: ()=>{
    return {
      user: {}
    }
  },
  methods: {
    onUserChange(){
      this.user = this.$session.get('user')
    }
  },
  async mounted(){
    this.$session.start()
    this.$session.set('user', await UsersRequests.getUserById(2))
    this.user = this.$session.get('user')
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
