const express = require('express');
const meetingsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
  } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
    //no request body is necessary. Use creatMeeting
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});


module.exports = meetingsRouter;
