const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const subCategoryController=require('subCategory/controllers/subCategory.controller')
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

namedRouter.all('/subCategory*', auth.authenticate);

namedRouter.post("subCategory.getall", '/subCategory/getall', async (req, res) => {
    try {
        const success = await subCategoryController.getAll(req, res);
        // console.log(success.data);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("subCategory.list", '/subCategory/list',subCategoryController.listing);
namedRouter.get("subCategory.create", '/subCategory/create',subCategoryController.create);
namedRouter.post("subCategory.insert", '/subCategory/insert', uploadFile.any(), subCategoryController.insert);
namedRouter.get("subCategory.edit", "/subCategory/edit/:id", subCategoryController.edit);
namedRouter.post("subCategory.update", '/subCategory/update', uploadFile.any(), subCategoryController.update);
namedRouter.get("subCategory.delete", "/subCategory/delete/:id", subCategoryController.delete);
namedRouter.get("subCategory.statusChange", '/subCategory/status-change/:id', request_param.any(), subCategoryController.statusChange);

module.exports = router; 