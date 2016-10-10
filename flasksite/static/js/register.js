$(function () {
    $('#create-account').validate({
        rules: {
	/*firstname: {
                required: true,
                firstname: true
            	},
	lastname: {
                required: true,
                lastname: true
            },*/
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            agree: "required"
        },
        messages: {

	   /*firstname: {
                required: "Please enter firstname.",
                firstname: "Please enter firstname."
            },
	    lastname: {
                required: "Please enter lastname.",
                lastname: "Please enter lastname."
            },*/
            email: {
                required: "Please enter email id.",
                email: "Please enter a valid email id."
            },
            password: {
                required: "Please enter the password.",
                minlength: "Password length should be at least 6 characters."
            }
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element
                    .closest('.control-group').removeClass('error').addClass('success');
        },
        submitHandler: function (form) {
		//return false;
            var firstname = $('#firstname').val();
            var lastname = $('#lastname').val();
            var email = $('#reg_email').val();
            var password = $('#reg_password').val();
            var content = {firstname: firstname, lastname: lastname, email: email, password: password};
            if (email && password !== '') {
                $.ajax({
                    method: "POST",
                    data: content,
                    url: '/hma/portal/register/',
                    success: function (response) {
		if(response['status'] == 'true')
			{
		 swal({
            		type: "success",
            		html: response['msg']
		});
			}
			else{
		 swal({
            		type: "error",
            		html: response['msg']
		});
			}
                    }, error: function (xhr, status, err) {
                        console.log(status, err);
                    }
                });
            }
        }
    });
});
