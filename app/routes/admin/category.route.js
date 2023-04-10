const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const categoryController=require('category/controllers/category.controller');
const multer = require('multer');
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (file.fieldname === 'image') {
            callback(null, "./public/uploads/faq")
        }

    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
            req.fileValidationError = 'Only support jpeg, jpg or png file types.';
            return cb(null, false, new Error('Only support jpeg, jpg or png file types'));
        }
        cb(null, true);
    }
});


const request_param = multer();

namedRouter.all('/category*', auth.authenticate);

namedRouter.post("category.getall", '/category/getall', async (req, res) => {
    try {
        const success = await categoryController.getAll(req, res);
        // console.log(success.data);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("category.list", '/category/list',categoryController.lists);
namedRouter.get("category.create", '/category/create', categoryController.create);
namedRouter.post("category.insert", '/category/insert', uploadFile.any(), categoryController.insert);
namedRouter.get("category.edit", "/category/edit/:id", categoryController.edit);
namedRouter.post("category.update", '/category/update', uploadFile.any(), categoryController.update);
namedRouter.get("category.delete", "/category/delete/:id", categoryController.delete);
namedRouter.get("category.statusChange", '/category/status-change/:id', request_param.any(), categoryController.statusChange);

module.exports = router; 