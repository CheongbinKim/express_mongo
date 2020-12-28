var express = require('express');
var router = express.Router();
const moment = require("moment");
const numeral = require("numeral");

const Sample = require("../models/Sample");

/* GET home page. */
router.get('/',async(req, res, next)=> {
  if(req.isAuthenticated()){
    var datas = [];
    var title = 'Sample'
    var kind = 'index';

    var page = req.query.page;
    
    switch(page){
      case "samplelist":
          title = 'Sample List';
          kind = 'sample';
          datas = await Sample.find({}).sort({end_at:'desc'});
        break;
    }
    
    res.render('index', { numeral,moment, title: title , user:req.user, page:req.query.page, datas:datas, kind:kind});
  }else{
    res.redirect('/auth/login');
  }
});

module.exports = router;