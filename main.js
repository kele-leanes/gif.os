
const dropdown = document.querySelector(".dropdown-wrapper");
const searchIcon = document.getElementById("search-icon");
const myGifBtn = document.querySelector(".my-gif")

myGifBtn.addEventListener("click", ()=>(document.querySelector(".gif-creator").style.display="none"))

dropdown.addEventListener("click", toggleDropdown);

function toggleDropdown(){
    themeButtons.classList.toggle("active");
}

let themeButtons = document.querySelector(".dropdown-menu");
let lightThemeBtn = document.querySelector(".light-theme-btn");
let darkThemeBtn = document.querySelector(".dark-theme-btn");

themeButtons.addEventListener("click", toggleTheme);

if(sessionStorage.getItem("theme") == "dark") {
    toggleTheme();
}

function toggleTheme(){
    document.getElementsByTagName("body")[0].classList.toggle("dark");
    
    if(lightThemeBtn.disabled == true){
        lightThemeBtn.disabled = false,darkThemeBtn.disabled = true;
        document.getElementsByClassName("logo-img")[0].src="/IMAGES/gifOF_logo_dark.png";
        darkThemeBtn.classList.toggle("selected");
        lightThemeBtn.classList.toggle("selected");
        searchIcon.src="/IMAGES/Combined shape.svg";
        sessionStorage.setItem("theme", "dark");        
        
    }else {
        lightThemeBtn.disabled = true,darkThemeBtn.disabled = false;
        document.getElementsByClassName("logo-img")[0].src="/IMAGES/gifOF_logo.png";
        darkThemeBtn.classList.toggle("selected");
        lightThemeBtn.classList.toggle("selected");
        searchIcon.src="/IMAGES/lupa_inactive.svg";
        sessionStorage.setItem("theme", "light");
          
    }
}    

const API_KEY = "I1D4SI355OrWqfIoGxwMcoUw4V85v2Rt"

async function getRandom(n) {
    const found =  await fetch('http://api.giphy.com/v1/gifs/random' + '?api_key=' + API_KEY)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data;
            document.querySelectorAll(".random")[n].src=results.images.downsized.url;
            document.querySelectorAll(".top-window")[n].innerHTML="#"+results.title;
            document.querySelectorAll(".see-more")[n].href=results.url;
        })
        .catch(error => {
            return error;
        });
    return found;    
}

getRandom(0);
getRandom(1);
getRandom(2);
getRandom(3);

async function getTrendingResults() {
    const found =  await fetch('http://api.giphy.com/v1/gifs/trending' + '?api_key=' + API_KEY)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data;
            for(let i = 0; i<results.length;i++){
                document.querySelectorAll(".gif-grid")[1].innerHTML += 
                `<div class="gif-container">
                    <img class="gif-trending" src="${results[i].images.downsized.url}">
                    <div class="top-bar">${results[i].title}</div>
                </div>`;
            }            
        })
        .catch(error => {
            return error;
        });
    return found;    
}

getTrendingResults();
setSearchSuggestion ();

document.getElementsByTagName("input")[0].addEventListener("input", searchGif);

/*document.querySelector(".search-container").addEventListener("blur", blurFunction);*/

async function getSearchResults(search) {
    const found =  await fetch('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + API_KEY)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data;
            for(let i = 0; i<results.length;i++){
                document.querySelectorAll(".gif-trending")[i].src=results[i].images.downsized.url;
            }
        })
        .catch(error => {
            return error;
        });
    return found;    
}

function searchGif(){
    document.getElementsByClassName("search-button")[0].classList.add("active");
    document.getElementsByClassName("results-tab")[0].classList.add("active");
        if(lightThemeBtn.disabled == true){
            searchIcon.src="/IMAGES/lupa.svg"
        }else{
            searchIcon.src="/IMAGES/lupa_light.svg"
        }  
    document.getElementsByClassName("search-button")[0].addEventListener("click", doSearch);
    document.getElementsByTagName("input")[0].addEventListener("keyup", ()=>{
        if (event.keyCode === 13) {
            doSearch();
          }
    })
        
}

function doSearch(){
    if(document.getElementsByTagName("input")[0].value == false) {
        alert("El campo de busqueda está vacio")
    }else {
        let eraseGif = document.querySelectorAll(".gif-trending");
        eraseGif.forEach((Element)=>Element.src="")   
        getSearchResults(document.getElementsByTagName("input")[0].value);
        document.getElementsByClassName("today-container")[0].style.display = "none";
        document.getElementsByClassName("title")[1].innerHTML = "Resultados: "+document.getElementsByTagName("input")[0].value;
        document.querySelector(".results-tab").classList.toggle("active");
    }
       
    
 }

function blurFunction(){
    document.querySelector(".results-tab").classList.toggle("active");
}

let restCont = document.querySelectorAll(".result-container");

async function setSearchSuggestion () {
    const found =  await fetch('http://api.giphy.com/v1/gifs/trending' + '?api_key=' + API_KEY)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data;
            let restCont = document.querySelectorAll(".result-container");
            for(let i = 0; i<restCont.length;i++){
                restCont[i].innerHTML = results[i].title;     
            }       
        })
        .catch(error => {
            return error;
        });    
    
}

restCont.forEach((element)=>element.addEventListener("click", ()=>{
    document.getElementsByTagName("input")[0].value=event.target.innerHTML;
    doSearch();

}))  

