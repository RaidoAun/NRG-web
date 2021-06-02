<template>
    <div class="Table">
        <b-table striped hover :items="items" :fields="fields" :bordered="true"></b-table>
    </div>
</template>
<script>
import ParkingRequests from  '@/requests/ParkingRequests.js'
export default {

    props:{
    },

    data:()=> {
      return {
        fields: [
            {
              key:'car_number',
              label: 'Number',
              sortable: true
            },
            {
              key:'validated',
              label:'Staatus',
              sortable: true

            }
          ],
          items: []//[{ car_number: '112aaa', validated:'kinnitamata'}]
          
      }
    },
    methods: {
     async getCarData(){
       this.items = []
       let a = await ParkingRequests.getData()
       console.log(a)
      }
    },
    mounted(){
      this.getCarData()
    }

}
</script>