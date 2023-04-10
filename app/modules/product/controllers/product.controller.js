const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const categoryRepo=require("category/repositories/category.repository");
const subCategoryRepo=require("subCategory/repositories/subCategory.repository");
const productRepo=require("product/repositories/product.repository");
const fs=require('fs');
class productController {
  constructor() { }

  /* @Method: list
  // @Description: View for all the product from DB
  */
  async list(req, res) {
    try {
      res.render("product/views/list.ejs", {
        page_name: "product-management",
        page_title: "product-Management",
        user: req.user
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  };

  /*
  // @Method: create
  // @Description:  Category create page
  */
   async create(req,res){
    try{
      const cateData=await categoryRepo.getAllByField({status:'Active',isDeleted:'false'});
      res.render("product/views/add.ejs", {
        page_name: "product-management",
        page_title: "product-Management",
        user: req.user,
        category:cateData,
      });
    }catch(err){
      throw err
    }
   }


   /**
    * 
    * @method:dataFetch 
    * @description:method fetch the subcategory type
    */
   async dataFetch(req,res){
      try{
          let data=await subCategoryRepo.getAllByField({categoryType:req.query.id,status:'Active',isDeleted:'false'});
          res.send({
            response:data,
            info:req.query.mainId
          })
      }catch(err){
        throw err
      }
   }
  /*
  // @Method: insert
  // @Description:  Insert faq into DB
  */
  async insert(req, res) {
    try {
      req.files.map((val)=>{
        req.body.productImg=val.filename;
      })
      let checkData=await productRepo.getByField({categoryType:req.body.categoryType,subCategory:req.body.subCategory,product:req.body,product:req.body.product,isDeleted:'false',});
      if (_.isEmpty(checkData)) {
      let saveCategory = await productRepo.save(req.body);
      req.flash("success", "product  added successfully.");
      res.redirect(namedRouter.urlFor("product.list"));
      }
      else{
        req.flash("error", "This Product already exists");
        res.redirect(namedRouter.urlFor("product.create"));
      }
    }
     catch (e) {      
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("product.create"));
    }
  };

  /* @Method: update
  // @Description: product update action
  */
  async update(req, res) {
  
    try { 
      let mtInfo = await productRepo.getById(req.body.id);
      const bodyId = req.body.id;
      if(req.files){
        req.files.map((val)=>{
          req.body.productImg=val.filename;
          fs.unlinkSync(`./public/uploads/productImg/${mtInfo.productImg}`);
        })
      }
     
      let coupon = await productRepo.getByField({categoryType:req.body.categoryType,subCategory:req.body.subCategory,product:req.body.product,isDeleted:'false',
      _id: {
        $ne: bodyId
    }
        }); 
      if (_.isEmpty(coupon)){
        // console.log(req.body);
      let Update = await productRepo.updateById(bodyId, req.body);
      if (Update) {
        req.flash("success", "product Updated Successfully");
        res.redirect(namedRouter.urlFor("product.list"));
      } else {
        res.redirect(
          namedRouter.urlFor("product.edit", {
            id: bodyId
          })
        );
      }
    }else{
      req.flash("error", "product Already exists");
      res.redirect(
        namedRouter.urlFor("product.edit", {
          id: bodyId
        })
      );
    }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("product.edit", {
        id:req.body.id
      }));
    }
  };

  /* @Method: getAll
  // @Description: To get all the faq from DB
  */
  async getAll(req, res) {
    try {
      
      let faqData = await productRepo.getAll(req);
      
      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: faqData.pages,
        perpage: req.body.pagination.perpage,
        total: faqData.total,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: faqData.docs,
        message: `Data fetched successfully.`,
      };
    } catch (e) {
      throw e;
    }
  };

  /*
  // @Method: edit
  // @Description:  product edit page
  */
  async edit(req, res) {
    try {
      const cateData=await categoryRepo.getAllByField({status:'Active',isDeleted:'false'});
      
      let mtInfo = await productRepo.getById(req.params.id);
      // console.log(JSON.stringify(mtInfo.categoryType));
      let subCat=await subCategoryRepo.getAllByField({categoryType:mtInfo.categoryType});
      // console.log(subCat);
      if (!_.isEmpty(mtInfo)) {
        res.render("product/views/edit.ejs", {
          page_name: "product-management",
          page_title: "product Edit",
          user: req.user,
          response: mtInfo,
          category:cateData,
          subCategory:subCat
          
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("faq.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  };

  /* @Method: delete
  // @Description: product delete action
  */
  async delete(req, res) {
    try {

      let mtDelete = await productRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "product removed successfully");
      res.redirect(namedRouter.urlFor("product.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  };

  /*
  // @Method: statusChange
  // @Description: product  status change action
  */
  async statusChange(req, res) {
    try {
      let Info = await productRepo.getById(req.params.id);

      if (!_.isEmpty(Info)) {
        let categoryStatus =
          Info.status == "Active" ? "Inactive" : "Active";
        let categoryStatusUpdate = productRepo.updateById(req.params.id, {
          status: categoryStatus,
        });

        req.flash("success", "product status has changed successfully");
        res.redirect(namedRouter.urlFor("product.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  };

};

module.exports = new productController();