const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";

const image = document.querySelector("#main");
const loader = document.querySelector("#loader");
const select = document.querySelector('#dogs');

// Loads select from API
fetch(BREEDS_URL)
    .then( response => response.json())
    .then( data => {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);


        breedsArray.forEach(createOption);

        function createOption(breed) {
            const option = document.createElement('option');
            option.value = breed;
            option.innerText = breed;
            select.appendChild(option);
        }
    });

    // Loads random dog image as default
fetch("https://dog.ceo/api/breeds/image/random")
    .then( response => response.json())
    .then( data => {
        image.src = data.message;
        loader.classList.remove("show");
        image.classList.add("show");
    })

select.addEventListener("change", displaySelectedDog);

function displaySelectedDog(event) {
    const URL =`https://dog.ceo/api/breed/${event.target.value}/images/random`

    // Show loading spinner
    image.classList.remove("show");
    loader.classList.add("show");

    fetch(URL)
        .then( response => response.json() )
        .then( data => {
            image.src = data.message;
            loader.classList.remove("show");
            image.classList.add("show");
        })

};