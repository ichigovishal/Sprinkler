import axois from 'axios'

export default axois.create({
      baseURL: 'http://test.yadavshome.xyz/api/',
      headers:{
            Authorization: 'Add token here'
      }
      
})