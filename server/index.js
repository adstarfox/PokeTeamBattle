const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { 
    getCompliment,
    getFortune,
    savePokemon,
    getPokemon,
    deletePoke,
    updatePoke
        } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get(`/api/fortune`, getFortune)
app.get(`/api/get-pokemon`, getPokemon)

app.post(`/api/gen-selected`, savePokemon)
app.delete(`/api/:id`, deletePoke)

app.put(`/api/:name`, updatePoke)


app.listen(4000, () => console.log("Server running on 4000"));
