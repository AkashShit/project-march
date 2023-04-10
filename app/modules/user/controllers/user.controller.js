const mongoose = require("mongoose");
const user = require("user/models/user.model");
const userRepo = require("user/repositories/user.repository");
const faqRepo = require("faq/repositories/faq.repository");
const roleRepo = require("role/repositories/role.repository");
const mailer = require("../../../helper/mailer.js");
const helper = require("../../../helper/helper.js");
const express = require("express");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const gm = require("gm").subClass({
  imageMagick: true,
});
const fs = require("fs");
const jwt = require("jsonwebtoken");
//mail send
const { join } = require("path");
const ejs = require("ejs");
const { readFile } = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(readFile);

class UserController {
  constructor() {
    this.users = [];
  }

  /* @Method: login
    // @Description: user Login Render
    */
  async login(req, res) {
    res.render("user/views/login.ejs");
  }

  /* @Method: signin
    // @Description: user Login
    */
  async signin(req, res) {
    try {
      let userData = await userRepo.fineOneWithRole(req.body);
      if (userData.status == 500) {
        req.flash("error", userData.message);
        return res.redirect(namedRouter.urlFor("user.login"));
      }
      let user = userData.data;
      if (!_.isEmpty(user.role) && user.role.role == "admin") {
        const payload = {
          id: user._id,
        };

        let token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: 86400, // expires in 24 hours
        });
        req.session.token = token;
        req.user = user;
        let user_details = {};
        user_details.id = user._id;
        user_details.name = user.name;
        user_details.email = user.email;
        // return the information including token as JSON
        req.flash("success", "You have successfully logged in");
        res.redirect(namedRouter.urlFor("user.dashboard"));
      } else {
        req.flash("error", "Authentication failed. You are not a valid user.");
        res.redirect(namedRouter.urlFor("user.login"));
      }
    } catch (e) {
      throw e;
    }
  }

  /* @Method: create
    // @Description: user create view render
    */
  async create(req, res) {
    try {
        let success = {};
      let role = await roleRepo.getAllByField({});
        success.data = role;
      res.render("user/views/add.ejs", {
        page_name: "user-management",
        page_title: "Create User",
        user: req.user,
        response: success
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  /**
 * 
 *@method:insert
 @description:add new user data in database
 */
  async insert(req, res) {
    try {
     if(req.files){
      req.body.profile = req.files[0].filename;
      gm(req.body.profile)
      // .thumbnail(300, 200)
      .write(`./public/uploads/user/thumnail/${req.body.profile}`, function (err) {
        if (!err)
        {
          console.log('done')
        }else{
          console.log(err);
        }
      
});
     }
      let password = await helper.generateUniqueOrderNumber(req);
      req.body.password = req.user.generateHash(password);
      let isEmailAvailable = await helper.isEmailAvailable(req.body.email);
      if (!isEmailAvailable) {
        let saveData = await userRepo.save(req.body);
        if (!_.isEmpty(saveData)) {
          let locals = {
            response: req.body,
            password: password,
          };
          let isMailSend = await mailer.sendMail(
            `Admin <process.env.MAIL_USERNAME> `,
            req.body.email,
            "Registration Successful",
            "user-profile",
            locals
          );
          if (isMailSend) {
            req.flash("success", "User added successfully");
            res.redirect(namedRouter.urlFor("user.listing"));
          }
        } else {
          req.flash("error", "Sorry user not added!");
          res.redirect(namedRouter.urlFor("user.listing"));
        }
      } else {
        req.flash("error", "Email is Already Exists");
        res.redirect(namedRouter.urlFor("user.create"));
      }
    } catch (err) {
      throw err;
    }
  }
  /* @ Method: list
    // @Description: To get all the user from DB
    */
  async list(req, res) {
    try {
      res.render("user/views/list.ejs", {
        page_name: "user-management",
        page_title: "User List",
        user: req.user,
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  /* @Method: getAllUser
    // @Description: To get all the user from DB
    */
  async getAllUser(req, res) {
    try {
      // req.body.role = "user";
      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }

      if (!_.has(req.body, "pagination")) {
        req.body.pagination.page = 1;
        eq.body.pagination.perpage = config.PAGINATION_PERPAGE;
      }
      let user = await userRepo.getAllUsers(req);

      let meta = {
        page: req.body.pagination.page,
        pages: user.pages,
        perpage: req.body.pagination.perpage,
        total: user.total,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: user.docs,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      return {
        status: 500,
        data: [],
        message: e.message,
      };
    }
  }

  /**
   * @Method: edit
   * @Description: To edit user information
   */
  async edit(req, res) {
    try {
      let result = {};
      let userData = await userRepo.getById(req.params.id);
      let role = await roleRepo.getAllByField({});
      if (!_.isEmpty(userData)) {
        result.user_data = userData;
        res.render("user/views/edit.ejs", {
          page_name: "user-management",
          page_title: "Update User",
          user: req.user,
          response: result,
          role:role
        });
      } else {
        req.flash("error", "Sorry user not found!");
        res.redirect(namedRouter.urlFor("user.listing"));
      }
    } catch (e) {
      throw e;
    }
  }

  async update(req, res) {
    try {
      let userUpdate = userRepo.updateById(req.body, req.body.uid);
      if (userUpdate) {
        req.flash("success", "User updated successfully.");
        res.redirect(namedRouter.urlFor("user.listing"));
      } else {
        res.redirect(
          namedRouter.urlFor("user.edit", {
            id: req.body.uid,
          })
        );
      }
    } catch (e) {
      throw e;
    }
  }

  /* @Method: delete
    // @Description: user Delete
    */
  async delete(req, res) {
    try {
      let userDelete = await userRepo.updateById(
        {
          isDeleted: true,
        },
        req.params.id
      );
      if (!_.isEmpty(userDelete)) {
        req.flash("success", "User Removed Successfully");
        res.redirect(namedRouter.urlFor("user.listing"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  /* @Method: Dashboard
    // @Description: User Dashboard
    */
  async dashboard(req, res) {
    try {
      let user = await userRepo.getLimitUserByField({
        isDeleted: false,
        "role.role": "admin",
      });
      let resultall = {
        user: user,
      };

      let role = await roleRepo.getByField({ role: "admin" });

      let userCount = await userRepo.getCount({
        role: { $ne: mongoose.Types.ObjectId(role._id) },
        isDeleted: false,
        isActive: true,
      });

      let faqCount = await faqRepo.getDocumentCount({ isDeleted: false });

      /* Html render here */
      res.render("user/views/dashboard.ejs", {
        page_name: "user-dashboard",
        page_title: "Dashboard",
        user: req.user,
        userCount: userCount,
        faqCount: faqCount,
        response: resultall,
      });
    } catch (e) {
      throw e;
      //return res.status(500).send({message: e.message});
    }
  }

  /* @Method: Logout
    // @Description: User Logout
    */
  async logout(req, res) {
    req.session.destroy(function (err) {
      res.redirect("/" + process.env.ADMIN_FOLDER_NAME);
    });
    // req.session.token = "";
    // req.session.destroy();
    // return res.redirect('/');
  }

  /* @Method: viewmyprofile
    // @Description: To get Profile Info from db
    */
  async viewmyprofile(req, res) {
    try {
      const id = req.params.id;
      let user = await userRepo.getById(id);
      if (!_.isEmpty(user)) {
        res.render("user/views/myprofile.ejs", {
          page_name: "user-profile",
          page_title: "My Profile",
          user: req.user,
          response: user,
        });
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  /* @Method: updateprofile
    // @Description: Update My Profile 
    */
  async updateprofile(req, res) {
    try {
      const id = req.body.id;
      let userUpdate = await userRepo.updateById(req.body, id);
      if (!_.isEmpty(userUpdate)) {
        req.flash("success", "Profile updated successfully.");
        res.redirect(
          namedRouter.urlFor("admin.profile", {
            id: id,
          })
        );
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  /*
    // @Method: statusChange
    // @Description: User status change action
    */
  async statusChange(req, res) {
    try {
      let user = await userRepo.getById(req.params.id);
      if (!_.isEmpty(user)) {
        let userStatus = user.isActive == true ? false : true;
        let userUpdate = await userRepo.updateById(
          { isActive: userStatus },
          req.params.id
        );
        req.flash("success", "User status has changed successfully.");
        res.redirect(namedRouter.urlFor("user.listing"));
      } else {
        req.flash("error", "Sorry user not found");
        res.redirect(namedRouter.urlFor("user.listing"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  /* @Method: changepassword
    // @Description: user changepassword Render
    */
  async adminChangePassword(req, res) {
    var vehicleOwner = await userRepo.getById(req.user._id);
    if (vehicleOwner) {
      res.render("user/views/change_password.ejs", {
        page_name: "user-changepassword",
        page_title: "Change Password",
        response: vehicleOwner,
        user: req.user,
      });
    } else {
      req.flash("error", "sorry vehicle owner not found.");
      res.redirect(namedRouter.urlFor("user.dashboard"));
    }
  }

  /*
    // @Method: updatepassword
    // @Description: User password change
    */

  async adminUpdatePassword(req, res) {
    try {
      let user = await userRepo.getUserById(req.user._id);
      if (!_.isEmpty(user)) {
        // check if password matches
        if (!user.validPassword(req.body.old_password, user.password)) {
          req.flash("error", "Sorry old password mismatch!");
          res.redirect(namedRouter.urlFor("admin.changepassword"));
        } else {
          if (req.body.password == req.body.password_confirm) {
            // if user is found and password is right, check if he is an admin
            let new_password = req.user.generateHash(req.body.password);
            let userUpdate = await userRepo.updateById(
              {
                password: new_password,
              },
              req.body.id
            );

            if (userUpdate) {
              req.flash(
                "success",
                "Your password has been changed successfully."
              );
              res.redirect(namedRouter.urlFor("user.dashboard"));
            }
          } else {
            req.flash(
              "error",
              "Your New Password And Confirm Password does not match."
            );
            res.redirect(namedRouter.urlFor("admin.changepassword"));
          }
        }
      } else {
        req.flash("error", "Authentication failed. Wrong credentials.");
        res.redirect(namedRouter.urlFor("admin.changepassword"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  /*
    // @Method: forgotPassword
    // @Description: User forgotPassword
    */

  async forgotPassword(req, res) {
    try {
      let result = await userRepo.forgotPassword(req.body);
     let data=await userRepo.getAllByField(req.body);
    //  console.log(data[0].first_name);
      if (!_.isEmpty(result)) {
        let locals = {
          password: result,
          first_name:data[0].first_name
        };
        let isMailSend = await mailer.sendMail(
          "Admin<process.env.MAIL_USERNAME>",
          req.body.email,
          "New Password",
          "forgot-password",
          locals
        );
        if (isMailSend) {
          req.flash("success", "Chechk Email For New Password");
          res.redirect(namedRouter.urlFor("user.login"));
        } else {
          req.flash("error", "Sorry unable to send mail");
          res.redirect(namedRouter.urlFor("user.login"));
        }
      } else {
        req.flash("error", "Sorry user not found");
        res.redirect(namedRouter.urlFor("user.login"));
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("user.login"));
    }
  }

  async getAllUserCount(req, res) {
    try {
      let userCount = await userRepo.getUsersCount(req);
      return userCount;
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}

module.exports = new UserController();
