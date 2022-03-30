//SELECTORS
const containerDiv = document.querySelector('.container');
const picSection = document.querySelector('#game-section');
const startBtn = document.getElementById("start-btn");
const inputBox = document.querySelector('.name-input');
const picOne = document.querySelector("#pic-one");
const picTwo = document.querySelector("#pic-two");
const result = document.querySelector('#result');

const picArray = [];
const URL = "https://api.unsplash.com/photos/random?orientation=portrait&count=6&client_id=Z4VtZg5imv416TqNew-jUC7wGSEMVvWlWojNat291VQ"; // getting n random images


fetch(URL)
    .then(function (response) {
        if (response.ok)
            return response.json()
        else
            return Promise.reject("Failed!")
    })

    .then(function (data) {

        for (let i = 0; i < data.length; i++) {
            picArray.push(data[i].urls.small);
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

        picOne.addEventListener('click', picOneClic);
        picTwo.addEventListener('click', picTwoClic);

        function picOneClic() {
            if (picArray.length > 1) {
                picArray.pop();
                picTwo.src = picArray[picArray.length - 1];
            } else if (picArray.length === 1) {
                endGame(playerName, picArray);
                picOne.removeEventListener('click', picOneClic);
                picTwo.removeEventListener('click', picTwoClic);
            }
        }

        function picTwoClic() {
            if (picArray.length > 1) {
                picArray.shift();
                picOne.src = picArray[0];
            } else if (picArray.length === 1) {

                endGame(playerName, picArray);
                picOne.removeEventListener('click', picOneClic);
                picTwo.removeEventListener('click', picTwoClic);
            }
        }

    }
}


function endGame(playerName, picArray) {

    const personality = generatePersonality();
    result.innerHTML = `${playerName}, this is what this picture says about your personality: you are ${personality}.`;

    containerDiv.remove();

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('resultDiv');

    const finalPic = document.createElement('img');
    finalPic.src = picArray[0];
    finalPic.classList.add('grid-item');

    resultDiv.appendChild(finalPic);
    picSection.appendChild(resultDiv);

}


//returns a random
function generatePersonality() {
    const personalityArray = ["nice", "adventurous", "courageous", "diligent", "humble", "grumpy", "honest", "shy", "strong", "organized", "reckless", "passionate", "idealist", "creative", "energetic", "curious", "clever", "practical", "compassionate", "cheerful", "spontaneous"];
    return personalityArray[Math.floor(Math.random() * personalityArray.length)];
}

