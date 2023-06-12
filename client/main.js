const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById(`fortuneBtn`)
const genBtns = document.getElementsByClassName(`genBtn`)
const deleteBtn = document.getElementById(`deleteBtn`)
const selectors = document.querySelector(`select`)
const poke1Selector = document.getElementById(`poke1-select`)
const poke2Selector = document.getElementById(`poke2-select`)
const pokeContainer1 = document.querySelector(`#poke-container1`)
const pokeContainer2 = document.querySelector(`#poke-container2`)

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
        let option2 = document.createElement(`option`)
        let {name} = obj
        option.value = name
        option2.value = name
        option.textContent = `#${index +1} ` + name
        option2.textContent = `#${index +1} ` + name
        poke1Selector.appendChild(option) 
        poke2Selector.appendChild(option2)
    })
}

const getGen = evt => {
    if (evt.target.id === `genOne`){
        console.log(`Gen One Selected`)
        axios.get(`https://pokeapi.co/api/v2/generation/1/`)
            .then(res => {
                // console.log(res.data)
                axios.post(`${baseURL}` + `/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        // console.log(response)
                        let pokeData = response.data[0]
                        getPokeData(pokeData) 
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    } else if (evt.target.id === `genTwo`){
        console.log(`Gen two selected`)
        axios.get(`https://pokeapi.co/api/v2/generation/2/`)
            .then(res => {
                // console.log(res.data.pokemon_species)
                axios.post(`${baseURL}` + `/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        // console.log(response)
                        let pokeData = response.data[0]
                        // console.log(pokeData)
                        getPokeData(pokeData)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    } else if (evt.target.id === `genThree`){
        console.log(`Gen Three Selected`)
        axios.get(`https://pokeapi.co/api/v2/generation/3/`)
            .then(res => {
                // console.log(res.data.pokemon_species)
                axios.post(`${baseURL}` + `/gen-selected`,res.data.pokemon_species)
                    .then(response => {
                        // console.log(response)
                        let pokeData = response.data[0]
                        // console.log(pokeData)
                        getPokeData(pokeData)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
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
    
 const damagePoke = (name, event) => {
    axios.put(`${baseURL}/${name}`, event)
        .then(res => {
            console.log(res.data)
            const pokeHealth2 = document.createElement(`div`)
            pokeHealth2.classList.add(`poke-health`)
            pokeHealth2.innerHTML = `<p class="poke-health">${res.data}</p>`
            pokeContainer2.appendChild(pokeHealth2)
        })
        .catch(err => console.log(err))
    }
    
    
    
    const pokeCard = document.createElement(`div`)
    const pokePicture = document.createElement(`div`)
pokePicture.classList.add(`poke-picure`)
pokeCard.classList.add(`poke-card`)

const putPoke = evt => {
    evt.preventDefault()
    pokeContainer1.innerHTML = ``
    // let pokePicture.innerHTML = ``
    console.log(evt.target.value)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${evt.target.value}/`)
    .then(res => {
        // console.log(res.data.sprites)
        let {front_default: front} = res.data.sprites
        pokePicture.innerHTML = `<img alt='who's that pokemon?' src="${front}" class="poke-picture"/>`
        pokeContainer1.appendChild(pokePicture)
    })
    .catch(err => console.log(err))
    
    
    pokeCard.innerHTML = 
    `<p class="poke-name">${evt.target.value}</p>
    <div class="btns-container">
    <button class="poke-attack-btns" onclick="console.log('attacked')">Attack</button>
    <p class="poke-health">HP: 5</p>
    </div>
    `
    pokeContainer1.appendChild(pokeCard)
}
const putPoke2 = evt => {
    evt.preventDefault()
    pokeContainer2.innerHTML = ``
    console.log(evt.target.value)
    const pokeCard = document.createElement(`div`)
    const pokePicture2 = document.createElement(`div`)
    pokePicture2.classList.add(`poke-picure`)
    pokeCard.classList.add(`poke-card`)
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${evt.target.value}/`)
    .then(res => {
        // console.log(res.data.sprites)
        let {front_default: front} = res.data.sprites
        pokePicture2.innerHTML = `<img alt='who's that pokemon?' src="${front}" class="poke-picture"/>`
        pokeContainer2.appendChild(pokePicture2)
    })
    .catch(err => console.log(err))
    
    pokeCard.innerHTML = 
    `<p class="poke-name">${evt.target.value}</p>
    <div class="btns-container">
    <button class="poke-attack-btns" onclick="damagePoke('${evt.target.value}')">Attack</button>
    </div>
    `
    pokeContainer2.appendChild(pokeCard)
}


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener(`click`, getFortune)
deleteBtn.addEventListener(`click`, deletePoke)
poke1Selector.addEventListener(`change`, putPoke)
poke2Selector.addEventListener(`change`, putPoke2)

for(let i = 0; i < genBtns.length; i++){
    genBtns[i].addEventListener(`click`, getGen)
}
