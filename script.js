let pokemons = [];
const url = 'https://pokeapi.co/api/v2/pokemon/';
let red = 'red';
let green = 'green';
let currentPokemon;

async function loadPokemon() {
    document.getElementById('pokemonContainer').innerHTML += '';
    for (let i = 0; i < 39; i++) {
        const pokedex_url = url + (i + 1);
        let response = await fetch(pokedex_url);
        let currentPokemon = await response.json();
        pokemons.push(currentPokemon);
        renderPokemonInfo(i);
    }
    //console.log('Loaded pokemon', currentPokemon);
}


function renderPokemonInfo(i) {
    document.getElementById('pokemonContainer').innerHTML += templateAllPokemon(i);
    document.getElementById('pokemonName' + i).innerHTML = pokemons[i]['name'];
    document.getElementById('pokemonImage' + i).src = pokemons[i]['sprites']['other']['dream_world']['front_default'];
    for (let p = 0; p < pokemons[i]['types'].length; p++) {
        document.getElementById('pokemonAttribut' + i).innerHTML += templateRenderPokemon(i, p);
    }
}


function searchPokemons() {
    search = document.getElementById('input').value;
    search = search.toLowerCase();
    document.getElementById('pokemonContainer').innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i]['name'].toLowerCase().includes(search)) {
            renderPokemonInfo(i);
        }
    }
}


function renderPokemon(i) {
    openPokemon(i);
    headerCardPokemon(i);
    infoCardPokemon(i);
}


function openPokemon(i) {
    let dialogBG = document.getElementById('dialog-bg');
    dialogBG.innerHTML = '';
    dialogBG.classList.remove('d-none');
    dialogBG.innerHTML = templateCard(i);
    document.body.classList.add('overflow-hidden');
}


function closeDialog() {
    document.getElementById('dialog-bg').classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
}


function headerCardPokemon(i) {
    let PokemonName = document.getElementById('card-name-' + i);
    let PokemonImage = document.getElementById('card-img-' + i);
    let PokemonAttribut = document.getElementById('card-attribut-' + i);
    PokemonName.innerHTML = pokemons[i]['name'];
    PokemonImage.src = pokemons[i]['sprites']['other']['dream_world']['front_default'];
    for (let a = 0; a < pokemons[i]['types'].length; a++)
        PokemonAttribut.innerHTML += templateAttribut(i, a);

}


function infoCardPokemon(i) {
    let stats = pokemons[i]['stats'];
    for (let k = 0; k < stats.length; k++) {
        if (stats[k]['base_stat'] < 39)
            loadRedBar(stats[k]);
        else
            loadGreenBar(stats[k]);
    }
}


function loadRedBar(stat) {
    let pokemonInfo = document.getElementById('card-info');
    pokemonInfo.innerHTML += templateCardInfo(stat, red);
}


function loadGreenBar(stat) {
    let pokemonInfo = document.getElementById('card-info');
    pokemonInfo.innerHTML += templateCardInfo(stat, green);
}


function templateAllPokemon(i) {
    return `
    <div id="pokedex-${i}" class="pokedex bg-${pokemons[i]['types'][0]['type']['name']}" onclick="renderPokemon(${i})">
       <div>
           <h1 id="pokemonName${i}" class="pokemonName">Name</h1>
           <div id="pokemonAttribut${i}" class="pokemonAttribut"></div>
        </div>
        <img class="pokemonImage" id="pokemonImage${i}">
    </div>`;
}


function templateRenderPokemon(i, p) {
    return `
    <div class="pokemonAttribut1" id="pokemonAttribut-${i}-${p}">
    ${pokemons[i]['types'][p]['type']['name']}
    </div>
    `;
}


function templateCard(i) {
    return `
    <div id="dialog-${i}" class="dialog bg-${pokemons[i]['types'][0]['type']['name']}">
      <img id="card-img-${i}" class="card-img">
      <div class="card-header">
          <h2 id="card-name-${i}" class="card-name"></h2>
          <div id="card-attribut-${i}" class="card-attribut-container"></div>
      </div>
      <div id="card-info" class="info-container"></div>
 </div>
  `;
}


function templateAttribut(i, a) {
    return `
    <div class="card-attribut" id="card-attribut-${i}-${a}">
    ${pokemons[i]['types'][a]['type']['name']}
    </div>
    `;
}


function templateCardInfo(stats, color) {
    return `
        <div class="info-item">
            <div>${stats['stat']['name']}:</div>
            <div class="info-diagramm">
                <div class="info-diagramm-bar" style="width: ${stats['base_stat'] * 0.8}%; background-color: ${color}">
                    ${stats['base_stat']}
                </div>
            </div>
        </div>
    `;
}