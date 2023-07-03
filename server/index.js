const express = require("express");
const cors = require("cors");
const path = require('path')

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('client'))

const { 
    savePokemon,
    savePlayers,
    getPokemon,
    getPlayers,
    deletePoke,
    updatePoke
        } = require('./controller')

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"index.html"))
})

app.get(`/api/get-pokemon`, getPokemon)
app.get(`/api/teams`, getPlayers)

app.post(`/api/gen-selected`, savePokemon)
app.post(`/api/players`, savePlayers)

app.put(`/api/:player`, updatePoke)

app.delete(`/api/start-over`, deletePoke)


app.listen(4001, () => console.log("Server running on 4001"));
