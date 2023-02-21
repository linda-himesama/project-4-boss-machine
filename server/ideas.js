const express = require('express');
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
  
ideasRouter.param('ideaId', (req,res,next,id) =>{
  const idea = getFromDatabaseById('ideas', id);
  if (!idea) {
    res.status(404).send('Idea not found!');
  } else {
    req.idea = idea;//set for get
    next();
  }
});

ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);//Idea already brought back from database in param checking
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  //send updated info in the request body
  const updateIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updateIdea);
});

ideasRouter.post('/',checkMillionDollarIdea, (req, res, next) => {
  //send new info in the request body.
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  res.status(204).send(deleteFromDatabasebyId('ideas', req.params.ideaId));
});


module.exports = ideasRouter;