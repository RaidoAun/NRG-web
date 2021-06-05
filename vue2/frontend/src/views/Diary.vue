<template>
    <div class="mainDiv">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card mt-5" v-if="!isAdmin">
                        <div class="card-header bg-info">
                            <h1 class="text-center text-dark text-uppercase font-italic">
                                NRG Ühiselamu päevik
                            </h1>
                        </div>
                        <div class="card-body">
                            <form class="form-inline">
                                <div class="row p-1">
                                    <div class="dropdown">
                                        <div class="col">
                                            <label class="font-italic">Tegevus: </label>
                                        </div>
                                        <div class="col">
                                            <select v-model="dataToSend.reason"
                                                    class="inputField btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                                                    name="tegevus">
                                                <option value="" selected disabled>Vali</option>
                                                <option v-for="option in tegevused" :key="option.value">
                                                    {{ option.text }}
                                                </option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="inputDiv">
                                        <div class="col">
                                            <label class="inputTxt font-italic">Algus: </label>
                                        </div>
                                        <div class="col">
                                            <input v-model="dataToSend.start" type="datetime-local" name="algus">
                                        </div>
                                    </div>
                                    <div class="inputDiv">
                                        <div class="col">
                                            <label class="inputTxt font-italic">Märkus: </label>
                                        </div>
                                        <div class="col">
                                            <input v-model="dataToSend.notes" class="inputField " name="markus"
                                                type="text"/>
                                        </div>
                                    </div>
                                    <div class="row p-4 text-right">
                                        <button type='button' class="btn btn-primary" @click="sendData">Esita</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <b-col lg="6" class="my-1">
                        <b-input-group size="sm">
                          <b-form-input
                            id="filter-input"
                            v-model="filter"
                            type="search"
                            placeholder="Type to Search"
                          ></b-form-input>
                        </b-input-group>
                      </b-col>
                      <b-table striped hover :items="result" :fields="userfields" :filter="filter">
                        <template #cell(end)="row">
                          {{row.item.end}}
                          <b-button @click="editMode = row.item.id" variant="primary" v-if="(row.item.end == '') && editMode===0">Lõpeta</b-button>
                          <td v-if="editMode === row.item.id">
                              <div class="form-row">
                                  <input v-model="end" type="datetime-local" name="Lõpp">
                              </div>
                              <button type='button' class="btn btn-primary" @click="editRecord(row.item.id)"  name="Lõpeta">Lõpeta</button>
                          </td>
                        </template>
                      </b-table>
                    </div>
                    <div class="card mt-5" v-if="isAdmin">
                        <div class="card-header bg-info">
                            <h1 class="text-center text-dark text-uppercase font-italic">
                                NRG Ühiselamu päevik
                            </h1>
                        </div>
                      <b-col lg="6" class="my-1">
                        <b-input-group size="sm">
                          <b-form-input
                            id="filter-input"
                            v-model="filter"
                            type="search"
                            placeholder="Type to Search"
                          ></b-form-input>
                        </b-input-group>
                      </b-col>
                      <b-table striped hover :items="result" :fields="adminfields" :filter="filter">
                      </b-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import moment from 'moment'
export default {
  components: {
      //Button
  },
  data:()=> {
  return {
    tegevused: [
      {value: 'eemal', text: 'Ühikast eemal'},
      {value: 'haige', text: 'Haige'},
      {value: 'nv', text: 'Nädalavahetusel ühikas'}
    ],
    dataToSend: {
      reason: '',
      start: null,
      notes: '',
    },
    result: [],
    user: '',
    editMode: 0,
    end: null,
    filter:'',
    adminfields: 
    [
      {
        key:'id',
        label: 'id',
        sortable: true
      },
      {
        key:'first_name',
        label: 'Eesnimi',
        sortable: true
      },
      {
        key:'last_name',
        label:'Perekonnanimi',
        sortable: true
      },
      {
        key:'room_nr',
        label:'Toa number',
        sortable: true
      },
      {
        key:'reason',
        label:'Põhjus',
        sortable: true
      },
      {
        key:'start',
        label:'Algus',
        sortable: true
      },
      {
        key:'end',
        label:'Lõpp',
        sortable: true
      },
      {
        key:'notes',
        label:'Märkus',
        sortable: true
      }
    ],
    userfields:
    [
      {
        key:'reason',
        label:'Põhjus',
        sortable: true
      },
      {
        key:'start',
        label:'Algus',
        sortable: true
      },
      {
        key:'notes',
        label:'Märkus',
        sortable: true
      },
      {
        key:'end',
        label:'Lõpp',
        sortable: true
      }
    ]
    }
  },
  computed: {
    items: function () {
      return this.result
    },
    isAdmin: function () {
      return this.user && this.user.is_admin === 1 //MUUTSIN JUBA ÄRA peaks toimima
    },
    reasonLenght: function () {
      return this.dataToSend.reason !== ''
    },
    startLenght: function () {
      return this.dataToSend.start !== null
    },
    notesLenght: function () {
      return this.dataToSend.notes.length > 1
    },
    isDataValid: function () {
      return ![this.reasonLenght, this.startLenght, this.notesLenght].some(i => !i)
    },
    isEndValid: function () {
      return this.end !== null
    }
  },
  mounted() {
    this.user = this.$session.get('user')
    this.getData();
  },
  methods: {

    sendData: async function () {
      if (this.isDataValid){
        this.dataToSend.user_id = this.user.id
        await axios.post('/api/record', this.dataToSend)
          .then(function () {
          })
        this.getData()
      }
      else {
        alert('Please fill all the fields')
      }

    },
    getData: function () {
      axios.get('/api/record', {params:{id:this.user.id}})
        .then((response) => {
          let data = response.data
          for (let index = 0; index < data.length; index++) {
            data[index].start = this.formatDate(data[index].start)
            data[index].end = this.formatDate(data[index].end)
          }
          this.$set(this, 'result', data)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
          console.log('what ever', Object.keys(error));
          console.log('what ever', error.response.status);
        })

    },
    editRecord: function (id) {
      if (this.isEndValid){
        axios.put('/api/record/' + id, {end: this.end})
          .then(() => {
            this.$set(this, 'editMode', 0)
            this.getData()
          })
      }
      else{
        alert('Please insert correct Date and Time ')
      }
    },
    formatDate(date){
      if (!date){
        return ""
      }
      return moment(date).format('HH:mm, ddd  DD MMM YYYY')
    }
  }
}
</script>
