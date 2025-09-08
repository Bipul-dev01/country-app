console.log("hello world");
console.log("country explorer");

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");
const error = document.getElementById("error");
const countryDetails = document.getElementById("countryDetails");

let map;

searchBtn.addEventListener("click", async ()=>{
    const country = searchInput.value.trim();

    if(!country) return;

    await fetchCountry(country);
});


async function fetchCountry(name){
    loader.classList.remove("hidden");
    error.classList.add("hidden");
    countryDetails.innerHTML = "";

    
    const mapDiv = document.getElementById("map");
    mapDiv.classList.add("hidden");

    try{
        const response = await fetch( `https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const data = await response.json();
        

        const country = data[0];

        if(!country){
            throw new Error("Invalid Country Name");
        }

        const languages = country.languages ? Object.values(country.languages).join(",") : "N/A" ;


        countryDetails.innerHTML = `
            <div class="p-4 border rounded shadow">
                <img src="${country.flags.svg}" alt="flag" class="w-32 mb-2">
                <h2 class="text-xl font-bold">${country.name.common}</h2>
                <p><strong>Capital : </strong>${country.capital}</p>
                <p><strong>Population : </strong>${country.population.toLocaleString()}</p>
                <p><strong>Languages : </strong>${languages}</p>
            </div>
        `
        
        mapDiv.classList.remove("hidden");

        drawMap(country.latlng, country.name.common);
        console.log(data);
        
    }catch(err){
        error.classList.remove("hidden");

        error.textContent = err.message || "Failed to load the country information"
       
        
        if(map){
            map.remove();
            map = null;
        } 

        document.getElementById("map").classList.add("hidden");

    }finally{
        loader.classList.add("hidden");
    }
}

function drawMap(latlang, name) {
    const [lat, lng] = latlang;

    if (!map) {
        map = L.map("map").setView([lat, lng], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
            map
        );
    } else {
        map.setView([lat, lng], 5);
    }

    L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();
}
