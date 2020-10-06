// "use strict";

// // import debounce from 'lodash.debounce'
// // import throttle from 'lodash.throttle'

// //Load certificate
// async function loadCertificates(searchingValue = "certificate", pageNumber=1, pageSize = 50){
//     if(searchingValue == ""){
//         searchingValue = "certificate";
//     }

//     let url = `http://localhost:8080/certificates/filter?searchBy=name=${searchingValue}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
//     const response = await fetch(url);

//     if(response.ok){
//         const jsonResponse = await response.json();
//         if(jsonResponse._embedded == undefined){
//             writeNotFound(searchingValue);
//             return;
//         }

//         const certificates = await jsonResponse._embedded.certificateDtoList;
//         addCertificatesToDom(certificates);
//     } else {
//         console.log("Could not load certificates: " + response.status);
//     }
// }

// async function writeNotFound(searchingValue){
//     parentElement.innerHTML = `<p class="text-not-found">Results weren't found for your search: ${searchingValue}</p>`;
// }

// async function removeContent(){
//     while(parentElement.firstChild){
//         parentElement.removeChild(parentElement.firstChild)
//     }
// }

// //search
// document.querySelector("#search").addEventListener("input", searchCertificates);
// async function searchCertificates(event){
//     let searchingValue = event.target.value;

//     removeContent();
//     //setTimeout(loadCertificates(searchingValue), 500);
//     loadCertificates(searchingValue);
// }

// //scroll
// window.addEventListener("scroll", infiniteScroll);
// let currentPage = 1;
// async function infiniteScroll(){
//     let positionBottom = document.documentElement.getBoundingClientRect().bottom;
//     if(positionBottom < 1000 && positionBottom > 790){
//         const searchingValue = document.querySelector("#search").value.trim();

//         await loadCertificates(searchingValue, currentPage++, 10);
//     }
// }


// window.addEventListener("scroll", changeStyleScrollBtn);
// async function changeStyleScrollBtn(){
//     let positionTop = document.documentElement.getBoundingClientRect().top;
//     const classListScrollUp = document.querySelector("#scroll-up").classList;
//     const classListScrollSaved = document.querySelector("#scroll-saved").classList;

//     if(positionTop < -500){
//         if(!classListScrollSaved.contains("hide")){
//             classListScrollSaved.add("hide");
//         }

//         if(classListScrollUp.contains("hide")){
//             classListScrollUp.remove("hide");
//         }
//     } else {
//         const isClicked = localStorage.isClicked;
//         if(isClicked && classListScrollSaved.contains("hide")){
//             classListScrollSaved.remove("hide");
//         }

//         if(!classListScrollUp.contains("hide")){
//             classListScrollUp.add("hide");
//         }
//     }
// }


// document.querySelector("#scroll-up").addEventListener('click', scrollTop);
// async function scrollTop(){
//     savePositionInLocalStorage();
//     window.scrollTo(0, 0);
// }


// document.querySelector("#scroll-saved").addEventListener('click', scrollToSavedPosition);
// document.querySelector("#link-catalog-item").addEventListener('click', savePositionInLocalStorage);
// async function scrollToSavedPosition(){
//     const xOffset = localStorage.scrollLeft;
//     const yOffset = localStorage.scrollTop;

//     window.scrollTo(xOffset, yOffset);
// }

// async function savePositionInLocalStorage(){
//     localStorage.isClicked = true;
//     localStorage.scrollLeft = window.pageXOffset;
//     localStorage.scrollTop = window.pageYOffset;
// }
