import axios from 'axios'

export default{
    async getData() {
        let data
        await axios.get('/api/parking')
        .then((response) => {
          data = response.data
        })
        .catch((error) => {
          // handle error
          console.log(error)
        })
        console.log(data)
        return data
    }
}
