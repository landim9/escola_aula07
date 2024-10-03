const express = require('express');

const router = express.Router();

const Professor = require('./controllers/professor');
const Atividade = require('./controllers/atividade');
const Turma = require('./controllers/turma');

router.get('/', (req, res) => {
    res.send('Hello World').end();
});

router.post('/login', Professor.login);
router.post('/professor', Professor.create);
router.get('/professor', Professor.read);
router.get('/professor/:id', Professor.read);
router.put('/professor/:id', Professor.update)
router.delete('/professor/:id', Professor.deleta)

router.get('/atividade', Atividade.readAtividades);
router.get('/atividade/:id', Atividade.readAtividades);
router.post('/atividade', Atividade.createAtividade);
router.put('/atividade/:id',  Atividade.updateAtividade);
router.delete('/atividade/:id',  Atividade.deleteAtividade);

router.get('/turma', Turma.readTurmas);
router.get('/turma/:id', Turma.readTurmasProf);
router.get('/turmas/:id', Turma.readTurmasAtiv);
router.post('/turma', Turma.createTurma);
router.put('/turma/:id',  Turma.updateTurma);
router.delete('/turma/:id',  Turma.deleteTurma);

module.exports = router 