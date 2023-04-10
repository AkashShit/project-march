// Class definition

var KTFormControls = function () {
    // Private functions

    var myProfileValidation = function () {
        $("#frmMyProfile").validate({
            // define validation rules
            rules: {
                first_name: {
                    required: true,
                    letterswithbasicpunc: true
                },
                last_name: {
                    required: true,
                    letterswithbasicpunc: true
                }
            },
            messages: {
                first_name: {
                    required: "Please enter your first name",
                    letterswithbasicpunc: "Please enter alphabets only"
                },
                last_name: {
                    required: "Please enter your last name",
                    letterswithbasicpunc: "Please enter alphabets only"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createcouponValidation = function () {
        $("#createcouponValidation").validate({
            // define validation rules
            rules: {
                coupon_code: {
                    required: true
                },
                amount: {
                    required: true
                },
                coupon_count: {
                    required: true
                },
                coupon_description: {
                    required: true
                },
                expiry_date: {
                    required: true
                }
            },
            messages: {
                coupon_code: {
                    required: "Please enter your coupon code"
                },
                amount: {
                    required: "Please enter discount"
                },
                coupon_count: {
                    required: "Please enter coupon count"
                },
                coupon_description: {
                    required: "Please enter description"
                },
                expiry_date: {
                    required: "Please select expiry date"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editcouponValidation = function () {
        $("#editcouponValidation").validate({
            // define validation rules
            rules: {
                coupon_code: {
                    required: true
                },
                amount: {
                    required: true
                },
                coupon_count: {
                    required: true
                },
                coupon_description: {
                    required: true
                },
                expiry_date: {
                    required: true
                }
            },
            messages: {
                coupon_code: {
                    required: "Please enter your coupon code"
                },
                amount: {
                    required: "Please enter discount"
                },
                coupon_count: {
                    required: "Please enter coupon count"
                },
                coupon_description: {
                    required: "Please enter description"
                },
                expiry_date: {
                    required: "Please select expiry date"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var changePasswordValidation = function () {
        $("#changePasswordForm").validate({
            // define validation rules
            rules: {
                old_password: {
                    required: true,
                },
                password: {
                    required: true,
                    minlength: 6
                },
                password_confirm: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                old_password: {
                    required: "Please enter your old password",
                },
                password: {
                    required: "Please enter your new password",
                },
                password_confirm: {
                    required: "Make sure that you have entered the same password here.",
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createRecipesValidation = function () {
        // alert('hgfd');
        $("#CreateRecipes").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                sub_title: {
                    required: true,
                }
                ,
                serving_time: {
                    required: true,
                }
                ,
                serving_size: {
                    required: true,
                }
                ,
                meal_type_id: {
                    required: true,
                },
                batch_recipe: {
                    required: true,
                },
                recipes_images: {
                    required: true,
                },
                // "quantity[]": {
                //     required: true,
                // },
                // "unit[]": {
                //     required: true,
                // },
                // "ingredient[]": {
                //     required: true,
                // },
                // "preparation_style[]": {
                //     required: true,
                // }
            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                sub_title: {
                    required: "This field is required",
                }
                ,
                serving_time: {
                    required: "This field is required",
                }
                ,
                serving_size: {
                    required: "This field is required",
                }
                ,
                meal_type_id: {
                    required: "This field is required",
                },
                batch_recipe: {
                    required: "This field is required",
                },
                recipes_images: {
                    required: "This field is required",
                },
                // "quantity[]": {
                //     required: "This field is required",
                // },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editRecipesValidation = function () {
        // alert('hgfd');
        $("#EditRecipes").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                sub_title: {
                    required: true,
                }
                ,
                serving_time: {
                    required: true,
                }
                ,
                serving_size: {
                    required: true,
                }
                ,
                meal_type_id: {
                    required: true,
                },
                batch_recipe: {
                    required: true,
                },
                // recipies_images: {
                //     required: true,
                // }

            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                sub_title: {
                    required: "This field is required",
                }
                ,
                serving_time: {
                    required: "This field is required",
                }
                ,
                serving_size: {
                    required: "This field is required",
                }
                ,
                meal_type_id: {
                    required: "This field is required",
                },
                batch_recipe: {
                    required: "This field is required",
                },
                // recipies_images: {
                //     required: "This field is required",
                // }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createUnitValidation = function () {
        // alert('hgfd');
        $("#CreateUnit").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editUnitValidation = function () {
        // alert('hgfd');
        $("#EditUnit").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createRecipesTypeValidation = function () {
        // alert('hgfd');
        $("#CreateRecipesType").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editRecipesTypeValidation = function () {
        // alert('hgfd');
        $("#EditRecipesType").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }
    var createMealTypeValidation = function () {
        // alert('hgfd');
        $("#CreateMealType").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editMealTypeValidation = function () {
        // alert('hgfd');
        $("#EditMealType").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createMealsValidation = function () {
        // alert('hgfd');
        $("#CreateMeals").validate({
            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                meal_type: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                price: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                category_id: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                meal_images: {
                    required: true,
                    extension: "jpg|jpeg|png|gif|svg|x-ms-bmp"
                },
            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                meal_type: {
                    required: "Please select meal type"
                },
                price: {
                    required: "Please enter price"
                },
                category_id: {
                    required: "Please select category"
                },
                meal_images: {
                    required: "Please upload an image"
                },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createRecipesValidation = function () {
        // alert('hgfd');
        $("#CreateRecipes").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                sub_title: {
                    required: true,
                }
                ,
                serving_time: {
                    required: true,
                }
                ,
                serving_size: {
                    required: true,
                }
                ,
                category: {
                    required: true,
                },
                batch_recipe: {
                    required: true,
                },
                recipies_images: {
                    required: true,
                }

            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                sub_title: {
                    required: "This field is required",
                }
                ,
                serving_time: {
                    required: "This field is required",
                }
                ,
                serving_size: {
                    required: "This field is required",
                }
                ,
                category: {
                    required: "This field is required",
                },
                batch_recipe: {
                    required: "This field is required",
                },
                recipies_images: {
                    required: "This field is required",
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var addShopValidation = function () {
        // alert('hgfd');
        $("#frmAddShop").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                },
                description: {
                    required: true,
                }
                ,
                price: {
                    required: true,
                }
                ,
                discounted_price: {
                    //lessThan: '#price'
                    required: true,
                }
                ,
                link: {
                    required: true,
                },
                image: {
                    required: true,
                },

            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                description: {
                    required: "This field is required",
                }
                ,
                price: {
                    required: "This field is required",
                }
                ,
                discounted_price: {
                    required: "This field is required",
                }
                ,
                link: {
                    required: "This field is required",
                },
                image: {
                    required: "This field is required",
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editShopValidation = function () {
        // alert('hgfd');
        $("#frmEditShop").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                },
                description: {
                    required: true,
                }
                ,
                price: {
                    required: true,
                }
                ,
                discounted_price: {
                    //lessThan: '#price',
                    required: true,
                }
                ,
                link: {
                    required: true,
                }

            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                description: {
                    required: "This field is required",
                }
                ,
                price: {
                    required: "This field is required",
                }
                ,
                discounted_price: {
                    required: "This field is required",
                }
                ,
                link: {
                    required: "This field is required",
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var createOrderValidation = function () {
        $("#CreateOrder").validate({
            rules: {
                package_id: { required: true, },
                plan_id: { required: true, },
                first_name: { required: true, },
                last_name: { required: true, },
                address: { required: true, },
                app_suite: { required: true, },
                city: { required: true, },
                state: { required: true, },
                post_code: { required: true, },
                phone: { required: true, minlength: 10, maxlength: 15 },
                note: { required: true, },
            },
            messages: {
                package_id: { required: "Please select package" },
                plan_id: { required: "Please select plan" },
                first_name: { required: "Please select first_name" },
                last_name: { required: "Please select last_name" },
                address: { required: "Please select address" },
                app_suite: { required: "Please select app/suite" },
                city: { required: "Please select city" },
                state: { required: "Please select state" },
                post_code: { required: "Please select post code" },
                phone: { required: "Please select phone" },
                note: { required: "Please select note" },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var editMealsValidation = function () {
        // alert('hgfd');
        $("#EditMeals").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                meal_type: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                price: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                category_id: {
                    required: true,
                    // letterswithbasicpunc: true
                },
            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                meal_type: {
                    required: "Please select meal type"
                },
                price: {
                    required: "Please enter price"
                },
                category_id: {
                    required: "Please select category"
                },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createToppingsValidation = function () {
        // alert('hgfd');
        $("#createToppingsValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                meal: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                price: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                meal_type: {
                    required: "Please select meal"
                },
                price: {
                    required: "Please enter price"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editToppingsValidation = function () {
        // alert('hgfd');
        $("#editToppingsValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                meal: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                price: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                meal_type: {
                    required: "Please select meal"
                },
                price: {
                    required: "Please enter price"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editUserValidation = function () {
        // alert('hgfd');
        $("#editToppingsValidation").validate({

            // define validation rules
            rules: {
                full_name: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                email: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                full_name: {
                    required: "Please enter full name"
                },
                email: {
                    required: "Please enter email"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var CreateZipCodeValidation = function () {
        // alert('hgfd');
        $("#CreateZipCode").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter zip code"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var EditZipCodeValidation = function () {
        // alert('hgfd');
        $("#EditZipCode").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter zip code"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var CreateCategoryValidation = function () {
        // alert('hgfd');
        $("#CreateCategory").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter category name"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var EditCategoryValidation = function () {
        // alert('hgfd');
        $("#EditCategory").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter category name"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createKeyValidation = function () {
        // alert('hgfd');
        $("#createKeyValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                key_icon: {
                    required: true,
                    extension: "jpg|jpeg|png|gif|svg|x-ms-bmp"
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter Key Benefits Title"
                },
                key_icon: {
                    required: "Please upload an image"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editKeyValidation = function () {
        // alert('hgfd');
        $("#editKeyValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                // key_icon: {
                //     required: true,
                //     extension: "jpg|jpeg|png|gif|x-ms-bmp"
                //     // letterswithbasicpunc: true
                // }
            },
            messages: {
                title: {
                    required: "Please enter Key Benefits Title"
                },
                // key_icon: {
                //     required: "Please upload an image"
                // }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createDietaryValidation = function () {
        // alert('hgfd');
        $("#createDietaryValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                dietary_icon: {
                    required: true,
                    extension: "jpg|jpeg|png|gif|x-ms-bmp"
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter dietary name"
                },
                dietary_icon: {
                    required: "Please upload an image"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editDietaryValidation = function () {
        // alert('hgfd');
        $("#editDietaryValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
            },
            messages: {
                title: {
                    required: "Please enter dietary name"
                },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createLikeValidation = function () {
        // alert('hgfd');
        $("#createLikeValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                like_icon: {
                    required: true,
                    extension: "jpg|jpeg|png|gif|x-ms-bmp"
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                key_icon: {
                    required: "Please upload an image"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editLikeValidation = function () {
        // alert('hgfd');
        $("#editLikeValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },

            },
            messages: {
                title: {
                    required: "Please enter title"
                },
                // key_icon: {
                //     required: "Please upload an image"
                // }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var createPlansValidation = function () {
        // alert('hgfd');
        $("#createPlansValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                box: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                price: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                tag: {
                    required: false,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please select plan type"
                },
                box: {
                    required: "Please enter box count"
                },
                price: {
                    required: "Please enter price"
                },
                tag: {
                    required: "Please select tag"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editPlansValidation = function () {
        // alert('hgfd');
        $("#editPlansValidation").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                box: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                price: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                tag: {
                    required: false,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please select plan type"
                },
                box: {
                    required: "Please enter box count"
                },
                price: {
                    required: "Please enter price"
                },
                tag: {
                    required: "Please select tag"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var CreateStateValidation = function () {
        // alert('hgfd');
        $("#CreateState").validate({

            // define validation rules
            rules: {
                name: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                short_name: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                name: {
                    required: "Please enter state name"
                },
                short_name: {
                    required: "Please enter state code"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var EditStateValidation = function () {
        // alert('hgfd');
        $("#EditState").validate({

            // define validation rules
            rules: {
                name: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                short_name: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                name: {
                    required: "Please enter state name"
                },
                short_name: {
                    required: "Please enter state code"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var EditAboutValidation = function () {
        // alert('hgfd');
        $("#editAboutValidation").validate({

            // define validation rules
            rules: {
                main_heading: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                block_title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                main_heading: {
                    required: "Please enter heading"
                },
                block_title: {
                    required: "Please enter content title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var EditTeamValidation = function () {
        // alert('hgfd');
        $("#editTeamValidation").validate({

            // define validation rules
            rules: {
                name: {
                    required: true,
                    // letterswithbasicpunc: true
                },
                designation: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                name: {
                    required: "Please enter name"
                },
                designation: {
                    required: "Please enter designation"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var EditCMSValidation = function () {
        $("#frmEditCMS").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var ReplyMsgValidation = function () {
        $("#replyToCustomer").validate({

            rules: {
                reply_message: {
                    required: true,
                }
            },
            messages: {
                reply_message: {
                    required: "Please enter message"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var IngredientAddFrmValidation = function () {
        $("#IngredientAddFrm").validate({
            rules: {
                title: {
                    required: true,
                },
                category_id: {
                    required: true,
                },
                icon: {
                    required: true,
                    extension: "svg"
                }
            },
            messages: {
                title: {
                    required: "Please enter name"
                },
                category_id: {
                    required: "Please select category"
                },
                icon: {
                    required: "Please upload an icon",
                    extension: "Only svg file is allowed"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var IngredientUpdateFrmValidation = function () {
        $("#IngredientEditFrm").validate({
            rules: {
                title: {
                    required: true,
                },
                category_id: {
                    required: true,
                },
                icon: {
                    extension: "svg"
                }
            },
            messages: {
                title: {
                    required: "Please enter name"
                },
                category_id: {
                    required: "Please select category"
                },
                icon: {
                    extension: "Only svg file is allowed"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var AllergicItemFrmValidation = function () {
        $("#allergicItemFrm").validate({
            rules: {
                title: {
                    required: true,
                }
            },
            messages: {
                title: {
                    required: "Please enter allergic item name"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }
    
    var SubscriptionPlanFrmValidation = function () {
        $("#subscriptionPlanFrm").validate({
            rules: {
                bill_price: {
                    required: true,
                    number: true
                }
            },
            messages: {
                bill_price: {
                    required: "Please enter price",
                    number: "Please enter valid price"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var ReheatingFrmValidation = function () {
        $("#ReheatingFrm").validate({
            rules: {
                title: {
                    required: true,
                }
            },
            messages: {
                title: {
                    required: "Please enter name"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var GroceryNoteFrmValidation = function () {
        $("#groceryNoteFrm").validate({
            rules: {
                title: {
                    required: true,
                },
                short_content: {
                    required: true,
                }
            },
            messages: {
                title: {
                    required: "This field is required"
                },
                short_content: {
                    required: "This field is required"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var IngredientCategoryFrmValidation = function () {
        $("#frmIngredientCategory").validate({
            rules: {
                title: {
                    required: true,
                }
            },
            messages: {
                title: {
                    required: "Please enter Ingredient Category"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }
    var FAQFrmValidation = function () {
        $("#frmFAQ").validate({
            rules: {
                question: {
                    required: true,
                },
                answer: {
                    required: true,
                }
            },
            messages: {
                question: {
                    required: "Please enter Question"
                },
                answer: {
                    required: "Please enter Answer"
                }
            },
            invalidHandler: function (event, validator) {
                //KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var blankSpaceNotAllow = function () {
        $("input").on("keypress", function (e) {
            var startPos = e.currentTarget.selectionStart;
            if (e.which === 32 && startPos == 0)
                e.preventDefault();
        })
    }

    return {
        // public functions
        init: function () {
            createOrderValidation();
            myProfileValidation();
            createcouponValidation();
            editcouponValidation();
            createMealTypeValidation();
            editMealTypeValidation();
            createMealsValidation();
            editMealsValidation();
            createToppingsValidation();
            editToppingsValidation();
            editUserValidation();
            CreateZipCodeValidation();
            EditZipCodeValidation();
            CreateCategoryValidation();
            EditCategoryValidation();
            createKeyValidation();
            editKeyValidation();
            createDietaryValidation();
            editDietaryValidation();
            createLikeValidation();
            editLikeValidation();
            createPlansValidation();
            editPlansValidation();
            CreateStateValidation();
            EditStateValidation();
            changePasswordValidation();
            EditAboutValidation();
            EditTeamValidation();
            EditCMSValidation();
            ReplyMsgValidation();
            createRecipesTypeValidation();
            editRecipesTypeValidation();
            createUnitValidation();
            editUnitValidation();
            createRecipesValidation();
            editRecipesValidation();

            IngredientAddFrmValidation();
            IngredientUpdateFrmValidation();

            AllergicItemFrmValidation();

            SubscriptionPlanFrmValidation();

            addShopValidation();
            editShopValidation();
            ReheatingFrmValidation();

            IngredientCategoryFrmValidation();
            FAQFrmValidation();

            GroceryNoteFrmValidation();
        }
    };
}();

jQuery(document).ready(function () {
    KTFormControls.init();
});