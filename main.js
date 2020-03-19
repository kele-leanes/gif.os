
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

window.addEventListener("click", () => document.querySelector(".results-tab").classList.remove("active"))

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

/* Close Icon Function*/

let closeIcon = document.querySelectorAll(".close-icon");



function getDataBtn() {
    let btnNum = event.target.getAttribute("data-num");
    document.querySelector(".gif-grid").removeChild(document.querySelectorAll(".gif-container")[btnNum])
    let gifContainer = document.createElement("div");
    gifContainer.setAttribute("class","gif-container");
    document.querySelector(".gif-grid").appendChild(gifContainer)
    document.querySelectorAll(".gif-container").forEach((element, index) => element.dataset.num = index);
    document.querySelectorAll(".close-icon").forEach((element, index) => element.dataset.num = index);
    getRandom(3);

}

const API_KEY = "I1D4SI355OrWqfIoGxwMcoUw4V85v2Rt"

async function getRandom(n) {
    const found =  await fetch('http://api.giphy.com/v1/gifs/random' + '?api_key=' + API_KEY)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data;
            document.querySelectorAll(".gif-container")[n].dataset.num = n;
            document.querySelectorAll(".gif-container")[n].innerHTML = 
            `<img class="random" src="${results.images.downsized.url}">
            <div class="top-window">#${results.title}</div>
            <img class="close-icon" src="/IMAGES/button_close.svg">
            <a class="see-more" href="${results.url}" target="_blank">Ver más...</a>`
            document.querySelectorAll(".close-icon")[n].dataset.num = n;
            document.querySelectorAll(".close-icon")[n].addEventListener("click", getDataBtn);

            
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
    const found =  await fetch('http://api.giphy.com/v1/gifs/trending' + '?api_key=' + API_KEY + '&limit=15')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data;
            for(let i = 0; i<15;i++){
                document.querySelectorAll(".gif-grid")[1].innerHTML += 
                `<div class="gif-trending"${sizeCheck()}>
                    <a href="${results[i].url}" target="_blank"><img class="gif-img" src="${results[i].images.downsized.url}"></a>
                    <div class="bottom-bar">${results[i].title}</div>
                </div>`;
                function sizeCheck() {
                    if(results[i].images.downsized.width > 500 && i%2 == 0) {
                        return `style="width:596px"`;
                    }
                }
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

async function getSearchResults(search) {
    const found =  await fetch('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + API_KEY + '&limit=' + counter)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data;
            for(let i = 0; i<results.length;i++){
                document.querySelectorAll(".gif-img")[i].src=results[i].images.downsized.url;
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
        let eraseGif = document.querySelectorAll(".gif-img");
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



// Infinit Scroll function

let i = 15;

async function getMoreTrending() {
    const found =  await fetch('http://api.giphy.com/v1/gifs/trending' + '?api_key=' + API_KEY + '&limit=60')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results = data.data; 
            for(i;i<(i+15);i++){
                console.log(i)
                document.querySelectorAll(".gif-grid")[1].innerHTML += 
                `<div class="gif-trending"${sizeCheck()}>
                    <a href="${results[i].url}" target="_blank"><img class="gif-img" src="${results[i].images.downsized.url}"></a>
                    <div class="bottom-bar">${results[i].title}</div>
                </div>`;
                function sizeCheck() {
                    if(results[i].images.downsized.width > 500 && i%2 == 0) {
                        return `style="width:596px"`;
                    }
                }
            } return i = i+15;          
        })
        .catch(error => {
            return error;
        });
    return found;    
}


window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        getMoreTrending();
    }
};

// Contador de visitas

function getexpirydate( nodays){

    var UTCstring;
    
    Today = new Date();
    
    nomilli=Date.parse(Today);
    
    Today.setTime(nomilli+nodays*24*60*60*1000);
    
    UTCstring = Today.toUTCString();
    
    return UTCstring;
    
    }
    
    function getcookie(cookiename) {
    
    var cookiestring=""+document.cookie;
    
    var index1=cookiestring.indexOf(cookiename);
    
    if (index1==-1 || cookiename=="") return "";
    
    var index2=cookiestring.indexOf(";",index1);
    
    if (index2==-1) index2=cookiestring.length;
    
    return unescape(cookiestring.substring(index1+cookiename.length+1,index2));
    
    }
    
    function setcookie(name,value,duration){
    
    cookiestring=name+"="+escape(value)+";EXPIRES="+getexpirydate(duration);
    
    document.cookie=cookiestring;
    
    if(!getcookie(name)){
    
    return false;
    
    }
    
    else{
    
    return true;
    
    }
    
    }
    
    count= getcookie("counter");
    
    if(isNaN(count)){
    
    y=setcookie("counter",0,1);
    
    count=0;
    
    }
    
    count++;
    

    document.querySelector(".top-title").innerHTML = `¡Bienvenidos/as a Guifos.com! ——————Donde los gifs están.////// Número de visitas: ${count} `
    
    y=setcookie("counter",count,1);
    
    // fin de obtencion de cookie
   
    
    
