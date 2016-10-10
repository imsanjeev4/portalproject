$(function () {
    $('#signin-account').validate({
        rules: {
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
		window.console.log(111);
		//return false;
            var email = $('#email').val();
            var password = $('#password').val();
            var content = {email: email, password: password};

            if (email && password !== '') {
                $.ajax({
                    method: "POST",
                    data: content,
                    url: '/hma/portal/Signin/',
                    success: function (response) {
			if(response['status'] == 'true')
			{
		 swal({ 
                        type: "success",
                        html: response['msg']
                 });  
			location.href = '/internal.html';
			}
			else{
		 swal({ 
                        type: "error",
                        html: response['msg']
                });  				
			 }
			//window.console.log(response);
                    }, error: function (xhr, status, err) {
                        console.log(status, err);
                    }
                });
            }
        }
    });
});
