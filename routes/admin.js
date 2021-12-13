const {
    v4
} = require('uuid')
const {
    onlyAdmins
} = require('../helpers/onlyAdmins')
const {
    myQuery,
    query
} = require("../database/config");

const router = require('express').Router()

router.use(onlyAdmins)




router.get("/reports", async (req, res) => {
    try {
        const report = await myQuery(`SELECT v.title ,COUNT(vacID) AS totalFollows FROM followers AS f INNER JOIN vacations AS v ON f.vacID = v.id GROUP BY vacID`);
        const chardData = {
            labels: report.map(a => a.title),
            values: report.map(a => a.totalFollows)
        }
        res.send(chardData);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router
