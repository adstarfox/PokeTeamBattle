let pokeArray = [] 
let players = {}

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
        pokeArray = []
        // console.log(req.body)
        for (let i = 0; i < req.body.length;i++){
            pokeArray.push(req.body[i])
        }
        // console.log(pokeArray)
        res.status(200).send(pokeArray)
    },
    savePlayers: (req, res) => {
        let {id, front, player, name} = req.body
        players[player] = {
            name,
            id, 
            front,
            hp: 100
        }
        res.status(200).send(players)
    },
    getPokemon: (req, res) => {
        res.status(200).send(pokeArray)
    },
    updatePoke: (req,res) => {
        // console.log(req.params.name)
        let {player} = req.params
        // console.log(pokeArray)
        let damage = Math.floor(Math.random() * 50)
        players[player].hp -= damage

        res.status(200).send(players)
    }

}