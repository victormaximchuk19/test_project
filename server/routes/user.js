const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/users_controller');

router.post('/sign-up', async (req, res) => {
  let response = await usersController.signUp(req.body);
  res.send(response);
});

router.get('/', async (req, res) => {
  let response = await usersController.index();
  res.send(response);
});

router.post('/sign-in', async (req, res) => {
  let response = await usersController.signIn(req.body);
  res.send(response);
})

router.put('/edit/:id', async (req, res) => {
  console.log(req.body)
  let response = await usersController.updateUser(req.params.id, req.body);
  res.send(response);
})

router.delete('/:id', async (req, res) => {
  let response = await usersController.deleteUser(req.params.id);
  res.send(response);
})

router.get('/user-data/:id', async (req, res) => {
  let response = await usersController.userData(req.params.id);
  res.send(response);
})

module.exports = router;