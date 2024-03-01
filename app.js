const container = document.querySelector('.chars-container');
const seachinput = document.querySelector('#seach')
const speciesfilter = document.querySelector('#species');
const genderfiler = document.querySelector('#gender');
const statusfiler = document.querySelector('#status');
const button = document.querySelector('#load-more');

const api = 'https://rickandmortyapi.com/api'

const defaultFilters = {
    name: '',
    species: '',
    status: '',
    gender: '',
    page: '',
}

async function getChar({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${api}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
    const character = await response.json();
    return character.results;
}

async function render({ characters }) {
    characters.forEach((character) => {
        return container.innerHTML += `
        <div class="char">
        <img src="${character.image}" alt="">
        <div class="char-info">
          <h3>${character.name}</h3>
          <span>${character.species}</span>
        </div>
      </div>
      `
    })
}

async function handlong(){
    defaultFilters.page += 1
    const characters = await getChar(defaultFilters);
    render({ characters });

}


function addList() {
    speciesfilter.addEventListener("change", async (e) => {
        defaultFilters.species = e.target.value;
        container.innerHTML = ''
        const characters = await getChar(defaultFilters);
        render({ characters });
    });

    genderfiler.addEventListener('change', async (e) => {
        defaultFilters.gender = e.target.value;
        container.innerHTML = ''
        const characters = await getChar(defaultFilters);
        render({ characters });
    })

    statusfiler.addEventListener('change', async (e) => {
        defaultFilters.status = e.target.value;
        container.innerHTML = ''
        const characters = await getChar(defaultFilters);
        render({ characters });
    })
    seachinput.addEventListener('keyup', async (e) => {
        defaultFilters.name = e.target.value;
        container.innerHTML = ''
        const characters = await getChar(defaultFilters);
        render({ characters });
    })
    button.addEventListener( 'click' , handlong) 
  
}



async function main() {
    const characters = await getChar(defaultFilters);
    addList()
    render({ characters })
}
main()