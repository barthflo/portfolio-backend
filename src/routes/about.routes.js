const db = require('../db_connection');
const router = require('express').Router();

router.get('/', (req, res) => {
  const sql = "SELECT * FROM about";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/with-pic', (req, res) => {
    const sql = "SELECT group_concat(a.id) AS id,group_concat(a.description) AS description ,p.name, p.alt FROM about a LEFT JOIN pictures p ON a.picture_id=p.id";
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send({errorMessage: err.message});
      } else {
        results.map(result => {
            if (result.id || result.description){
                result.id = result.id.split(',');
                result.description = result.description.split(',');
            }
            return result;
        })
        res.status(200).json(results);
      }
    });
  });

router.get('/:id', (req, res) => {
    const sql = "SELECT * FROM about WHERE id=?";
    db.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({errorMessage: err.message});
      } else {
        res.status(200).json(results);
      }
    });
  });

router.post('/', (req, res) => {
  const sql = "INSERT INTO about SET ?";
  db.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(201).json({id: results.insertId, ...req.body});
    }
  });
});

router.put('/:id', (req, res) => {
  let sql = "UPDATE about SET ? WHERE id=?";
  db.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      sql = "SELECT * FROM about WHERE id=?";
      db.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({errorMessage: `Admin with id ${req.params.id} not found`});
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM about WHERE id=?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;