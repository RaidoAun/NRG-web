<template>
  <div class="profile">
    <div class="container-fluid">
        <div class="row">
            <div class="col-8 offset-1">
                <h2>Autod</h2>
                <Button :text=addCarButtonText :btnclass = addCarButtonClass @button-click="toggleInputForm"></Button>
                <InputForm v-show="showinputfields" @inputform-output="sendNewCarDataToServer"></InputForm>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import Button from '@/components/Button.vue'
import InputForm from '@/components/InputForm.vue'
export default {
  components:{
    Button,
    InputForm
  },
  data(){
    return {
      showinputfields: false,
      addCarButtonClass: "btn btn-primary",
      addCarButtonText: "Lisa auto"
    }
  },
  methods:{
    toggleInputForm(){


      this.showinputfields = !this.showinputfields
      this.addCarButtonClass = this.showinputfields ? "btn btn-danger": "btn btn-primary"
      this.addCarButtonText = this.showinputfields ? "Peida" : "Lisa auto"

    },
    sendNewCarDataToServer(text){
      console.log(text)
    }
  }
}
</script>