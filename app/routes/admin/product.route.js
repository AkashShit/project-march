const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const categoryController=require('category/controllers/category.controller');
const productController=require('product/controllers/product.controller')
const multer = require('multer');
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (file.fieldname === 'productImg') {
            callback(null, "./public/uploads/productImg")
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

namedRouter.all('/product*', auth.authenticate);

namedRouter.post("product.getall", '/product/getall', async (req, res) => {
    try {
        const success = await productController.getAll(req, res);
       
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("product.list", '/product/list',productController.list);
namedRouter.get('product.sub','/product/sub',productController.dataFetch)
namedRouter.get("product.create", '/product/create', productController.create);
namedRouter.post("product.insert", '/product/insert', uploadFile.any(),productController.insert);
namedRouter.get("product.edit", "/product/edit/:id",productController.edit);
namedRouter.post("product.update", '/product/update', uploadFile.any(), productController.update);
namedRouter.get("product.delete", "/product/delete/:id", productController.delete);
namedRouter.get("product.statusChange", '/product/status-change/:id', request_param.any(),productController.statusChange);

module.exports = router; 