$(function () {
    $('#login-form').validate({
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
            var email = $('#email').val();
            var password = $('#password').val();
            var content = {email: email, password: password};
            content = getUserDetails(content);

            if (email && password !== '') {
                $.ajax({
                    method: "POST",
                    data: content,
                    url: '/raxakapi/v1/Signin/',
                    success: function (response) {
                        if (response.status == "False") {
                            $("#error_message").text(response.message);
                            return false;
                        } else {
                            document.cookie = "usertoken=" + response.usertoken;
                            window.location.href = 'raxak.html';
                        }
                    }, error: function (xhr, status, err) {
                        console.log(status, err);
                    }
                });
            }
        }
    });
});

$(document).on('click', 'input[name=GoogleLogin]', function () {
    var googleLoginUrl = "/raxakapi/v1/googlelogin";
    var content = {};
    content = getUserDetails(content);
    $("LoginWithGoogleForm").submit(function (eob) {
        $(this).append(content);
        console.log(eob);
    });
});

var getUserDetails = function (content) {
    var regExp = /\((.+?)\)/;

    content.browser = getBrowser();
    // content.platform = regExp.exec(navigator.userAgent)[1].toString().split(";")[1].trim();
    //content.platform = navigator.platform;
    content.platform = getOsVersion();
    content.datetime = new Date().toISOString();
    content.timezone = getTimezone();

    return content;
};

var getTimezone = function () {
    var timezone = jstz.determine();
    return timezone.name();
};

var getBrowser = function () {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {  //IF IE > 10
        return 'Internet Explorer';
    } else {
        return 'other';
    }
};

var getOsVersion = function () {
    var os = '-';
    var osVersion = '';
    var nAgt = navigator.userAgent;
    var nVer = navigator.appVersion;
    var clientStrings = [
        {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
        {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
        {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
        {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
        {s: 'Windows Vista', r: /Windows NT 6.0/},
        {s: 'Windows Server 2003', r: /Windows NT 5.2/},
        {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
        {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
        {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
        {s: 'Windows 98', r: /(Windows 98|Win98)/},
        {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
        {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s: 'Windows CE', r: /Windows CE/},
        {s: 'Windows 3.11', r: /Win16/},
        {s: 'Android', r: /Android/},
        {s: 'Open BSD', r: /OpenBSD/},
        {s: 'Sun OS', r: /SunOS/},
        {s: 'Linux', r: /(Linux|X11)/},
        {s: 'iOS', r: /(iPhone|iPad|iPod)/},
        {s: 'Mac OS X', r: /Mac OS X/},
        {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s: 'QNX', r: /QNX/},
        {s: 'UNIX', r: /UNIX/},
        {s: 'BeOS', r: /BeOS/},
        {s: 'OS/2', r: /OS\/2/},
        {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }
    var osname = os;
    if (osVersion)
        osname = os + ' ' + osVersion;
    return osname.trim();
};
