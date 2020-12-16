const mysql2 = require('mysql2');
const connection = mysql2.createConnection({
  host: "localhost", // db가 위차한 host(ip 주소)
  port: "3306", // db에 접근할 수 있는 port
  user: 'root', // database user
  password: 'admin1234', // user pwd 
  database: 'bus_safe' // db이름
})

module.exports = connection;