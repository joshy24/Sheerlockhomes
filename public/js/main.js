function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function hideMyElement(i){
    document.getElementById(i).style.visibility='hidden';
}

function showMyElement(i){
    $('.navbar-collapse').collapse('hide');
    document.getElementById(i).style.visibility='visible';
}

function closeDarkDiv(i){
    document.getElementById(i).style.visibility='hidden';
}

window.onload = function(){
    hideMyElement('login-loader-div');
    hideMyElement('signup-loader-div');
}
