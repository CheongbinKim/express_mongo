var express = require('express');
var router = express.Router();

const Model = require("../../models/Sample");

var moment = require('moment');

router.post('/add', function (req, res, next) {
    var params = req.body;
    try {
        var model = new Model(params);
        model.save();
    } catch (e) {
        console.log(e);
    } finally {
        res.redirect('/?page=samplelist');
    }
});

router.delete('/delete/:id',async(req,res,next)=>{
    const result = await Model.remove({_id:req.params.id},{single:true});
    res.json(result.deletedCount);
});

module.exports = router;