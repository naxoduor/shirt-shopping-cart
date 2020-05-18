const axios = require('axios')
const oa = function (consumerKey = '', consumerSecret = '', baseURL = 'https://sandbox.safaricom.co.ke') {
const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64')
console.log(auth)
console.log(baseURL)
return axios.get((baseURL || this.baseURL) + '/oauth/v1/generate?grant_type=client_credentials', {
headers: {
    'Authorization': 'Basic ' + auth,
    'content-type': 'application/json',
    'Origin': 'http://104.248.73.139'

}    
})    
}

export default oa;
