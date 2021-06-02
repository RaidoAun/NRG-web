import axios from 'axios'

export default{
    async getUser(user) {
      let data
      await axios.get('/api/users', {params:{id:user.id}})
      .then((response) => {
        data = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      return data
    }
}

