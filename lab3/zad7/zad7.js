async function renderCities () {
    let response = await fetch('http://localhost:3000/cities');
    let cities = await response.json();
    cities.sort();
    
    let malopolskaCities = malopolskieCities(cities);
    let malopolskaTable = document.querySelector('#malopolskaRes');
    malopolskaTable.innerHTML += addCities(malopolskaCities);

    let doubleACities = filterDoubleACities(cities);
    let doubleATable = document.querySelector('#doubleARes');
    doubleATable.innerHTML += addCities(doubleACities);

    let fifthCity = fifthMostDenseCity(cities);
    let fifthTable = document.querySelector("#fifthRes");
    fifthTable.innerHTML += addCities(fifthCity);

    let sufixWithCity = addSufixToCities(cities);
    let sufixTable = document.querySelector("#sufixRes");
    sufixTable.innerHTML += addCities(sufixWithCity);

    let numberOfCitiesAbove80k = count80kCities(cities);
    let numberOfCitiesBelow80k = cities.length - numberOfCitiesAbove80k;
    let answer = 'Powyżej 80.000 mieszkańców'
    if (numberOfCitiesBelow80k > numberOfCitiesAbove80k) {
        answer = 'Poniżej 80.000 mieszkańców';
    }
    document.querySelector("#compareRes").innerHTML +=
    `
    <tr>
        <td>${numberOfCitiesAbove80k}</td>
        <td>${numberOfCitiesBelow80k}</td>
        <td>${answer}</td>
    </tr>
    `

    let averageAreaPCities = getAverageAreaPCities(cities);
    document.querySelector("#averageRes").innerHTML +=
    `
    <tr>
        <td>${averageAreaPCities}</td>
    </tr>
    `
}



function malopolskieCities(cities) {
    return cities.filter(value => value.province === 'małopolskie')
}

function filterDoubleACities(cities) {
    let regex = RegExp(/^([b-z]||[ęóąśłżźćń])*a([b-z]||[ęóąśłżźćń])*a([b-z]||[ęóąśłżźćń])]*$/i);
    return cities.filter(value => regex.test(value.name));
}

function fifthMostDenseCity(cities) {
    cities.sort( (city2, city1) => city1.dentensity - city2.dentensity);
    return cities.slice(4,5);
}

function addSufixToCities(cities) {
    let bigCities = cities.filter(value => value.people > 100000);
    bigCities.forEach(city => city.name += ' City');
    return bigCities;
}

function count80kCities(cities) {
    return cities.filter(value => value.people > 80000).length;
}

function getAverageAreaPCities(cities){
    let regex = RegExp(/^p.*$/i);  
    return getAverageArea(cities.filter(value => regex.test(value.township)))
}

function getAverageArea(cities) {
    let cnt = 0;
    cities.forEach(city => cnt += city.area)
    return cnt / cities.length;
}



function addCities(cities) {
    let template = '';
    cities.forEach(city => {
        template += `
        <tr>
            <td>${city.name}</td>
            <td>${city.township}</td>
            <td>${city.province}</td>
            <td>${city.area}</td>
            <td>${city.people}</td>
            <td>${city.dentensity}</td>
        </tr>
        `
    });
    return template;

}

window.onload = renderCities;