$(function () {
	$('#create-account').validate({
        onkeyup: false, 
        rules: {
            firstname: {
                required: true,
                required: true
            },
            lastname: {
                required: true,
                required: true
            },
            password: {
                required: true,
                //minlength: 6
                complex: true
            },
            email: {
                required: true,
                email: true,
                emailExist: true
            },
            agree: "required"
        },
        messages: {
            firstname: "Please enter first name.",
            lastname: "Please enter last name.",
            email: {
                required: "Please enter correct email id.",
                email: "Please enter a valid email id.",
            },
            password: {
                required: "Please enter the password.",
                //minlength: "Password length should be at least 6 characters."
                complex: "Minimum 8 characters at least 1 uppercase alphabet, 1 lowercase alphabet, 1 number and 1 special character."
            },
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element
                    //.text('OK!').addClass('valid')
                    .closest('.control-group').removeClass('error').addClass('success');
        },
        submitHandler: function (form) {
	alert('aaaaaaaaaa');
            var firstname = $('#firstname').val();
            var lastname = $('#lastname').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var content = {firstname: firstname, lastname: lastname, email: email, password: password};
            $.ajax({
                method: 'POST',
                url: '/hma/portal/register/',
                data: content,
		//Content-Type: application/json; charset=utf-8,
                success: function (data) {
                    window.location.href = 'thanks.html';
                }
            });
        }
    });


 /*   $('#create-account').validate({
	//return false;
        rules: {
		firstname: {
                required: true,
                firstname: true
            },

		lastname: {
                required: true,
                lastname: true
            },
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
		firstname: {
                required: "Please enter firstname.",
                firstname: "Please enter firstname."
            },
		lastname: {
                required: "Please enter lastname.",
                lasstname: "Please enter lastname."
            },
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

	    var first = $('#firstname').val();
            var last = $('#lastname').val();
            var email = $('#email').val();
            var password = $('#password').val();
		var content ={};
            //var content = {first: first, last: last, email: email, password: password};
		//alert(content);
            //content = getUserDetails(content);

            if (first && last && email && password !== '') {
                $.ajax({
                    method: "POST",
                    data: content,
                   url: '/hma/portal/register/',
                    success: function (response) {
			if(response == true)
			{	
				alert('true');
			//window.location.href="/home/sanjeeev/templates/home.html"
			location.href = '/home.html';
			}
			else{
				alert('Error Occur');
				}
			//window.console.log(response);
                    }, error: function (xhr, status, err) {
                        console.log(status, err);
                    }
                });
            }
        }
    });

*/
});
