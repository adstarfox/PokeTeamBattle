const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { 
    getCompliment,
    getFortune,
    savePokemon,
    savePlayers,
    getPokemon,
    deletePoke,
    updatePoke
        } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get(`/api/fortune`, getFortune)
app.get(`/api/get-pokemon`, getPokemon)

app.post(`/api/gen-selected`, savePokemon)
app.post(`/api/players`, savePlayers)

app.put(`/api/:player`, updatePoke)


app.listen(4000, () => console.log("Server running on 4000"));
