let dropdown = document.querySelector(".dropdown-wrapper");

dropdown.addEventListener("click", toggleDropdown);

function toggleDropdown(){
    themeButtons.classList.toggle("active");
}

let themeButtons = document.querySelector(".dropdown-menu");
let lightThemeBtn = document.querySelector(".light-theme-btn");
let darkThemeBtn = document.querySelector(".dark-theme-btn");

themeButtons.addEventListener("click", toggleTheme);

function toggleTheme(){
    document.getElementsByTagName("body")[0].classList.toggle("dark");
    
    if(lightThemeBtn.disabled == true){
        lightThemeBtn.disabled = false,darkThemeBtn.disabled = true;
        document.getElementsByClassName("logo-img")[0].src="/IMAGES/gifOF_logo_dark.png";
        document.getElementById("search-icon").src="/IMAGES/Combined shape.svg"
    }else {
        lightThemeBtn.disabled = true,darkThemeBtn.disabled = false;
        document.getElementsByClassName("logo-img")[0].src="/IMAGES/gifOF_logo.png";
        document.getElementById("search-icon").src="/IMAGES/lupa_inactive.svg"
    }
}    
