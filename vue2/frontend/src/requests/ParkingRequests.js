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
    async putCarData(data){
      await axios.put('/api/parking/addrow', data)
      .catch((error) => {
        console.log(error)
      })
    },
    async deleteRowById(row_id,user_id){
      await axios.put('/api/parking/deleterow', {row_id:row_id,user_id:user_id})
      .catch((error) => {
        console.log(error)
      })
    },
    async editRowByid(id){
      await axios.put('/api/parking/editrow', {id:id})
      .catch((error) => {
        console.log(error)
      })
    }
}

