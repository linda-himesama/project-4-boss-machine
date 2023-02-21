const checkMillionDollarIdea = (req, res, next) => {
    const totalRevenue = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);
    if (!req.body.numWeeks || !req.body.weeklyRevenue || isNaN(totalRevenue) || totalRevenue < 1000000) {
       res.status(400).send('Idea not worth a million dollars');
    } else {
       next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
