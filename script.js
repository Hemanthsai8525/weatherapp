// let API= "https://fakestoreapi.com/products/1";

// async function getdata() {

//     let obj={
//         id: 1,
//         title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
//         price: 109.95,
//         description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//         category: "men's clothing",
//         image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//         rating: { rate: 3.9, count: 120 }
//       }
//     // let data =await fetch(API);
//     // obj = await data.json();
//     // console.log(obj);
//     //let res = await axios.get("https://fakestoreapi.com/products/1");
//     //let res = await axios.post("https://fakestoreapi.com/products/");
//    //let res = await axios.put("https://fakestoreapi.com/products/1");
//    let res = await axios.delete("https://fakestoreapi.com/products/1");
//     console.log(res.data);

// }
// getdata()


let key = "f13e70494cad41a29dc83513251303";

let weather=[];

async function getdata(){
    let city = document.getElementById('cityname').value
    let API = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&aqi=yes`;
    let res = axios.get(API);
    res.then((result)=>{
        console.log(result)
        display(result)
        getforecast(result)
        getairquality(result)
    })
    res.catch((err)=>{
        alert("city not found")
    })

   // console.log(weather);

}


function display(res){

   // console.log(res.data)
    let data=res.data;
    document.getElementById("locatindetid").innerHTML=`
    <h1>${data.location.name}</h1>
    <h5>${data.location.country}</h5>
    <h1>${data.current.temp_c}</h1>
    `
    document.getElementById("icon").innerHTML=`
    <img src="${data.current.condition.icon}">`
}
//getdata(Paris);
function getforecast(res){
    let data = res.data.forecast.forecastday[0].hour;
    let data1 = res.data.forecast.forecastday;
   // console.log(data1)
    let forecastele=document.getElementById('forecast');
    let columns =  data.reduce((cols,obj,ind)=>{
        if(ind==6||ind==9||ind==12||ind==15||ind==18||ind==21){ 
            let col=`
            <div class="col-2">
           <h6>${ind>12?ind-12:ind}:00 ${ind<12?"AM":"PM"}</h6>
           <img src="${obj.condition.icon}">
           <h2>${obj.temp_c}</h2>
            </div>`
            cols+=col;
        }
            return cols
        },"")

        let weekforecastele = document.getElementById('weekforecast');

        let columns1 =  data1.reduce((cols,obj,ind)=>{ 
            //console.log(obj.day.condition.text)
            //console.log(obj)
                let col=`
                <div class="col">
                <h6>${obj.date}</h6>
               <img src="${obj.day.condition.icon}">
                 <h6>${obj.day.condition.text}</h6>
               <h4>${obj.day.avgtemp_c}</h4>
                </div>`
                cols+=col;
                return cols
            },"")


    forecastele.innerHTML = columns

    weekforecastele.innerHTML = columns1
}

function getairquality(res){
    let air_quality=res.data.current.air_quality

    console.log(air_quality)

    document.getElementById('airquality').innerHTML = `
    <h2> AirQuality </h2>
    <div class = "air">
    <h4>co ${air_quality.co}</h4>
    <h4>no2 ${air_quality.no2}</h4>
    <h4>so2 ${air_quality.so2}</h4>
    <h4>o3 ${air_quality.o3}</h4>
    <h4>pm10 ${air_quality.pm10}</h4>
    </div>
    `
}