const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vacayskey"

})
con.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log("J.A.R.V.I.S is Connected to DB 🎇")
    }
})


const myQuery = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
            
        })
    })
}
module.exports = { myQuery }