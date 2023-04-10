
$(document).ready(function(){
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) 
        {
            if (regexp.constructor != RegExp)
                regexp = new RegExp(regexp);
            else if (regexp.global)
                regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
);
// $.validator.addMethod(
//   "minAge",
//   function (value, element, min) {
//     var today = new Date();
//     var birthDate = new Date(value);
//     var age = today.getFullYear() - birthDate.getFullYear();

//     if (age > min + 1) {
//       return true;
//     }

//     var m = today.getMonth() - birthDate.getMonth();

//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }

//     return age >= min;
//   },
//   "You are not too old !"
// );

$("#create").validate({
rules: {
first_name: {
  required: true,
  regex:/^[a-zA-Z]*$/,
  minlength: 2
},
last_name:{
  required: true,
  regex:/^[a-zA-Z]*$/,
  minlength: 2
},
email:{
  required: true,
  regex: /^[A-Za-z0-9_]+\@[A-Za-z0-9_]+\.[A-Za-z0-9_]+/
},
profile:{
  required: true,
 regex:/\.(jfif|jpe?g|tiff?|png|webp|bmp|jfif)$/i
},
phone:{
  required:true,
  regex: /^[ ()+]*([0-9][ ()+]*){10}$/,  
},
dob:{
  required: true, 
  // minAge:18
},
role:{
    required:true
}
},
messages: {
first_name: {
  required: "This field should not be empty",
  regex: "Please Enter valid First Name,only alphabate [A-Z]   ",
  minlength:"minimum 2 character require"
},
last_name: {
  required: "This field should not be empty",
  regex: "Please Enter valid Last Name,only alphabate [A-Z] ",
  minlength:"minimum 2 character required"
},
email:{
  required: "Email should not be empty",
  regex: 'Please enter a valid email, Example@gmail.com'
},
profile:{
  required:"Profile picture must be required",
  regex:"Profile picture jpeg,jpg,png,jfif are support only "
},
phone:{
  required:"Phone number should not be empty",
  regex: "Phone number must be 10 digit & only 0-9" 
},
dob:{
    required:"DOB is required",
    // minAge:"Eligibility 18 years ONLY"
},
role:{
    required:"Please choose a role "
}
}
  });


  $( "#dob" ).datepicker({
        maxDate: "-18y",
        changeMonth:true, 
        changeYear:true, 
        yearRange:"1965:2023"   
  }); 
  
})

