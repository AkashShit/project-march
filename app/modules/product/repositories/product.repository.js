const mongoose = require('mongoose');
const productModel = require('product/models/product.model');
const perPage = config.PAGINATION_PERPAGE;

const CategoryRepository = {
    getAll: async (req) => {
        try {
          
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({
                "isDeleted": false
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        {'subCategory.subCategory': { $regex: req.body.query.generalSearch, $options: 'i' }},
                        {'categoryType.category': { $regex: req.body.query.generalSearch, $options: 'i' }},
                        {'product': { $regex: req.body.query.generalSearch, $options: 'i' }}
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({
                    "status": req.body.query.Status
                });
            }
            conditions['$and'] = and_clauses;

            var sortOperator = {
                "$sort": {}
            };
            if (_.has(req.body, 'sort')) {
                var sortField = req.body.sort.field;
                if (req.body.sort.sort == 'desc') {
                    var sortOrder = -1;
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }

                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

  //   var aggregate = productModel.aggregate([

            //     {
 
            //      $lookup:{
 
            //          from:'subcategorymodels',
            //          let:{
            //              subcategoryId:'$subCategory'
            //          },
            //          pipeline:[
            //              {
            //                  $match:{
            //                      $expr:{
            //                          $and:[
            //                              {
            //                                  $eq:['$_id','$$subcategoryId']
            //                              }
            //                          ]
            //                      }
            //                  }
            //              }
            //          ],
 
            //          as:'subCategory'
 
            //      }
 
            //     },
            //     {
 
            //      $lookup:{
 
            //          from:'categorymodels',
            //          let:{
            //              categoryId:'$categoryType'
            //          },
            //          pipeline:[
            //              {
            //                  $match:{
            //                      $expr:{
            //                          $and:[
            //                              {
            //                                  $eq:['$_id','$$categoryId']
            //                              }
            //                          ]
            //                      }
            //                  }
            //              }
            //          ],
 
            //          as:'categoryType'
 
            //      }
 
            //     },
            //      {
            //           $project: {
            //               _id: "$_id",
            //               categoryType: "$categoryType",
            //               subCategory:"$subCategory",
            //               product:'$product',
            //               productImg:'$productImg',
            //               status: "$status",
            //               createdAt:'$createdAt',
            //               isDeleted: "$isDeleted"
            //           }
            //       },
            //       {
            //          $unwind:{
            //            path:'$subCategory'
            //          }
            //        },
            //        {
            //          $unwind:{
            //            path:'$categoryType'
            //          }
            //        },
 
            //      {
            //          $match: conditions
            //      },
 
            //      sortOperator
 
            //  ]);

// populate result 

    //    let popData=productModel.find().populate("subCategory").populate("categoryType").exec((err,data)=>{
    //     if(!err){
    //          console.log(data);
    //         }
    //     else{
    //         console.log(err);
    //     }
    //   })
            var aggregate = productModel.aggregate([
                {
                    $lookup:{
                        from:'subcategorymodels',
                        let:{
                          subId:'$subCategory'
                        },
                        pipeline:[
                          {
                            $match:{
                              $expr:{
                                $and:[
                                  {
                                    $eq:['$_id','$$subId']
                                  }
                                ]
                              }
                            }
                        }
                        ],
                        as:'subCategory'
                      }
                    },{
                        $lookup:{
                            from:'categorymodels',
                            let:{
                                categoryId:'$categoryType'
                            },
                            pipeline:[{
                                $match:{
                                    $expr:{
                                        $and:[{
                                            $eq:['$_id','$$categoryId']
                                        }]
                                    }
                                }
                            }],
                            as:'categoryType'
                        }
                    },
                     
                    {
                        $unwind:{
                            path:'$subCategory'
                          }
                    },{
                        $unwind:{
                            path:'$categoryType'
                          }
                    },
                      {
                    $project: {
                        _id: "$_id",
                        categoryType:'$categoryType',
                        subCategory: "$subCategory",
                        product:'$product',
                        productImg:'$productImg',
                        isDeleted: "$isDeleted",
                        createdAt:'$createdAt',
                        status:'$status'
                    }
                },
                {
                        $sort: {
                          "createdAt": -1
                        }
                      },
                    
                {
                    $match: conditions
                },
                sortOperator
            ]);
          
          
         aggregate.sort({ 
            "createdAt": -1
          })
            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allRecord = await productModel.aggregatePaginate(aggregate, options);
                
            return allRecord;
        } catch (e) {
            throw (e);
        }
    },

   


    getById: async (id) => {

        try {
            let record = await productModel.findById(id).lean().exec();

            if (!record) {
                return null;
            }
            return record;

        } catch (e) {
            throw e;
        }
    },

    getByField: async (params) => {

        try {
            let record = await productModel.findOne(params).exec();

            if (!record) {
                return null;
            }
            return record;

        } catch (e) {
            throw e;
        }
    },
//subCategory data find
    getAllByField: async (params) => {

        try {
            let record = await CategoryModel.find(params).sort({
                'name': 1
            }).exec();

            if (!record) {
                return null;
            }
            return record;

        } catch (e) {
            throw e;
        }
    },



    save: async (data) => {
        try {
            let save = await productModel.create(data);
            // console.log(await CategoryModel.find({}));
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            throw e;
        }
    },

    getDocumentCount: async (params) => {
        try {
            let recordCount = await CategoryModel.countDocuments(params);
            if (!recordCount) {
                return 0;
            }
            return recordCount;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let record = await CategoryModel.findById(id);
            if (record) {
                let recordDelete = await CategoryModel.findByIdAndUpdate(id, {
                    isDeleted: true
                }, {
                    new: true
                });
                if (!recordDelete) {
                    return null;
                }
                return recordDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let record = await productModel.findByIdAndUpdate(id, data, {
                new: true
            });
            if (!record) {
                return null;
            }
            return record;
        } catch (e) {
            throw e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = CategoryRepository;