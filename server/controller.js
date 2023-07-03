let pokeArray = [] 
let players = []


module.exports = {
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
        req.body.hp = 100
        players.push(req.body)
        res.status(200).send(players)
    },
    getPokemon: (req, res) => {
        res.status(200).send(pokeArray)
    },
    getPlayers: (req,res) => {
        res.status(200).send(players)
    },
    updatePoke: (req,res) => {
        let rndPlayer = Math.floor(Math.random() * 3)
        let damage = Math.floor(Math.random() * 25)

        if(req.params.player === '0'){
            players[rndPlayer].hp -= damage
        }else if (req.params.player === '1'){
            players[rndPlayer + 3].hp -= damage
        }

        res.status(200).send(players)
    },
    deletePoke: (req,res) => {
        pokeArray = []
        players = []
        res.status(200).send('Starting the simulation over')
    }

}