import axios from 'axios'

export default{
    async getData(user) {
      let data
      await axios.get('/api/parking', {params:{id:user.id}})
      .then((response) => {
        data = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      return data
    },
    putCarData(data){
      axios.put('/api/parking/addrow', data)
      .catch((error) => {
        console.log(error)
      })
    },
    deleteRowById(row_id,user_id){
      axios.put('/api/parking/deleterow', {row_id:row_id,user_id:user_id})
      .catch((error) => {
        console.log(error)
      })
    },
    editRowByid(id){
      axios.put('/api/parking/editrow', {id:id})
      .catch((error) => {
        console.log(error)
      })
    }
}

