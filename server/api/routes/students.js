const router = require('express').Router();
const { Student } = require('../../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Student.findAll({include: [{ all: true }]})
  .then(students => res.json(students))
  .catch(err => next(err));
});

router.get('/:studentId', (req, res, next) => {
  Student.findOne(
    {where: { id: req.params.studentId},
      include: [{ all: true }]
    })
  .then(student => res.json(student))
  .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Student.create(req.body)
  .then(student => res.json(student))
  .catch(err => console.error(err));
});

router.put('/:studentId', (req, res, next) => {
  Student.update(req.body,
    {where: { id: req.params.studentId},
  })
  .then(student => res.json(student))
  .catch(err => next(err));
});

router.delete('/:studentId', (req, res, next) => {
  Student.destroy({where: {id: req.params.studentId}})
  .then(numAffectedRows => res.json(numAffectedRows))
  .catch(err => console.error(err))
})

// Still need to figure out selection UI and why rows won't highlight

