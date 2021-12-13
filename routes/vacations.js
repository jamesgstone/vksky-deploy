const {
  myQuery,
  query
} = require("../database/config");
const {
  onlyUsers
} = require("../helpers/onlyusers");
const {
  onlyAdmins
} = require('../helpers/onlyAdmins')

const router = require("express").Router();

// open only to users
router.get("/", onlyUsers, async (req, res) => {
  try {
    const vacation = await myQuery("SELECT * FROM vacations");
    res.send(vacation);
  } catch (err) {
    console.log(err);
  }
});

// get single
router.get("/:vacationid", onlyUsers, async (req, res) => {
  try {
      const {
        vacationid
      } = req.params;
      const data = await myQuery(`SELECT * FROM vacations WHERE id = ${vacationid}`);
      res.send(data);
  } catch (err) {
      console.log(err);
  }
});


//search
router.get("/search/:searchQuery", onlyUsers, async (req, res) => {
  try {
      const {searchQuery} = req.params;
      const search = await myQuery(`SELECT * FROM vacations WHERE destination LIKE '%${searchQuery}%'`);
      console.log(searchQuery)
      res.send(search);
  } catch (err) {
      console.log(err);
  }
});

// open only to users
router.post("/follow/:vacationid", onlyUsers, async (req, res) => {
  try {
    const {
      vacationid
    } = req.params;
    console.log(req.session.user)
    const vacationTable = await myQuery(
      `SELECT * FROM vacations WHERE id = ${vacationid}`
    );
    if (!vacationTable) {
      return res.status(400).send({
        err: true,
        msg: "vacation wasn't found"
      });
    }
    await myQuery(
      `INSERT INTO followers (userID, vacID) VALUES ("${req.session.user.id}", ${vacationid})`
    );
    res.send({
      msg: "You are following the vacation, enjoy it"
    });
  } catch (err) {
    console.log(err);
  }
});

// open only to users
router.post("/unfollow/:id", onlyUsers, async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await myQuery(`DELETE FROM followers WHERE id = ${id}`);
    res.send({
      msg: "you can always follow the vacation again",
    });
  } catch (err) {
    console.log(err);
  }
});

// insert vacation
router.post('/', onlyAdmins, async (req, res) => {
  try {

      const {
          title,
          destination,
          description,
          imgUrl,
          startDate,
          endDate,
          price
      } = req.body

      if (!title || !destination || !description || !imgUrl || !startDate || !endDate || !price) {
          return res.status(400).send({
              err: true,
              msg: "missing some info"
          })
      }
      await myQuery(`INSERT INTO vacations (title, destination, description, imgUrl, startDate, endDate, price) values ("${title}", "${destination}", "${description}", "${imgUrl}", "${startDate}", "${endDate}", "${price}")`)

      res.send({
          msg: "vacation added successfully"
      })
  } catch (err) {
      console.log(err)

  }
})

router.post('/edit/:vacationID', onlyAdmins, async (req, res) => {
  try {
    const {
      vacationID
    } = req.params;
    const {
        title,
        destination,
        description,
        imgUrl,
        startDate,
        endDate,
        price
    } = req.body

    if (!title || !destination || !description || !imgUrl || !startDate || !endDate || !price) {
        return res.status(400).send({
            err: true,
            msg: "missing some info"
        })
    }
    await myQuery(`UPDATE vacations SET title = "${title}",  destination = "${destination}", description = "${description}", imgUrl = "${imgUrl}", startDate = "${startDate}", endDate = "${endDate}", price = "${price}" WHERE id = ${vacationID}`)

    res.send({
        msg: "vacation edited successfully"
    })
  } catch (err) {
      console.log(err)

  }
})

// remove vacation
router.delete('/:vacationID', onlyAdmins, async (req, res) => {
  try {
      const {
          vacationID
      } = req.params
      await myQuery(`DELETE FROM vacations WHERE id = ${vacationID}`)
      await myQuery(`DELETE FROM follows WHERE vacID = ${vacationID}`)
      res.send({
        msg: "vacation was deleted successfully"
      })
  } catch (error) {
      console.log(error);
  }
})

module.exports = router;