
function openpop(obj) {

   
    
    let pop_up_title = document.getElementById("popup-title").innerHTML;
    let new_pop_up_title = pop_up_title.replace(pop_up_title , "sado");
    
    document.getElementById("popup-title").innerHTML = new_pop_up_title;
    document.getElementById("popup").style.transform= "translate(-50%, -50%) scale(1)";
    document.getElementById("overlay").style.opacity= "1";
    document.getElementById("overlay").style.pointerEvents= "all";
}

function closepop() {
    document.getElementById("popup").style.transform= "translate(-50%, -50%) scale(0)";
    document.getElementById("overlay").style.opacity= "0";
    document.getElementById("overlay").style.pointerEvents= "none";
}


//Menu toggle script
function menuclick () {
console.log("start toggle");
    document.getElementById("menu-toggle").click( function (e){
        e.preventDefault();
        document.getElementById("page-content-wrapper").toggleClass("menuDisplayed");
    });
    console.log("end toggle");
}
        