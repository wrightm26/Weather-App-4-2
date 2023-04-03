
let form = document.getElementById('cityForm');
form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event){
    event.preventDefault();

    let cityName = event.target.cityName.value;
    console.log(cityName);

    let cityInfo = await getCityInfo(cityName);
    console.log(cityInfo);

    buildCityCard(cityInfo);

    event.target.cityName.value = '';
}


async function getCityInfo(cityObj){
    try{
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityObj}`);
        let data = await response.json();
        return data;
    } catch(err){
        console.error(err);
    };
};


function buildCityCard(cityElement){
    //current temp, what it feels like, condition

    let card = document.createElement('div');
    card.className = 'card text-bg-primary h-100 m-5 rounded-pill';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body text-bg-primary rounded-pill';

    let cityTitle = document.createElement('h5');
    cityTitle.innerHTML = `${cityElement.location.name}, ${cityElement.location.region}`;
    cityTitle.className = 'card-title text-center';
    console.log(cityTitle);



    let currentTemp = document.createElement('p');
    currentTemp.innerHTML =  `Current Temperature: ${cityElement.current.temp_f} F`;
    currentTemp.className = 'card-text text-center';
    console.log(currentTemp);

    let tempFeel = document.createElement('p');
    tempFeel.innerHTML =  `Feels Like Temperature: ${cityElement.current.feelslike_f}`;
    tempFeel.className = 'card-text text-center';
    console.log(tempFeel);

    var cityCondition = document.createElement('p');
    cityCondition.innerHTML = `Condition: ${cityElement.current.condition.text}`;
    cityCondition.className = 'card-text text-center';
    console.log(cityCondition);

    cardBody.append(cityTitle);
    cardBody.append(currentTemp);
    cardBody.append(cityCondition);
    cardBody.append(tempFeel);


    card.append(cardBody);

    let col = document.createElement('div');
    col.className = 'col';

    col.append(card);

    let weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.prepend(col);
}
