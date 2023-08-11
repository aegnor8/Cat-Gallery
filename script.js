"use strict";
const categorySelect = document.getElementById("category");
const getButton = document.getElementById("get-button");
const gallery = document.querySelector(".gallery");
const API_URL = "https://api.thecatapi.com";
const API_KEY = "live_6cyCrPSlvq94nTQeY94yP2LoOL4UpJKPkSmolW6bSJaQJXLpGROsMIm6RkqxbzVu"; // your API key goes here;
const favouritesButton = document.getElementById("get-favourites");


const URL_category = "https://api.thecatapi.com/v1/categories";
let selectedCategory;

document.addEventListener("DOMContentLoaded", async function() {
  let response = await fetch(URL_category);
  let data = await response.json();
  selectedCategory = data[0].id;
  for(let i = 0; i < data.length; i++){
    const option = document.createElement("option");
    option.value = data[i].id;
    option.textContent = data[i].name;
    categorySelect.appendChild(option);
  }
});

categorySelect.addEventListener("change", function() {
  selectedCategory = categorySelect.value;
});

getButton.addEventListener("click", async function(){
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-api-key", API_KEY);
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let response = await fetch(`${API_URL}/v1/images/search?category_ids=${selectedCategory}&format=json&limit=9`, requestOptions);
  let data = await response.json();
  gallery.innerHTML = "";
  console.log(data);
  data.forEach(image => {
    const div = document.createElement("div")
    div.classList.add("gallery-item");
    const img = document.createElement("img");
    const heart = document.createElement("span");
    img.src = image.url;
    img.alt = "Cat Image";
    img.id = image.id;
    heart.innerHTML = "&#x2764;";
    div.appendChild(img);
    heart.classList.add("heart");
    div.appendChild(heart);
    gallery.appendChild(div);
    div.addEventListener("click", addToFavourite);
  });
});




/* Bonus */

async function addToFavourite(e) {
  e.currentTarget.classList.toggle("showheart");
  const DIV = e.currentTarget;
  const IMG = DIV.querySelector("img");
  const ID = IMG.id;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-api-key", API_KEY);

let raw = JSON.stringify({
  "image_id": ID,
  "sub_id": "user"
});

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.thecatapi.com/v1/favourites/", requestOptions);
};

favouritesButton.addEventListener("click", async function(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-api-key", API_KEY);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let response = await fetch("https://api.thecatapi.com/v1/favourites?sub_id=user&format=json&limit=9&order=DESC", requestOptions);
  let data = await response.json();
  gallery.innerHTML = "";
  data.forEach(image => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");
    const img = document.createElement("img");
    const heart = document.createElement("span");
    heart.innerHTML = "&#x2764;";
    img.src = image.image.url;
    img.alt = "Cat Image";
    img.id = image.image.id;
    heart.innerHTML = "&#x2764;";
    div.appendChild(img);
    heart.classList.add("heart");
    div.appendChild(heart);
    gallery.appendChild(div);
    div.addEventListener("click", addToFavourite);
  });
  
});


