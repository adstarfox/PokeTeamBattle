let pokeArray = [] 

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req,res) => {
        const fortunes = [`You will find a great fortune along your path`, `You will find the thing you've been looking for`, `You will soon be entrusted with a great responsibility`,`Patience will bring you great peace`, `You will cross paths with a long lost friend`,`A new adventure awaits you`]

        let randomIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIndex]

        res.status(200).send(randomFortune)
    },
    savePokemon: (req, res) => {
        // console.log(req.body)
        for (let i = 0; i < req.body.length;i++){
            req.body[i].attack = Math.floor(Math.random() * 100)
            req.body[i].hp = 100
        }
        // console.log(req.body)
        pokeArray.push(req.body)
        res.status(200).send(pokeArray)
    },
    getPokemon: (req, res) => {
        res.status(200).send(pokeArray)
    },
    deletePoke: (req,res) => {
        pokeArray = []
        res.status(200).send(pokeArray)
    },
    updatePoke: (req,res) => {
        // console.log(req.params.name)
        let {name} = req.params
        console.log(pokeArray)
        let index = pokeArray.findIndex(i => i[0].name === name)
        console.log(index)

        res.status(200).send(`50`)
    }

}