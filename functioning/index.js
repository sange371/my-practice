function updateTemperature(response){
    console.log(response.data);

    let heading=document.querySelector("h2");
    let exactDay=document.querySelector("#day");
    let exactTime=document.querySelector("#time");
    let exactCondition=document.querySelector("#condition");
    let exactHumidity=document.querySelector("#humidity");
    let exactWindSpeed=document.querySelector("#wind-speed");
    let exactIcon=document.querySelector("#icon");
    let exactTemperature=document.querySelector("#temperature");
    
    let temperature=Math.round(response.data.current.temp_c);

    let now=new Date(response.data.location.localtime.replace(" ","T"));
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[now.getDay()];
    let hours=now.getHours().toString().padStart(2,"0");
    let minutes=now.getMinutes().toString().padStart(2,"0");

    exactTemperature.innerHTML=`${temperature}`;
    heading.innerHTML=response.data.location.name;
    exactDay.innerHTML=day;
    exactTime.innerHTML=`${hours}:${minutes}`;
    exactCondition.innerHTML=`, ${response.data.current.condition.text}`;
    exactHumidity.innerHTML=`${response.data.current.humidity}%`;
    exactWindSpeed.innerHTML=`${response.data.current.wind_kph}km/h`;
    exactIcon.setAttribute("src",`https:${response.data.current.condition.icon}`);
    exactIcon.setAttribute("alt",response.data.current.condition.text);
}
function changeTheCity(event){
    event.preventDefault();

    let cityInput=document.querySelector("#city-name-input");
    let city=cityInput.value.trim();
    let apiKey="b22ddf4e40834df1a40195805250906";
    let apiUrl=`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    axios.get(apiUrl).then(updateTemperature).catch((error)=>
    {
        alert("AN ERROR OCCURED!");
    });
}
let button=document.querySelector("#submit-button");
button.addEventListener("click",changeTheCity);