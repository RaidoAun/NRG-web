<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <button disabled="disabled" :class= pesuPesemine.class>{{pesuPesemine.text}} </button>
  </div>
  <router-view/>
</template>

<script>
export default {
    props:{
        pesupesemineBool: Boolean
    },
    data(){
        return{
            pesuPesemineButtonClass: "btn btn-primary"
        }
    },
    computed: {
        pesuPesemine(){
            console.log(this.pesupesemineBool)
            let out = {}
            if (this.pesupesemineBool == true){
                out.class = "btn btn-primary"
                out.text = "pesemine saadaval"
            }
            else{
                out.class = "btn btn-danger"
                out.text = "pesemine kinni"
            }
            console.log(out)
            return out
        }
    }
}
</script>