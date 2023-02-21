const express = require('express');
const minionsRouter = express.Router();
const bodyParser = require('body-parser');
minionsRouter.use(bodyParser.json());


const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
  } = require('./db');//require only the necessary functions
  
minionsRouter.param('miniondId', (req,res,next,id) =>{
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;//set for get
        next();
    } else {
        res.status(404).send('Minion not found!');
    }
  });

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

minionsRouter.get('/:miniondId', (req, res, next) => {
    res.send(req.minion);//minion already brought back from database in param checking
});

minionsRouter.put('/:miniondId', (req, res, next) => {
    //send updated info in the request body
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

minionsRouter.post('/', (req, res, next) => {
    //send new info in the request body.
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.delete('/:miniondId', (req, res, next) => {
    res.status(204).send(deleteFromDatabasebyId('minions', req.params.miniondId));
});

//work functions
minionsRouter.param('minionId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        next();
    } else {
        res.status(404).send('work not found');
    }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(workLoad => {
        return workLoad.id === req.params.minionId;
    });
    res.send(work);
})

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = req.body;
    if(!newWork){
        res.status(400).send();
    } else {
        addToDatabase('work', req.body);
        res.status(201).send(newWork);
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        updateWork = updateInstanceInDatabase('work', req.body);
        res.send(updateWork);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    res.status(204).send(deleteFromDatabasebyId('work', req.params.workId));
});

module.exports = minionsRouter;