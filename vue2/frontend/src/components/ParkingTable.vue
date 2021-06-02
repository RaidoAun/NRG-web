<template>
    <div class="Table">
        <b-table striped hover :items="items" :fields="fields">
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(validation_status)="row" v-if="is_admin">
            <b-button variant = "danger" size="sm" @click="deleteRow(row)">Kustuta</b-button>
            <b-button variant = "success" size="sm" @click="editRow(row)" v-if="row.item[row.field.key] === 'kinnitamata' ? 'false' : 'true' === true">Kinnita</b-button>
          </template>
        </b-table>
    </div>
</template>
<script>
import ParkingRequests from  '@/requests/ParkingRequests.js'
import UsersRequests from  '@/requests/UsersRequests.js'
export default {

    props:{
      user:Object
    },

    data:()=> {
      return {
        fields: [],
        items: [],
        is_admin: false
      }
    },
    methods: {
      deleteRow(row){
        ParkingRequests.deleteRowById(row.item.id)
        this.getTableData()
      },
      editRow(row){
        ParkingRequests.editRowByid(row.item.id)
        this.getTableData()
      },
      async getTableData(){
        let data = await ParkingRequests.getData(this.user)
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.validation_status === 0){
            element._rowVariant = 'danger'
            element.validation_status = "kinnitamata"
          }
          if (element.validation_status === 1){
            element.validation_status = "kinnitatud"
            element._rowVariant = 'success'
          }
        }
        this.items = data
        },
      async init(){
        let user = await UsersRequests.getUser(this.user)
        if (user===undefined) return
        if (user.is_admin === 0){
          this.is_admin = false
          this.fields = [
            {
              key:'index',
              label: '',
              sortable: false
            },
            {
              key:'car_nr',
              label: 'Number',
              sortable: true
            },
            {
              key:'validation_status',
              label:'Staatus',
              sortable: true
            }
          ]
        }
        if (user.is_admin ===1){
          this.is_admin = true
          this.fields = [
            {
              key:'index',
              label: '',
              sortable: true
            },
            {
              key:'first_name',
              label: 'Eesnimi',
              sortable: true
            },
            {
              key:'last_name',
              label: 'Perenimi',
              sortable: true
            },
            {
              key:'car_nr',
              label: 'Number',
              sortable: true
            },
            {
              key:'validation_status',
              label:'Staatus',
              sortable: true
            }
          ]
        }
      }
    },
    mounted(){
      this.init()
      this.getTableData()
    }

}
</script>