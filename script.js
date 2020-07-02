var heading = document.createElement('H1')
heading.setAttribute('class', 'text-center p-2 font-weight-bold');
heading.innerHTML = 'COUNTRY CARDS'

var container = document.createElement('div')
container.setAttribute('class', 'container p-3 my-3 bg-white text-black');

var row = document.createElement('div')
row.setAttribute('class', 'row mb-5');

async function restC() {
try{
var restURL = 'https://restcountries.eu/rest/v2/all'
var rest    = await fetch(restURL)
var result = await rest.json()
return result;
}
catch{(err)=>{
               console.log(err);
      }}

}      
restC().then((country)=>{
console.log(country);

var i = 0;
		
			  country.forEach(element => {
				var column = document.createElement('div')
				column.setAttribute('class','col-md-4');

				var card = document.createElement('div')
				card.setAttribute('class', 'card bg-dark mb-3');
				column.appendChild(card)

				var cardHeader = document.createElement('h5')
				cardHeader.setAttribute('class', 'card-header text-white text-center')
				cardHeader.innerHTML = country[i].name
				card.appendChild(cardHeader)

				var flag = document.createElement('img')
				flag.src = country[i].flag
				flag.setAttribute('class','card-img-top my-2')
				cardHeader.appendChild(flag)

				var cardFooter = document.createElement('div')
				cardFooter.setAttribute('class', 'card-footer text-info text-center')
				card.appendChild(cardFooter)

				var currencies = document.createElement('div')
				currencies.innerHTML = 'Currency name:' + " "
				 + JSON.stringify(country[i].currencies[0].name).replace(/\"/g, "") + "<br>" + '  Currency Symbol:' + " "
				 + JSON.stringify(country[i].currencies[0].symbol).replace(/\"/g, "")

				cardFooter.append(currencies)

				var language = document.createElement('div')
				language.innerHTML = 'Language :' + " "
				 + JSON.stringify(country[i].languages[0].name).replace(/\"/g, "")
				cardFooter.append(language)

				      var button=document.createElement("button")
          		button.setAttribute("class","btn btn-success mt-4");
          		button.setAttribute("id","myBtn");
          		button.setAttribute("value","Yes");

           		button.innerText="Weather Details"
           		cardFooter.appendChild(button);

           		//location parameters from REST countries API -match- OpenWeather API
              var countryCode =country[i].alpha2Code; //IN -->India
           		var city=country[i].capital;			
           		var countr=country[i].name; 

              //console.log('Country :' +countr);

              button.addEventListener("click",()=>{ 
         
            	var weatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=557034d05e41253e76d6124528c37dda`
              async function weatherApi(){
              try{
            	var weather = await  fetch(weatherURL) //response
              var data = await weather.json() 
              return data;

                }catch(err) {
                console.log("ERROR",err);
                }
              }

              weatherApi().then((data)=>{

            	var temperature=data.main.temp;
            	var celsius=temperature-273.15;
            	console.log('Temperature :' +temperature+ 'K');
            	console.log(JSON.stringify(data)); 
            	alert('Clouds : ' + data.clouds.all + '\n' + 'Weather : ' + data.weather[0].description + '\n'
            	 + 'The temperature of ' + countr + ' is ' + celsius + '\u00B0 C.');          

             }).catch((err)=>{
                   alert("Error")
                 })

            }); 

        row.appendChild(column)
        i++; 
        
	});

 }).catch((err)=>{
            alert("Error")
        })
	
  container.appendChild(row)

document.body.appendChild(heading)
document.body.appendChild(container)

/*console.log(weather);
              console.log(element.alpha2Code)

              console.log('Country :' +countr);
              console.log('Country code :' +countryCode); 
              console.log('City :' + city); */