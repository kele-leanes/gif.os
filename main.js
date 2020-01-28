let dropdown = document.querySelector(".dropdownWrapper");

dropdown.addEventListener("click", toggleDropdown);

function toggleDropdown(){
    this.classList.toggle("active");
}

let themeButtons = document.querySelector(".dropdownMenu");
let lightThemeBtn = document.querySelector(".lightThemeBtn");
let darkThemeBtn = document.querySelector(".darkThemeBtn");
let topWindow = document.getElementsByClassName("topWindow");
let seeMore = document.getElementsByClassName("seeMore");

themeButtons.addEventListener("click", toggleTheme);

function toggleTheme(){
    document.getElementsByTagName("body")[0].classList.toggle("night");
    document.getElementsByTagName("header")[0].classList.toggle("night");
    document.getElementsByClassName("navButton")[0].classList.toggle("night");
    document.getElementsByClassName("navButton")[1].classList.toggle("night");
    document.getElementsByClassName("dropdownBtn")[0].classList.toggle("night");
    document.getElementsByClassName("topBar")[0].classList.toggle("night");
    document.getElementsByClassName("myGif")[0].classList.toggle("night");
    
    for(var i = 0;i<topWindow.length;i++){
        topWindow[i].classList.toggle("night");
        seeMore[i].classList.toggle("night");
    }

    if(lightThemeBtn.disabled == true){
        lightThemeBtn.disabled = false,darkThemeBtn.disabled = true;
        document.getElementsByClassName("logo-img")[0].src="/IMAGES/gifOF_logo_dark.png";
    }else {
        lightThemeBtn.disabled = true,darkThemeBtn.disabled = false;
        document.getElementsByClassName("logo-img")[0].src="/IMAGES/gifOF_logo.png";
    }
}    
