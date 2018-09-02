const { Router } = require('express');
const pool = require('../db');
const _ = require('lodash');

const router = Router();

router.get('/monsters', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM monsters ORDER BY id ASC');
    res.send({rows});
  } catch (err) {
    res.status(400).send();
    // res.send(err);
  }
});

// router.get('/monsters/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { rows } = await pool.query('SELECT * FROM monsters WHERE id = $1)', [id]);
//     res.send(rows[0]);
//   } catch (err) {
//     res.status(400).send();
//   }
// });

router.get('/monsters/:id', async (req, res) => {
  try {
    let id = req.params.id;
    // this returns strings but still works.
    id = id.split(',');
    // reduce duplicate load on pg server.
    id = _.uniq(id);

    // verifies only integers in array.
    try {
      id.forEach(el => {
        if (!_.toInteger(_.toInteger(el))) {
          console.log(el);
          throw new Error;
        }
      });
    } catch (e) {
      return res.status(404).send();
    }

    const { rows } = await pool.query('SELECT * FROM monsters WHERE id = any ($1)', [id]);
    res.send({rows});
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;