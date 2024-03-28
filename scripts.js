const wetfor = document.querySelector(".wefo");
const cityinput = document.querySelector(".cit");
const card = document.querySelector(".card");
const apiKey = "95f411f830dfaa11e0ab9d898deb9ae1";

wetfor.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
            const weatherdata = await getWeather(city);
            displayweather(weatherdata);
        }
        catch(error){
            console.log(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Please enter a city")
    }
});

async function getWeather(city){

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("Could not fetch");
    }
    return await response.json();
}

function displayweather(data){
    
    const {name: city, main: {temp, humidity}, weather : [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiddisplay = document.createElement("p");
    const desdisplay = document.createElement("p");
    const emodisplay = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent =`${(temp - 273.15).toFixed(1)}°C`;
    humiddisplay.textContent = `Humidity: ${humidity}%`
    desdisplay.textContent = `${description}`
    emodisplay.textContent = getweaemoji(id);


    citydisplay.classList.add("city");
    tempdisplay.classList.add("temp");
    humiddisplay.classList.add("humid");
    desdisplay.classList.add("des");
    emodisplay.classList.add("wethemo");

    card.append(citydisplay);
    card.append(tempdisplay);
    card.append(humiddisplay);
    card.append(desdisplay);
    card.append(emodisplay);

}

function getweaemoji(wethid){
    switch(true){
        case (wethid>=200 && wethid <300):
            return "⛈️";
        case (wethid>=300 && wethid <400):
            return "🌧️";
        case (wethid>=500 && wethid <600):
            return "🌧️";
        case (wethid>=600 && wethid <700):
            return "❄️";
        case (wethid>=700 && wethid <800):
            return "〰️";
        case (wethid === 800):
            return "☀️";
        case (wethid>=801 && wethid < 810):
            return "☁️";
        default:
            return "?";
    }


}

function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}