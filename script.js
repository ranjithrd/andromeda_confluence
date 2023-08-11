const moves = document.getElementById("moves-count")
const timeValue = document.getElementById("time")
const startButton = document.getElementById("start")
const stopButton = document.getElementById("stop")
const gameContainer = document.querySelector(".game-container")
const result = document.getElementById("result")
const controls = document.querySelector(".controls-container")
const wrapper = document.querySelector(".wrapper")
const gameDone = document.querySelector("#gamedone")
let cards
let interval
let firstCard = false
let secondCard = false
let timeValueString = ""

//Items array
let items = [
	{ name: "1", image: "/images/1.jpg" },
	{ name: "1", image: "/images/2.jpg" },
	{ name: "3", image: "/images/3.jpg" },
	{ name: "3", image: "/images/4.jpg" },
	{ name: "5", image: "/images/5.jpg" },
	{ name: "5", image: "/images/6.jpg" },
	{ name: "7", image: "/images/7.jpg" },
	{ name: "7", image: "/images/8.jpg" },
	{ name: "9", image: "/images/9.jpg" },
	{ name: "9", image: "/images/10.jpg" },
	{ name: "11", image: "/images/11.jpg" },
	{ name: "11", image: "/images/12.jpg" },
	{ name: "13", image: "/images/13.jpg" },
	{ name: "13", image: "/images/14.jpg" },
	{ name: "15", image: "/images/15.jpg" },
	{ name: "15", image: "/images/16.jpg" },
	{ name: "17", image: "/images/17.jpg" },
	{ name: "17", image: "/images/18.jpg" },
	{ name: "19", image: "/images/19.jpg" },
	{ name: "19", image: "/images/20.jpg" },
	{ name: "21", image: "/images/21.jpg" },
	{ name: "21", image: "/images/22.jpg" },
	{ name: "23", image: "/images/23.jpg" },
	{ name: "23", image: "/images/24.jpg" },
	{ name: "25", image: "/images/25.jpg" },
	{ name: "25", image: "/images/26.jpg" },
	{ name: "27", image: "/images/27.jpg" },
	{ name: "27", image: "/images/28.jpg" },
	{ name: "29", image: "/images/29.jpg" },
	{ name: "29", image: "/images/30.jpg" },
	{ name: "31", image: "/images/31.jpg" },
	{ name: "31", image: "/images/32.jpg" },
	{ name: "33", image: "/images/33.jpg" },
	{ name: "33", image: "/images/34.jpg" },
	{ name: "35", image: "/images/35.jpg" },
	{ name: "35", image: "/images/36.jpg" },
	{ name: "37", image: "/images/37.jpg" },
	{ name: "37", image: "/images/38.jpg" },
	{ name: "39", image: "/images/39.jpg" },
	{ name: "39", image: "/images/40.jpg" },
]
c = []
for (let i = 1; i < 40; i += 2) {
	c.push([...items.filter((a) => a["name"] == `${i}`)])
}

items = c

//Initial Time
let seconds = 0,
	minutes = 0
//Initial moves and win count
let movesCount = 0,
	winCount = 0

//For timer
const timeGenerator = () => {
	seconds += 1
	//minutes logic
	if (seconds >= 60) {
		minutes += 1
		seconds = 0
	}
	//format time before displaying
	let secondsValue = seconds < 10 ? `0${seconds}` : seconds
	let minutesValue = minutes < 10 ? `0${minutes}` : minutes
	timeValue.innerHTML = `<span>Time:${" "}</span>${minutesValue}:${secondsValue}`
	timeValueString = `${minutesValue}:${secondsValue}`
  mins = minutes
  secs = seconds
}

//For calculating moves
const movesCounter = () => {
	movesCount += 1
	moves.innerHTML = `<span>Moves:</span>${" " + movesCount.toString()}`
}

