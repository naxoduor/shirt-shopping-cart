const express=require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
var cors = require('cors');
const cheerio = require('cheerio');
const request = require('request');


const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.post(`/api/form`, (req,res) => {

    let products="good"
    let secstring="";
    console.log(`Server listening on port`)


    const htmlEmail=`
  
    <h3>Details</h3>
    <ul>
        <li>name:${req.body.order.firstName}</li>
        <li>Email:${req.body.order.email}</li>
    </ul>
    <h3>Message</h3> 
    <h4></h4>
    <p id="nice">
    </p>
    `
    console.log("found cheerio")
    var $ = cheerio.load(htmlEmail);
   $('#nice').each(function(){
       console.log("found element")
   })
   
    req.body.order.order_items_attributes.map(item=>{
        console.log(item.qty)
        $('#nice').append(item.pname.toString()).append(":").append(item.qty.toString()).append("   ");
     })

     let newhtml=$.html()


    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'naxoduor7@gmail.com',
            pass: 'Maradonabingwa86'
        }
    })

    const mailOptions = {
        from: 'naxoduor7@gmail.com',
        to: req.body.order.email,
        subject: 'Products purchased',
        html: newhtml
    };

    transporter.sendMail(mailOptions, function (err, info){
        if(err)
        console.log(err)
        else
        console.log(info)
    })
})

app.get(`/api/form`, (req,res) => {
    console.log("trying get request")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)

})
