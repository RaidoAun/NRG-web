import axios from 'axios'

export default{
    async getUserById(user_id) {
      let data
      await axios.get('/api/users', {params:{id:user_id}})
      .then((response) => {
        data = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      return data
    }
}

