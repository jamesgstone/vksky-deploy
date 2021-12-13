const { myQuery, query } = require("../database/config");
const { onlyUsers } = require("../helpers/onlyusers");

const router = require("express").Router();

// open only to users
router.get("/", onlyUsers, async (req, res) => {
    try {
        const follows = await myQuery(`SELECT * FROM followers where userID = ${req.session.user.id}`);
        res.send(follows);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router