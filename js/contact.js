/**
 * Created by Steven on 10/11/2016.
 */

var emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

function formValidate(){
    var validEmail = emailRegex.exec($('#email').val());
    if(validEmail != undefined){
        if($('#email').val() === $('#confirm').val()) {
            return true;
        }
        else{
            $('#confirm').val("");
            $('#confirm').attr('placeholder',"The email addresses does not match");
            return false;
        }
    }
    else{
        $('#email').val("");
        $('#email').attr('placeholder',"That is not a valid email address");
        return false;
    }
    return false;
}

$(document).ready(function(){


    $('#submit').on("click", function(){
            $('#contact-form').submit(function(){
                var valid = formValidate();
                $('#contact-form').unbind('submit').bind('submit');
                return valid;
            });
    });


});