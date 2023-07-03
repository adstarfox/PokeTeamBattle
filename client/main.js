const title = document.getElementById('title')
const startBtn = document.getElementById('startBtn')
const genBtns = document.getElementsByClassName(`genBtn`)
const genPick = document.getElementById('genPick')
const pokeForm = document.querySelector(`#poke`)
const nameForm = document.querySelector('#player-name')
const pokeSelect1 = document.querySelector(`#poke-select1`)
const pokeSelect2 = document.querySelector(`#poke-select2`)
const pokeSelect3 = document.querySelector(`#poke-select3`)
const playerNames = document.querySelectorAll('.player-names')
const playerSelectors = document.querySelectorAll(`.player-selectors`)
const pName = document.querySelectorAll(`.pName`)
const startOverBtn = document.querySelector('#start-over')
const p1Team = document.querySelector('#player-0')
const p2Team = document.querySelector('#player-1')

let playerOneTeam = []
let playerTwoTeam = []

const getStarted = () => {
    startBtn.classList.add('purple')
    nameForm.classList.remove('purple')
}

const getPokeData = data => {
    data.forEach((obj, index) => {
        option = document.createElement(`option`)
        let {name} = obj
        option.value = name
        option.textContent = `#${index +1} ` + name
        pokeSelect1.appendChild(option)
    })
    pokeSelect2.innerHTML = pokeSelect1.innerHTML
    pokeSelect3.innerHTML = pokeSelect1.innerHTML
    // console.log(pokeSelect1.innerHTML)
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
            genPick.classList.add('purple')
            pokeForm.classList.remove('purple')
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
     let hitPlayer = player === 0 ? 1 : 0
    //  console.log(`${player}:${hitPlayer}`)
    axios.put(`api/${hitPlayer}`)
        .then(res => {
            playerOneTeam = []
            playerTwoTeam = []
            for(let i = 0; i < 6;i++){
                if (res.data[i].player === '0'){
                    playerOneTeam.push(res.data[i])
                }else if (res.data[i].player === '1'){
                    playerTwoTeam.push(res.data[i])
                }
            }
            displayPoke();
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
    
    let pokeValues = [pokeSelect1.value, pokeSelect2.value,pokeSelect3.value]


    for (let i = 0; i < 3; i++){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeValues[i]}/`)
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
                    if(res.data.length === 6){
                        for(let i = 0; i < 6;i++){
                            // console.log(res.data[i])
                            if (res.data[i].player === '0'){
                                // console.log(res.data)
                                playerOneTeam.push(res.data[i])
                            }else if (res.data[i].player === '1'){
                                // console.log(res.data)
                                playerTwoTeam.push(res.data[i])
                            }
                        }
                        displayPoke();
                    }
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
}

const capitalize = str => {
    return str[0].toUpperCase() + str.slice(1)
}

const playerName = evt => {
    evt.preventDefault()
        playerNames[0].textContent = capitalize(pName[0].value)
        playerNames[1].textContent = capitalize(pName[1].value)
        nameForm.classList.add('purple')
        genPick.classList.remove('purple')
}

const makePokeCard = (poke) => {
    let newHp = poke.hp <= 0 ? 0 : poke.hp

    if (newHp === 0){
        // alert(`${capitalize(poke.playerName)}'s ${capitalize(poke.name)} has fainted!`)
        return `<div class="fainted" class="poke-cards">
        <p class="poke-name">Fainted ${capitalize(poke.name)}</p>
        <img alt='who's that pokemon?' src="${poke.front}" class="poke-picture"/>
        <p>HP:${newHp}</p>
        <button class="poke-attack-btns" onclick="damagePoke(${poke.player})" disabled>Attack</button>
        </div>`
    } else {
        return `<div class="poke-cards">
        <p class="poke-name">${capitalize(poke.name)}</p>
        <img alt='who's that pokemon?' src="${poke.front}" class="poke-picture"/>
        <p>HP:${newHp}</p>
        <button class="poke-attack-btns" onclick="damagePoke(${poke.player})">Attack</button>
        </div>`
    }

}

const displayPoke = () => {
    pokeForm.classList.add('purple')
    p1Team.innerHTML = `${playerNames[0].textContent}'s Team`
    p2Team.innerHTML = `${playerNames[1].textContent}'s Team`

    playerOneTeam.forEach((poke) => {
        let pokeHtml = makePokeCard(poke)
        p1Team.innerHTML += pokeHtml
    })

    playerTwoTeam.forEach((poke) => {
        let pokeHtml = makePokeCard(poke)
        p2Team.innerHTML += pokeHtml
    })
    
}


pokeForm.addEventListener(`submit`, putPoke)
nameForm.addEventListener(`submit`, playerName)

for(let i = 0; i < genBtns.length; i++){
    genBtns[i].addEventListener(`click`, getGen)
}

startOverBtn.addEventListener('click', deletePoke)