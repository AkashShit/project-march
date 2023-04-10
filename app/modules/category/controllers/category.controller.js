const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const categoryRepo=require("category/repositories/category.repository");
const { collection } = require("../models/category.model");
class categoryController {
  constructor() { }

  /* @Method: list
  // @Description: View for all the faq from DB
  */
  async lists(req, res) {
    try {
      res.render("category/views/list.ejs", {
        page_name: "category-management",
        page_title: "Category-Management",
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
      res.render("category/views/add.ejs", {
        page_name: "category-management",
        page_title: "Category-Management",
        user: req.user
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
      let checkData=await categoryRepo.getByField({'category':req.body.category,isDeleted:false});
      if (_.isEmpty(checkData)) {
      let saveCategory = await categoryRepo.save(req.body);
      // console.log(saveCategory);
     
      req.flash("success", "Category name  added successfully.");
      res.redirect(namedRouter.urlFor("category.list"));
      }
      else{
        req.flash("error", "This Category already exists");
        res.redirect(namedRouter.urlFor("category.create"));
      }
    } catch (e) {      
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("category.create"));
    }
  };

  /* @Method: update
  // @Description: faq update action
  */
  async update(req, res) {
    try {

      const categoryID = req.body.id;
      let coupon = await categoryRepo.getByField({
          'category': req.body.category,
          _id: {
              $ne: categoryID
          }
      }); 
      if (_.isEmpty(coupon)){
      let categoryUpdate = await categoryRepo.updateById(categoryID, req.body);
      if (categoryUpdate) {
        req.flash("success", "category Updated Successfully");
        res.redirect(namedRouter.urlFor("category.list"));
      } else {
        res.redirect(
          namedRouter.urlFor("category.edit", {
            id: categoryID
          })
        );
      }
    }else{
      req.flash("error", "category Already exists");
      res.redirect(
        namedRouter.urlFor("category.edit", {
          id: categoryID
        })
      );
    }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("category.edit", {
        id: faqId
      }));
    }
  };

  /* @Method: getAll
  // @Description: To get all the faq from DB
  */
  async getAll(req, res) {
    try {
      let faqData = await categoryRepo.getAll(req);
      // console.log(faqData);
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
  // @Description:  faq edit page
  */
  async edit(req, res) {
    try {
      
      let mtInfo = await categoryRepo.getById(req.params.id);
      // console.log(mtInfo);
      if (!_.isEmpty(mtInfo)) {
        res.render("category/views/edit.ejs", {
          page_name: "Category-management",
          page_title: "Category Edit",
          user: req.user,
          response: mtInfo
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
  // @Description: faq delete action
  */
  async delete(req, res) {
    try {

      let mtDelete = await categoryRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Category removed successfully");
      res.redirect(namedRouter.urlFor("category.list"));

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


      let categoryInfo = await categoryRepo.getById(req.params.id);

      if (!_.isEmpty(categoryInfo)) {
        let categoryStatus =
          categoryInfo.status == "Active" ? "Inactive" : "Active";
        let categoryStatusUpdate = categoryRepo.updateById(req.params.id, {
          status: categoryStatus,
        });

        req.flash("success", "Category status has changed successfully");
        res.redirect(namedRouter.urlFor("category.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  };

};

module.exports = new categoryController();