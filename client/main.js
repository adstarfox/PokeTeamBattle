const genBtns = document.getElementsByClassName(`genBtn`)
const pokeForm = document.querySelector(`#poke`)
const nameForm = document.querySelector('#player-name')
const pokeSelect = document.querySelector(`#poke-select`)
const playerNames = document.querySelectorAll('.player-names')
const playerSelectors = document.querySelectorAll(`.player-selectors`)
const pName = document.querySelectorAll(`.pName`)
const startOverBtn = document.querySelector('#start-over')


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

            const genSec = document.querySelector('#genPick')
            genSec.classList.add('purple')
        }
    
const deletePoke = evt => {
    axios.delete(`/api/start-over`)
        .then(res => {
            alert(res.data)
            location.reload()
        })
        .catch(err => console.log(err))

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

const capitalize = str => {
    return str[0].toUpperCase() + str.slice(1)
}

const fainted = (container, playerName, name) => {
    const disButton = container.querySelector('button')  
    alert(`${playerName}'s ${capitalize(name)} has fainted`)
    container.classList.add('fainted')
    disButton.disabled = true
}

const playerName = evt => {
    evt.preventDefault()
        playerNames[0].textContent = capitalize(pName[0].value) + `'s`
        playerNames[1].textContent = capitalize(pName[1].value) + `'s`
        nameForm.classList.add('purple')
}

const displayPoke = (obj) => {
    for (let player in obj){
        let container = document.querySelector(`#player-${player}`)
        container.innerHTML = ``
        let {playerName, name, front, hp} = obj[player]

        let pokeName = capitalize(name)

        let newHp = hp <= 0 ? 0 : hp
        
        const playerTitle = document.createElement('h1')
        playerTitle.innerText = `${playerName}`
        
        const pokePicture = document.createElement(`div`)
        pokePicture.classList.add(`poke-picure`)
        pokePicture.innerHTML = `<img alt='who's that pokemon?' src="${front}" class="poke-picture"/>`
        
        const pokeCard = document.createElement(`div`)
        pokeCard.classList.add(`poke-card`)
        pokeCard.innerHTML = 
        `<p class="poke-name">${pokeName}</p>
        <p>HP:${newHp}</p>
        <div class="btns-container">
        <button class="poke-attack-btns" onclick="damagePoke('${player}')">Attack</button>
        </div>
        `        
        container.appendChild(pokeCard)
        container.appendChild(pokePicture)
        container.appendChild(playerTitle)

        if (newHp === 0){
            fainted(container, playerName, name);
        }
    }
}

pokeForm.addEventListener(`submit`, putPoke)
nameForm.addEventListener(`submit`, playerName)

for(let i = 0; i < genBtns.length; i++){
    genBtns[i].addEventListener(`click`, getGen)
}

startOverBtn.addEventListener('click', deletePoke)