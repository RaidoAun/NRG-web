<template>
  <div class="Parkimine">
    <div class="container-fluid">
        <div class="row">
            <div class="col-8 offset-1">
                <b-button :variant="addCarButtonClass"  @click="toggleInputForm()">{{addCarButtonText}}</b-button>
                <InputForm v-show="showinputfields" @inputform-output="sendNewCarDataToServer"></InputForm>
            </div>
        </div>
    </div>
    <ParkingTable ref="parkingTable"/>
  </div>
</template>
<script>
//import Button from '@/components/Button.vue'
import InputForm from '@/components/InputForm.vue'
import ParkingTable from '@/components/ParkingTable.vue'

import ParkingRequests from  '@/requests/ParkingRequests.js'

export default {
  components: { 
    ParkingTable, 
    InputForm,
    },
    data:()=>{
    return {
      showinputfields: false,
      addCarButtonClass: "primary",
      addCarButtonText: "Lisa auto"
    }
  },
    methods: {
    toggleInputForm(){
      this.showinputfields = !this.showinputfields
      this.addCarButtonClass = this.showinputfields ? "danger": "primary"
      this.addCarButtonText = this.showinputfields ? "Peida" : "Lisa auto"
    },
    sendNewCarDataToServer(data){
      data.user_id = this.$session.get('user').id
      ParkingRequests.putCarData(data)
      this.$refs.parkingTable.getTableData()
    }
  },
  mounted(){

  }
}
</script>