const request = require('../helpers/request')
export const c2bSimulate  = (msisdn, amount, billRefNumber, commandId = 'CustomerPayBillOnline', shortCode = '601426') => async dispatch =>{

    console.log(msisdn)
    console.log(amount)
    console.log(billRefNumber)
    const req = await request()
    return req.post('/mpesa/c2b/v1/simulate', {
        'ShortCode': shortCode,
        'CommandID': commandId,
        'Amount': amount,
        'Msisdn': msisdn,
        'BillRefNumber': billRefNumber
    }).then(res => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    });
}
