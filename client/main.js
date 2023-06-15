const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById(`fortuneBtn`)
const genBtns = document.getElementsByClassName(`genBtn`)
const form = document.querySelector(`#poke`)
const pokeSelect = document.querySelector(`#poke-select`)
const playerSelectors = document.querySelectorAll(`.player-selectors`)

const baseURL = `http://localhost:4000/api`

const getCompliment = () => {
    axios.get(`${baseURL}` + `/compliment/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get(`${baseURL}` + `/fortune/`)
        .then(res => {
            alert(res.data)
        })
        .catch(err => console.log(err))

}

const getPokeData = data => {
    data.forEach((obj, index) => {
        let option = document.createElement(`option`)
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
                axios.post(`${baseURL}` + `/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        // console.log(response)
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
    axios.delete(`${baseURL}`+`/${evt.target.id}`)
        .then(res => {
            alert(`Pokemon have been deleted. Please select a new Generation`)
        })
        .catch(err => console.log(err))
        
    poke1Selector.innerHTML = ``
    poke2Selector.innerHTML = ``
    }
    
 const damagePoke = (player) => {
    axios.put(`${baseURL}/${player}`)
        .then(res => {
            displayPoke(res.data)
        })
        .catch(err => console.log(err))
    }
    

const putPoke = evt => {
    evt.preventDefault()
    let player;
    for (let i = 0; i < playerSelectors.length; i++){
        if (playerSelectors[i].checked){
            playerSelectors[i].disabled = true
            player = playerSelectors[i].value
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
            name
        }
        axios.post(`${baseURL}/players`,body)
            .then(res => {
                displayPoke(res.data)
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const displayPoke = (obj) => {
    for (let player in obj){
        let container = document.querySelector(`#player-${player}`)
        container.innerHTML = ``
        let {name, front, hp} = obj[player]

        const pokePicture = document.createElement(`div`)
        pokePicture.classList.add(`poke-picure`)
        pokePicture.innerHTML = `<img alt='who's that pokemon?' src="${front}" class="poke-picture"/>`

        const pokeCard = document.createElement(`div`)
        pokeCard.classList.add(`poke-card`)
        pokeCard.innerHTML = 
        `<p class="poke-name">${name}</p>
        <p>${hp}</p>
        <div class="btns-container">
        <button class="poke-attack-btns" onclick="damagePoke('${player}')">Attack</button>
        </div>
        `
        container.appendChild(pokePicture)
        container.appendChild(pokeCard)
    }
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener(`click`, getFortune)
form.addEventListener(`submit`, putPoke)

for(let i = 0; i < genBtns.length; i++){
    genBtns[i].addEventListener(`click`, getGen)
}
