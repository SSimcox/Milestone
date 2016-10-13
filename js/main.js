/**
 * Created by Steven on 10/10/2016.
 */

var viewW, viewH;

$(document).ready(function(){
    viewH = $(window).height() / 100;
    viewW = $(window).width() / 100;
    var dcon = false;
    var smon = false;

    $(window).resize(function(){
        viewH = $(window).height() / 100;
        console.log(viewH);
        viewW = $(window).width() / 100;
    })
    function dcclick() {
        if(!dcon) {
            document.getElementById("dcframe").setAttribute("src","./Graphics-I/DragonCurve/index.html");
            document.getElementById("dc-iframe").style.height = "700px";
            document.getElementById("dc-iframe").style.display = "block";
            document.getElementById("sm-iframe").style.height = "0px";
            document.getElementById("sm-iframe").style.display = "none";
            dcon = true;
        }
        else
        {
            dcon = false;
            document.getElementById("dc-iframe").style.height = "0px";
            document.getElementById("dc-iframe").style.display = "none";
            document.getElementById("dcframe").setAttribute("src","");
        }

    }
    function smclick() {
        if(!smon) {

            document.getElementById("smframe").setAttribute("src","./Graphics-I/SierpinskiMountain/index.html");
            document.getElementById("dc-iframe").style.height = "0px";
            document.getElementById("dc-iframe").style.display = "none";
            document.getElementById("sm-iframe").style.height = "700px";
            document.getElementById("sm-iframe").style.display = "block";
            document.getElementById("dcframe").setAttribute("src","");
            smon = true;
        }
        else
        {
            smon = false;
            document.getElementById("sm-iframe").style.height = "0px";
            document.getElementById("sm-iframe").style.display = "none";
            document.getElementById("smframe").setAttribute("src","");
        }
    }
    //$('#dclink').on("click", dcclick);
    //$('#smlink').on("click", smclick);


});