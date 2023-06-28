const genBtns = document.getElementsByClassName(`genBtn`)
const pokeForm = document.querySelector(`#poke`)
const nameForm = document.querySelector(`#player-name`)
const pokeSelect = document.querySelector(`#poke-select`)
const playerNames = document.querySelectorAll('.player-names')
const playerSelectors = document.querySelectorAll(`.player-selectors`)
const pName = document.querySelectorAll(`.pName`)


const getPokeData = data => {
    data.forEach((obj, index) => {
        option = document.createElement(`option`)
        let {name} = obj
        option.value = name
        option.textContent = `#${index +1} ` + name
        pokeSelect.appendChild(option) 
    })
}

const getGen = evt => {
        axios.get(`https://pokeapi.co/api/v2/generation/${evt.target.id}`)
            .then(res => {
                // console.log(res.data)
                axios.post(`/api/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        let pokeData = response.data
                        getPokeData(pokeData) 
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        }
    
const deletePoke = evt => {
    pokeContainer1.innerHTML = ``
    pokeContainer2.innerHTML = ``
    axios.delete(`/api/${evt.target.id}`)
        .then(res => {
            alert(`Pokemon have been deleted. Please select a new Generation`)
        })
        .catch(err => console.log(err))
        
    poke1Selector.innerHTML = ``
    poke2Selector.innerHTML = ``
    }
    
 const damagePoke = (player) => {
     let hitPlayer = player === '0' ? '1' : '0'
    //  console.log(`${player}:${hitPlayer}`)
    axios.put(`api/${hitPlayer}`)
        .then(res => {
                displayPoke(res.data)
        })
        .catch(err => console.log(err))
    }
    

const putPoke = evt => {
    evt.preventDefault()
    let player;
    let playerName;
    for (let i = 0; i < playerSelectors.length; i++){
        if (playerSelectors[i].checked){
            playerSelectors[i].disabled = true
            player = playerSelectors[i].value
            playerName = playerNames[i].textContent
        }
    }
    // console.log(evt.target.value)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSelect.value}/`)
    .then(res => {
        // console.log(res.data.sprites)
        let {front_default: front} = res.data.sprites
        let {id, name} = res.data
        let body = {
            id,
            front,
            player,
            playerName,
            name
        }
        axios.post(`/api/players`,body)
            .then(res => {
                displayPoke(res.data)
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const playerName = evt => {
    evt.preventDefault()
    playerNames[0].textContent = `${pName[0].value}`
    playerNames[1].textContent = `${pName[1].value}`
}

const displayPoke = (obj) => {
    for (let player in obj){
        let container = document.querySelector(`#player-${player}`)
        container.innerHTML = ``
        let {playerName, name, front, hp} = obj[player]

        let newHp = hp <= 0 ? 0 : hp

        const playerTitle = document.createElement('h1')
        playerTitle.innerText = `${playerName}`

        const pokePicture = document.createElement(`div`)
        pokePicture.classList.add(`poke-picure`)
        pokePicture.innerHTML = `<img alt='who's that pokemon?' src="${front}" class="poke-picture"/>`

        const pokeCard = document.createElement(`div`)
        pokeCard.classList.add(`poke-card`)
        pokeCard.innerHTML = 
        `<p class="poke-name">${name}</p>
        <p>HP:${newHp}</p>
        <div class="btns-container">
        <button class="poke-attack-btns" onclick="damagePoke('${player}')">Attack</button>
        </div>
        `
        container.appendChild(pokeCard)
        container.appendChild(pokePicture)
        container.appendChild(playerTitle)
    }
}

pokeForm.addEventListener(`submit`, putPoke)
nameForm.addEventListener(`change`, playerName)

for(let i = 0; i < genBtns.length; i++){
    genBtns[i].addEventListener(`click`, getGen)
}
