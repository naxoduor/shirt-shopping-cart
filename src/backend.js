const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
const url = require('url');
const querystring = require('querystring');
//const logger = require('morgan');


// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'shirts4'
});

// Initialize the app
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
})
)
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 8080);
connection.connect();

// https://expressjs.com/en/guide/routing.html
app.get('/products', function (request, response) {
  console.log("get products")
  let inDepartmentId = 1
  let inShortProductDescriptionLength= 45
  let inProductsPerPage = 8
  let inStartItem = 0
  let params={inDepartmentId: inDepartmentId, inShortProductDescriptionLength: inShortProductDescriptionLength, inProductsPerPage: inProductsPerPage, inStartItem: inStartItem}
  console.log(params)
   connection.query('call catalog_get_products_on_department(?, ?, ?, ?)', [params.inDepartmentId, params.inShortProductDescriptionLength, params.inProductsPerPage, params.inStartItem], function(err, results){
    if(err) throw err
    response.send(results[0])
  })
})

app.get('/departments', function (request, response){
  connection.query('call catalog_get_departments_list()', function(err, results){
    if(err) throw err
  response.send(results[0])
  })
})

app.get('/categories', function(request, response){
  connection.query('call catalog_get_categories()', function(err, results){
    if(err) throw err
    response.send(results[0])
  })
})

app.get('/categories/inDepartment/*', function(req, response){
  let parsedUrl = url.parse(req.url);
  let parsedQs = querystring.parse(parsedUrl.query)
  let inDepartmentId = parsedQs.id
  let params = {inDepartmentId:inDepartmentId}
  connection.query('call catalog_get_department_categories(?)', [params.inDepartmentId], function(err, results){
    if(err) throw err
    response.send(results[0])
  })
})

app.get('/products/inDepartment/*', function(req, response){
  let parsedUrl = url.parse(req.url);
  let parsedQs = querystring.parse(parsedUrl.query)
  let inDepartmentId = parsedQs.id
  let inShortProductDescriptionLength = 45;
  let inProductsPerPage = 8;
  let inStartItem = 0;
  let params = {inDepartmentId:inDepartmentId, inShortProductDescriptionLength:inShortProductDescriptionLength, inProductsPerPage:inProductsPerPage, inStartItem:inStartItem}
  connection.query('call catalog_get_products_on_department(?, ?, ?, ?)', [params.inDepartmentId, params.inShortProductDescriptionLength, params.inProductsPerPage, params.inStartItem], function(err, results){
    if(err) throw err
    response.send(results[0])
  })
})

app.get('/products/inCategory/*', function(req, response){
  let parsedUrl = url.parse(req.url);
  let parsedQs = querystring.parse(parsedUrl.query)
  let inCategorytId = parsedQs.id
  let inShortProductDescriptionLength = 45;
  let inProductsPerPage = 8;
  let inStartItem = 0;
  let params = {inCategorytId:inCategorytId, inShortProductDescriptionLength:inShortProductDescriptionLength, inProductsPerPage:inProductsPerPage, inStartItem:inStartItem}
  console.log(params)
  connection.query('call catalog_get_products_in_category(?, ?, ?, ?)', [params.inCategorytId, params.inShortProductDescriptionLength, params.inProductsPerPage, params.inStartItem], function(err, results){
    if(err) throw err
    response.send(results[0])
  })
})

app.listen(8080, () => {
  console.log('Go to http://localhost:8080/ to see posts');
});

