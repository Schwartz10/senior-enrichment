const router = require('express').Router();
const { Campus } = require('../../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(err => next(err));
});

router.get('/:campusId', (req, res, next) => {
  Campus.findOne({where: { id: req.params.campusId}})
  .then(campus => res.json(campus))
  .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Campus.create(req.body)
  .then(student => res.json(student))
  .catch(err => console.error(err));
});
