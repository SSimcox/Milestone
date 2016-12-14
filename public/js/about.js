/**
 * Created by Steven on 10/11/2016.
 */

var viewH = $(window).height()/100;
var viewW = $(window).width()/100;
var transitionTime = 500;

$(document).ready(function(){
    var me = false;
    var cg = false;
    var wd = false;

    $('#abt-me-h').on('click',function(){
        if(me){
            $('#abt-me').toggle(transitionTime);
            me = false;
        }
        else
        {
            $('#abt-me').toggle(transitionTime);
            $('#abt-cg').hide(transitionTime);
            $('#abt-wd').hide(transitionTime);
            me = true;
            cg = false;
            wd = false;
        }
    });

    $('#abt-cg-h').on('click',function(){
        if(cg){
            $('#abt-cg').toggle(transitionTime);
            cg = false;
        }
        else
        {
            $('#abt-cg').toggle(transitionTime, function(){
                setTimeout(3000, function(){

                })
            });
            $('#abt-me').hide(transitionTime);
            $('#abt-wd').hide(transitionTime);
            cg = true;
            me = false;
            wd = false;
        }
    });

    $('#abt-wd-h').on('click', function(){
        if(wd) {
            $('#abt-wd').toggle(transitionTime);
            wd = false;
        }
        else{
            $('#abt-wd').toggle(transitionTime);
            $('#abt-me').hide(transitionTime);
            $('#abt-cg').hide(transitionTime);
            wd = true;
            cg = false;
            me = false;
        }
    });

});