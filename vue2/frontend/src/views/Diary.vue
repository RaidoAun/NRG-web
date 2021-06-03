<template>
    <div class="mainDiv" id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand">{{user.firstName}} {{user.lastName}}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <button type="button" @click="logOut" class="btn btn-link">Log Out</button>
                    </li>
                </ul>
            </div>
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
                                                <option :v-for="option in tegevused" :value="option.value">
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
                        <table class="table table-responsive-sm table-sm table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Põhjus</th>
                                <th>Algus</th>

                                <th>Märkus</th>
                                <th>Lõpp</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="row in result" :key="row.id">
                                <td>{{row.id}}</td>
                                <td>{{row.reason}}</td>
                                <td>{{row.start | date}}</td>

                                <td>{{row.notes}}</td>
                                <td v-if="!row.end && !editMode">
                                    <button @click="editMode = row.id" type="submit">Lõpeta</button>
                                </td>
                                <td v-if="editMode === row.id">
                                    <div class="form-row">
                                        <input v-model="end" type="datetime-local" name="Lõpp">
                                    </div>
                                    <button type='button' class="btn btn-primary" @click="editRecord(row.id)"  name="Lõpeta">Lõpeta</button>
                                </td>
                                <td v-if="row.end">
                                    {{row.end | date}}
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card mt-5" v-if="isAdmin">
                        <div class="card-header bg-info">
                            <h1 class="text-center text-dark text-uppercase font-italic">
                                NRG Ühiselamu päevik
                            </h1>
                        </div>
                        <table class="table table-responsive-sm table-sm table-striped">
                            <thead>
                            <tr>
                                <th>Eesnimi</th>
                                <th>Perekonnanimi</th>
                                <th>Toa number</th>
                                <th>Põhjus</th>
                                <th>Algus</th>
                                <th>Lõpp</th>
                                <th>Märkus</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="row in result" :key="row.id">
                                <td>{{row.firstname}}</td>
                                <td>{{row.lastname}}</td>
                                <td>{{row.room_number}}</td>
                                <td>{{row.reason}}</td>
                                <td>{{row.start | date}}</td>
                                <td>{{row.end | date}}</td>
                                <td>{{row.notes}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props:{
        user: Object
    },
    components: {
        //Button
    },
    data:()=> {
    return {
      tegevused: [
        {value: '', text: 'Vali'},
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
      this.user = this.$session.get('user') //peaks andma useri ilusti
      console.log(this.user)
      this.getData();
      this.getUser();//VIST POLE VAJA ENAM?
    },
    methods: {
      //Võiks teha uue faili nt "DiaryRequests.js" ja ss need sinna panna? vaata ise, oleks cleanim

      sendData: function () {
        if (this.isDataValid){
          axios.post('/api/record', this.dataToSend)
            .then(function (result) {
              console.log(result)
              this.message = result
            })
        }
        else {
          alert('Please fill all the fields')
        }

      },
      getData: function () {
        axios.get('/api/record')
          .then((response) => {
            // handle

            //this.result = response.data
            this.$set(this, 'result', response.data)
            console.log(this.result);
          })
          .catch(function (error) {
            // handle error
            console.log('what ever', Object.keys(error));
            console.log('what ever', error.response.status);
            if (error.response.status === 401) {
              window.location.replace('http://localhost:3000/login.html')
            }
          })

      },
      getUser: function () {
        axios.get('/api/user')
          .then((result) => {
            this.$set(this, 'user', result.data)
          })
      },
      editRecord: function (id) {
        if (this.isEndValid){
          axios.put('/api/record/' + id, {end: this.end})
            .then((result) => {
              this.message = result
              this.$set(this, 'editMode', 0)
              this.getData()
            })
        }
        else{
          alert('Please insert correct Date and Time ')
        }
      },
      logOut: function () {
        axios.post('/api/logOut')
          .then(function (result) {
            if (result.status === 200) {
              window.location.replace('http://localhost:3000/login.html')
            }
          })
      }
    }
}
</script>
