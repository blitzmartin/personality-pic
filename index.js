/*

Initial condition: no player name, placeholders for the 2 images, hidden paragraph-result somewhere in the page

Fetch URL of 20 images, push urls values in an const array of items

Player inputs name

Start btn is pressed

Player name stored in a playerName const

Input field is cleared

Change the src of the 2 images: pic-one will get urls of array[0] and pic-two will get urls of array[array.length - 1]

One of the two images is clicked

If pic-one is clicked, array.pop() (removes last item)
If pic-two is clicked, array.shift() (removes first item)

Do this until (array.length > 1)

When array.length === 1, the game ends.

Hidden paragraph is revealed: "playerName your favourite food or drink is:"" and image below

*/

//SELECTORS
const startBtn = document.getElementById("start-btn");
const inputBox = document.querySelector('.name-input');
const picOne = document.querySelector("#pic-one");
const picTwo = document.querySelector("#pic-two");
const result = document.querySelector('#result');

const picArray = [];
const URL = "https://api.unsplash.com/photos/random?orientation=portrait&count=20&client_id=Z4VtZg5imv416TqNew-jUC7wGSEMVvWlWojNat291VQ"; // getting 20 images


fetch(URL)
    .then(function (response) {
        if (response.ok)
            return response.json()
        else
            return Promise.reject("Failed!")
    })

    .then(function (data) {

        for (let i = 0; i < data.length; i++) {
            picArray.push(data[i].urls.regular);
        }
        console.log(picArray);

    })
    .catch(function (err) {
        console.log("Something went wrong: " + err)
    })

//EVENT LISTENERS
startBtn.addEventListener('click', loadPicture);



//FUNCTIONS

function loadPicture(event) {
    
    if (inputBox.value.length > 0) {

        const playerName = inputBox.value;
        inputBox.value = "";
        console.log(playerName);

        picOne.src = picArray[0];
        picTwo.src = picArray[picArray.length - 1];

        picOne.addEventListener('click', function () {
            if (picArray.length > 1) {
                picArray.pop();
                picTwo.src = picArray[picArray.length - 1];
                endGame(playerName);
            } 
        });

        picTwo.addEventListener('click', function () {
            if (picArray.length > 1) {
                picArray.shift();
                picOne.src = picArray[0];
                endGame(playerName);
            }
        });
    }
}

function endGame(playerName){
    result.innerHTML = `Congratulations ${playerName} for choosing this amazing Lego image!`;

}


/* 
const URL = "https://api.unsplash.com/photos/random?collections=1131562&orientation=portrait&count=10&client_id=Z4VtZg5imv416TqNew-jUC7wGSEMVvWlWojNat291VQ"; 

const URL = "https://api.unsplash.com/photos/random?count=10&client_id=Z4VtZg5imv416TqNew-jUC7wGSEMVvWlWojNat291VQ";

*/