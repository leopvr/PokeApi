let urlApi = "https://pokeapi.co/api/v2/pokemon/";
var mainPoke = document.querySelector(".mainPoke");
var main = document.querySelector("main");
var links = document.querySelector(".links");

async function loadPokes(url) {
    try{
        mainPoke.innerHTML = `<div class="d-flex justify-content-center mb-5 mt-5">
        <div id="spinner" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
    </div> `;

    let response = await fetch(url),
    json = await response.json(),
    $template = "",
    $antLink,
    $sigLink;

    // console.log(json)

    if (!response.ok) throw {status:response.status, statusText: response.statusText}

    for (let i = 0; i < json.results.length; i++) {
        // console.log(json.results[i])
        try {
            let response = await fetch(json.results[i].url),
            pokemon = await response.json();
            // console.log(response, pokemon)

            if (!response.ok) throw {status:response.status, statusText: response.statusText}

            $template += `<div>
            <div class="card" style="width: 18rem; background-color: rgb(0 99 177); box-shadow: 1px 5px 35px 0px #000; margin-top: 10px; margin-bottom: 10px; margin-right: 20px; margin-left: 20px">
            <img class="card-img-top" src="${pokemon.sprites.front_default}"></img>
            <div class="card-body bg-dark">
            <figcaption class="card-title text-light">#${pokemon.id} <br> ${pokemon.forms[0].name}</figcaption>
            <p class="card-text" id="txtPokemon"></p>
            <a href="https://pokeapi.co/api/v2/pokemon/${pokemon.id}" class="btn btn-primary">More details...</a></div>
            </div>
            </div>`;
                        
        } catch (err) {

        }
        
    }

    mainPoke.innerHTML = $template,
    $antLink = json.previous ? `<a href = "${json.previous}" style = "width: 30px">⬅️</a>`: "";
    $sigLink = json.next ? `<a href = "${json.next}" style = "width: 30px">➡️</a>`: "";
    links.innerHTML = $antLink + " " + $sigLink;

    } catch (err){
        // console.log(err);
        let msg = err.statusText || "Ocurrio un error";
        main.innerHTML = `<p>Error ${err.status}: ${msg} </p>`
    }
}

function buscarPokemon(){
    let codPokemon = document.getElementById('txtPokemon').value;

    fetch("https://pokeapi.co/api/v2/pokemon/" + codPokemon)
      .then(responsita => responsita.json())
      .then(data => {
        mainPoke.innerHTML = "";
        let pokemon = document.createElement("div");
        pokemon.className = "pokemon";
        pokemon.innerHTML = `<div>
        <div class="card" style="width: 18rem; background-color: rgb(0 99 177); box-shadow: 1px 5px 35px 0px #000; margin-top: 10px; margin-bottom: 10px; margin-right: 20px; margin-left: 20px">
        <img class="card-img-top" src="${data.sprites.front_default}"></img>
        <div class="card-body bg-dark">
        <figcaption class="card-title text-light">#${data.id} <br> ${data.forms[0].name}</figcaption>
        <p class="card-text" id="txtPokemon"></p>
        <a href="https://pokeapi.co/api/v2/pokemon/${data.id}" class="btn btn-primary">More details...</a></div>
        </div>
        </div>`
        document.getElementById("cuerpoPoke").appendChild(pokemon);
      });

}

document.addEventListener("DOMContentLoaded", e => loadPokes(urlApi))
document.addEventListener("click", e => {
    if (e.target.matches(".links a")){
    e.preventDefault();
    loadPokes(e.target.getAttribute("href"));
}
})
