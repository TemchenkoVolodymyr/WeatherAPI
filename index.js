
let url = ['http://api.openweathermap.org/data/2.5/weather?id=703448&appid=4e4c3b7a1db5d2a95056bb59284752ad',
    'http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=4e4c3b7a1db5d2a95056bb59284752ad',
    'http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=4e4c3b7a1db5d2a95056bb59284752ad'
];

let weekUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=50.4500336&lon=30.5241361&cnt=7&appid=4e4c3b7a1db5d2a95056bb59284752ad';
let weekUrlLondon = 'http://api.openweathermap.org/data/2.5/forecast?lat=51.5085300&lon=-0.1257400&cnt=7&appid=4e4c3b7a1db5d2a95056bb59284752ad';
let weekUrlNewYork = 'http://api.openweathermap.org/data/2.5/forecast?lat=40.7142700&lon=-74.0059700&cnt=7&appid=4e4c3b7a1db5d2a95056bb59284752ad';



class getElementsHtml {
    constructor() {
        this.cities = document.querySelectorAll('.city');
        this.deg = document.querySelectorAll('.deg');
        this.image = document.querySelectorAll('.image');
        this.windSpeed = document.querySelectorAll('.wSpeed');
        this.windDirection = document.querySelectorAll('.wDirection');
        this.pressure = document.querySelectorAll('.pressure');
        this.sunrise = document.querySelectorAll('.sunrise');
        this.sunseet = document.querySelectorAll('.sunseet');
        this.celsium = document.querySelectorAll('.celsius');
        this.faren = document.querySelectorAll('.faren');
        this.celsiusSecond = document.querySelectorAll('.celsiusSecond');
        this.farenSecond = document.querySelectorAll('.farenSecond');
        this.celsiusThird = document.querySelectorAll('.celsiusThird');
        this.farenThird = document.querySelectorAll('.farenThird');
        this.wrapperBtn = document.querySelector('.wrapperBtn');
        this.rightBtnsArrow = document.querySelectorAll('#rightUrrowBtn')

    }
}

let element = new getElementsHtml();


for (let i = 0; i < url.length; i++) {

    let promise = fetch(url[i]);
    promise
        .then(response => {
            return response.json();
        }).then((data) => {

            element.cities[i].textContent = data.name;
            element.pressure[i].innerHTML += "<br>" + data.main.pressure;
            element.image[i].src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + "@2x.png";
            element.deg[i].innerHTML = Math.floor(data.main.temp) + "&#8457";
            element.windSpeed[i].innerHTML += "<br>" + data.wind.speed + "m/s";
            element.windDirection[i].style.transform = "rotate(" + data.wind.deg + "deg)";

            let timeSunrise = convertTime(data.sys.sunrise, data.timezone);
            let timeSunseet = convertTime(data.sys.sunset, data.timezone);

            element.sunrise[i].innerHTML += "<br>" + timeSunrise;
            element.sunseet[i].innerHTML += '<br>' + timeSunseet;
        });
}



function createSevenDaysInfo(url, celsiumElement, farenElement) {

    let promise = fetch(url);

    promise
        .then(response => {
            return response.json()
        }).then((data) => {

            for (let i = 0; i < data.list.length; i++) {

                celsiumElement[i].innerHTML = Math.floor(data.list[i].main.temp - 273.15) + '&#x2103';
                farenElement[i].innerHTML = Math.floor(data.list[i].main.temp) + "&#8457";
            }
        });

}

createSevenDaysInfo(weekUrl, element.celsium, element.faren);
createSevenDaysInfo(weekUrlLondon, element.celsiusSecond, element.farenSecond);
createSevenDaysInfo(weekUrlNewYork, element.celsiusThird, element.farenThird);


function convertTime(unixTime, timeZone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timeZone) * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let time = hours + ":" + minutes.slice(-2);
    return time;
};



let btnActiveCelsius = document.querySelector('#btnCelsius');
let btnActiveFahrenheit = document.querySelector('#btnFahrenheit');

let click = true;

