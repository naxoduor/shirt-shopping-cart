const axios = require('axios')
const oauth = require('../endpoints/oauth')
const reqq = async function (_baseURL = 'https://sandbox.safaricom.co.ke') {
const credentials = await oauth()
console.log(credentials.data)
console.log(credentials.data['access_token'])
const instance = axios.create({
    baseURL: _baseURL || this.baseURL,
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer ' + credentials.data['access_token'],
        'Content-Type': 'application/json'
    }
})
return instance    
}
export default reqq;
