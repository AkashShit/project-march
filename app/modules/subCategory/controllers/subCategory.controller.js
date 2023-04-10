const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const subCategoryRepo=require("subCategory/repositories/subCategory.repository");
const categoryRepo=require('category/repositories/category.repository')
class subCategoryController {
  constructor() {
    
   }

  /* @Method: list
  // @Description: View for all the subCategory from DB
  */
  async listing(req, res) {
    try {
      res.render("subCategory/views/list.ejs", {
        page_name: "subCategory-management",
        page_title: "subCategory-management",
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
  // @Description:  subCategory create page
  */
   async create(req,res){
    try{
        let data=await categoryRepo.getAllByField({status:'Active',isDeleted:'false'});
        // console.log(data);
        res.render("subCategory/views/add.ejs", {
            page_name: "subCategory-management",
            page_title: "subCategory-management",
            user: req.user,
            response:data
          });
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
      let saveCategory = await subCategoryRepo.save(req.body);
      if(saveCategory)
     {
      req.flash("success", "SubCategory added successfully.");
      res.redirect(namedRouter.urlFor("subCategory.list"));
      }
      else{
        req.flash("error", "This sub-Category already exists");
        res.redirect(namedRouter.urlFor("subCategory.create"));
      }
     
    } catch (e) {      
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("subCategory.create"));
    }
  };

  /* @Method: update
  // @Description: faq update action
  */
  async update(req, res) {
    try {
   
      const categoryID = req.body.id;
      if(req.files){
        req.files.map((val)=>{
          req.body.productImg=val.productImg;
        })
      }
      let coupon = await subCategoryRepo.getByField({categoryType:req.body.categoryType,subCategory:req.body.subCategory,isDeleted:'false',
      _id: {
        $ne: categoryID
    }
        }); 
      if (_.isEmpty(coupon)){
      let categoryUpdate = await subCategoryRepo.updateById(categoryID, req.body);
      if (categoryUpdate) {
        req.flash("success", "Data Updated Successfully");
        res.redirect(namedRouter.urlFor("subCategory.list"));
      } else {
        res.redirect(
          namedRouter.urlFor("subCategory.edit", {
            id: categoryID
          })
        );
      }
    }
    else{
      req.flash("error", "category and subCategory Already exists ");
      res.redirect(
        namedRouter.urlFor("subCategory.edit", {
          id: categoryID
        })
      );
    }

    } 
    catch (e) {
      req.flash("error", 'catch blog');
      res.redirect(namedRouter.urlFor("subCategory.edit", {
        id: categoryID
      }));
    }
  };

  /* @Method: getAll
  // @Description: To get all the subCategory from DB
  */
  async getAll(req, res) {
    try {
      let subData = await subCategoryRepo.getAll(req);
      // console.log(subData);
      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: subData.pages,
        perpage: req.body.pagination.perpage,
        total: subData.total,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: subData.docs,
        message: `Data fetched successfully.`,
      };
    } catch (e) {
      throw e;
    }
  };

  /*
  // @Method: edit
  // @Description:  subCategory edit page
  */
  async edit(req, res) {
    try {
      let data=await categoryRepo.getAllByField({status:'Active',isDeleted:'false'});//category-data
      let mtInfo = await subCategoryRepo.getById(req.params.id);
      // console.log(mtInfo);
    // mtInfo=JSON.stringify(mtInfo);
    // console.log(typeof(mtInfo));
    // console.log(mtInfo);
      if (!_.isEmpty(mtInfo)) {
        res.render("subCategory/views/edit.ejs", {
          page_name: "subCategory-management",
          page_title: "subCategory Edit",
          user: req.user,
          dataAll: mtInfo,
          response:data
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("subCategory.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  };

  /* @Method: delete
  // @Description: faq delete action
  */
  async delete(req, res) {
    try {

      let mtDelete = await subCategoryRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Data removed successfully");
      res.redirect(namedRouter.urlFor("subCategory.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  };

  /*
  // @Method: statusChange
  // @Description: category status change action
  */
  async statusChange(req, res) {
    try {


      let subInfo = await subCategoryRepo.getById(req.params.id);

      if (!_.isEmpty(subInfo)) {
        let categoryStatus =
          subInfo.status == "Active" ? "Inactive" : "Active";
        let categoryStatusUpdate = subCategoryRepo.updateById(req.params.id, {
          status: categoryStatus,
        });

        req.flash("success", "Sub category status has changed successfully");
        res.redirect(namedRouter.urlFor("subCategory.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  };

};

module.exports = new subCategoryController();