//Pick random objects from the items array
const generateRandom = (size = 4) => {
	//temporary array
	let tempArray = [...items]
	//initializes cardValues array
	let cardValues = []
	//size should be double (4*4 matrix)/2 since pairs of objects would exist
	size = (size * size) / 2
	//Random object selection
	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(Math.random() * tempArray.length)
		cardValues.push(tempArray[randomIndex])
		//once selected remove the object from temp array
		tempArray.splice(randomIndex, 1)
	}

	cardValues = cardValues.reduce((p, c) => [...p, ...c], [])

	return cardValues
}

const matrixGenerator = (cardValues, size = 4) => {
	gameContainer.innerHTML = ""

	//simple shuffle
	cardValues.sort(() => Math.random() - 0.5)
	for (let i = 0; i < size * size; i++) {
		/*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
		console.log(i, cardValues)
		// for (const card of cardValues[i]) {
		const card = cardValues[i]
		gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${card.name}">
          <div class="card-before">?</div>
          <div class="card-after">
          <img src="${card.image}" class="image" height="100%" width="100%"/></div>
       </div>
       `
		// }

		console.log(cardValues)
	}
	//Grid
	gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`

	//Cards
	cards = document.querySelectorAll(".card-container")
	cards.forEach((card) => {
		card.addEventListener("click", () => {
			//If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
			if (!card.classList.contains("matched")) {
				//flip the cliked card
				card.classList.add("flipped")
				//if it is the firstcard (!firstCard since firstCard is initially false)
				if (!firstCard) {
					//so current card will become firstCard
					firstCard = card
					//current cards value becomes firstCardValue
					firstCardValue = card.getAttribute("data-card-value")
				} else {
					//increment moves since user selected second card
					movesCounter()
					//secondCard and value
					secondCard = card
					let secondCardValue = card.getAttribute("data-card-value")
					if (firstCardValue == secondCardValue) {
						//if both cards match add matched class so these cards would beignored next time
						firstCard.classList.add("matched")
						secondCard.classList.add("matched")
						//set firstCard to false since next card would be first now
						firstCard = false
						//winCount increment as user found a correct match
						winCount += 1
						//check if winCount ==half of cardValues
						if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `
              <h2>ROUND COMPLETED</h2>
              <div class="spacer"></div>
              <h4>${movesCount} <span style="font-weight: 400"> moves</span></h4>
              <h4>${minutes} <span style="font-weight: 400"> minutes and </span> ${seconds} <span style="font-weight: 400"> seconds taken</span></h4>
              <div class="spacer"></div>
              <p>Follow the organizers' instructions.<br><b>DO NOT CLOSE OR RELOAD THIS PAGE</b>.</p>
              `
							stopGame()
						}
					} else {
						//if the cards dont match
						//flip the cards back to normal
						let [tempFirst, tempSecond] = [firstCard, secondCard]
						firstCard = false
						secondCard = false
						let delay = setTimeout(() => {
							tempFirst.classList.remove("flipped")
							tempSecond.classList.remove("flipped")
						}, 900)
					}
				}
			}
		})
	})
}

//Start game
startButton.addEventListener("click", () => {
	movesCount = 0
	seconds = 0
	minutes = 0
	//controls amd buttons visibility

	controls.classList.add("hide")
	startButton.classList.add("hide")
	wrapper.classList.remove("hide")

	//Start timer
	interval = setInterval(timeGenerator, 1000)
	//initial moves
	moves.innerHTML = `<span>Moves:</span>${" "} ${movesCount}`
	initializer()
})

wrapper.classList.add("hide")
result.classList.add("hide")

function stopGame() {
	// controls.classList.remove("hide")
	// stopButton.classList.add("hide")
	startButton.classList.remove("hide")
  wrapper.classList.add("hide")
	clearInterval(interval)
	result.classList.remove("hide")
}

//Stop game
// stopButton.addEventListener(
// 	"click",
// 	(stopGame = () => {
// 		controls.classList.remove("hide")
// 		stopButton.classList.add("hide")
// 		startButton.classList.remove("hide")
// 		clearInterval(interval)
// 	})
// )

//Initialize values and func calls
const initializer = () => {
	result.innerText = ""
	winCount = 0
	let cardValues = generateRandom()
	console.log(cardValues)
	matrixGenerator(cardValues)
}
