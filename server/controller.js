let pokeArray = [] 
let players = {}

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
        // players = {}
        // console.log(req.body)
        let {id, front, player, playerName, name} = req.body
        players[player] = {
            playerName,
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
        let damage = Math.floor(Math.random() * 25)
        players[player].hp -= damage

        res.status(200).send(players)
    }

}