function сelsiusTest() {
    if (click) {

        click = false;

        for (let i = 0; i < 3; i++) {

            let numbers = element.deg[i].textContent.match(/\d+/g) - 273.15;
            element.deg[i].innerHTML = Math.floor(numbers) + "&#x2103";
        }
    } else if (!click) {

        click = true;

        for (let i = 0; i < 3; i++) {

            let promise = fetch(url[i]);
            promise
                .then(response => {
                    return response.json()
                }).then((data) => {
                    element.deg[i].innerHTML = Math.floor(data.main.temp) + "&#8457";
                });
        }
    }
}
btnActiveCelsius.addEventListener('click', сelsiusTest);
btnActiveFahrenheit.addEventListener("click", сelsiusTest);

document.body.addEventListener('click', function (e) {
    if (e.target == btnActiveCelsius) {

        element.wrapperBtn.style.backgroundColor = 'black';
        btnActiveCelsius.style.backgroundColor = 'black';
        btnActiveCelsius.style.color = 'white';
        btnActiveFahrenheit.style.backgroundColor = 'white';
        btnActiveFahrenheit.style.color = 'black';

    } else if (e.target == btnActiveFahrenheit) {

        element.wrapperBtn.style.backgroundColor = 'black';
        btnActiveFahrenheit.style.backgroundColor = 'black';
        btnActiveFahrenheit.style.color = 'white';
        btnActiveCelsius.style.backgroundColor = 'white';
        btnActiveCelsius.style.color = 'black';
    }
});




let counterStatus = false;

for (let el of element.rightBtnsArrow) {
    el.addEventListener('click', function () {

        if (counterStatus == false) {
            el.style.transform = "rotate(" + 180 + "deg)";
            counterStatus = true;
        } else if (counterStatus == true) {
            el.style.transform = "rotate(" + 0 + "deg)";
            counterStatus = false;
        }
    });
}

let checkBtns = false;

class getElementsOfAdditionalInfo {
    constructor() {
        this.arrowsOpenAdditionalInfo = document.querySelectorAll('.arrowDetails');
        this.firstDetailsInfo = document.querySelector('#firstDetails');
        this.openFirstBlockInfo = document.querySelector('#firstArrow');
        this.secondDetailsInfo = document.querySelector('#secondDetails');
        this.openSecondBlockInfo = document.querySelector('#secondArrow');
        this.thirsDetailsInfo = document.querySelector('#lastDetails');
        this.openThirdBlockInfo = document.querySelector('#lastArrow');
        this.arrow = document.querySelector('.first');
        this.arrowSecond = document.querySelector('.second');
        this.arrowThird = document.querySelector('.third');
    }
}

let arrowElements = new getElementsOfAdditionalInfo();

for (let el of arrowElements.arrowsOpenAdditionalInfo) {
    el.addEventListener('click', function (e) {


        if (checkBtns == false) {
            el.style.transform = "rotate(" + 180 + "deg)";

            if (e.target == arrowElements.openFirstBlockInfo) {
                arrowElements.firstDetailsInfo.style.display = 'flex';

            } else if (e.target == arrowElements.openSecondBlockInfo) {
                arrowElements.secondDetailsInfo.style.display = 'flex';

            } else if (e.target == arrowElements.openThirdBlockInfo) {
                arrowElements.thirsDetailsInfo.style.display = "flex";
            }
            checkBtns = true;

        } else if (checkBtns == true) {
            el.style.transform = "rotate(" + 0 + "deg)";


            if (e.target == arrowElements.openFirstBlockInfo) {
                arrowElements.firstDetailsInfo.style.display = 'none';

            } else if (e.target == arrowElements.openSecondBlockInfo) {
                arrowElements.secondDetailsInfo.style.display = 'none';

            } else if (e.target == arrowElements.openThirdBlockInfo) {
                arrowElements.thirsDetailsInfo.style.display = "none";

            }
            checkBtns = false;
        }
    });
}



let check = false;


function openSideInfo(selector) {

    let div = document.querySelector(selector);

    if (check == false) {
        check = true;
        div.style.display = 'block';
    } else if (check == true) {

        div.style.display = 'none';
        check = false;
    }
}

arrowElements.arrow.addEventListener('click', function () {
    openSideInfo('.hidden');
});

arrowElements.arrowSecond.addEventListener('click', function () {
    openSideInfo('.hiddenSecond');
});

arrowElements.arrowThird.addEventListener('click', function () {
    openSideInfo('.hiddenThird');
});















