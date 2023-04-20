const dropbutton = document.querySelector("#dropdown_button");
const drop = document.querySelector("dropdown");

dropbutton.addEventListener("click", function(){
    drop.classList.toggle("show");
})

drop.addEventListener("change", function(){
    drop.classList.remove("show");
})