const express = require('express');
const router = express.Router();
const helper = require('../../helpers/helper');
const Cate = require('../../models/Cate');
router.get('/',(req,res)=>{
    Cate.find().then((result)=>{
        res.render('admin/cate/listCate',{data:result});
    }).catch((err)=>{
        res.render('admin/cate/listCate',{data:{err:'Lỗi load danh sách danh mục'}});
    });
    
});

router.get('/add',checkAdmin,(req,res)=>{
    res.render('admin/cate/addCate',{data:""});
});

router.post('/add',checkAdmin,function(req,res){
    let params = req.body;
    if(params){
      if(params.nameCate.trim().length == ""||params.decription==""){
        res.render('admin/cate/addCate',{data:{error:'Chưa nhập tên hoặc miêu tả cho danh mục.'}});
      }
      else{
        let now = new Date();
        let data = {
            nameCate:params.nameCate,
            nameCateUnbind:helper.unbind(params.nameCate),
            createdAt: now,
            updatedAt:now,
            decription:params.decription
        }
        Cate(data).save().then(function(result){
            console.log(result);
            res.redirect('/admin/cate');
        }).catch(function(err){
          res.render('admin/cate/addCate',{data:{error:'Lỗi thêm sinh viên'}});
        });
      };
      }
  });
  function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/login');
    }
}
module.exports = router;