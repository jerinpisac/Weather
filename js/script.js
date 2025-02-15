const API_KEY = "00d211367d1a40e0b59162756251102";
const API_URL = "http://api.weatherapi.com/v1/";

let select = document.querySelector(".homeselect");
let main = document.querySelector(".main-body");

select.addEventListener("change", () => {
    if(select.value === "CW")
    {
        select.remove();
        showCurrentData();
    }
    else if(select.value === "FO")
    {
        select.remove();
        showForecastData();
    }
    else if(select.value === "FU")
    {
        select.remove();
        showFutureData();
    }
})

function showCurrentData() {
    let select1 = document.createElement("select");
    select1.className = "cwselect";
    let option1 = document.createElement("option");
    option1.innerText = "Choose your input for location";
    select1.append(option1);
    let option2 = document.createElement("option");
    option2.value = "LL";
    option2.innerText = "Latitude and Longitude";
    select1.append(option2);
    let option3 = document.createElement("option");
    option3.value = "city";
    option3.innerText = "City name";
    select1.append(option3);
    let option4 = document.createElement("option");
    option4.value = "IP";
    option4.innerText = "IP address (IPv4 and IPv6)";
    select1.append(option4);
    main.append(select1);

    let gohome = document.createElement("button");
    gohome.innerText = "Go Back";
    main.append(gohome);
    gohome.addEventListener("click", () => {
        main.append(select);
        select.value = "";
        select1.remove();
        gohome.remove();
    })

    select1.addEventListener("change", () => {
        if(select1.value === "LL")
        {
            select1.remove();
            gohome.remove();
            showCurrentDataLL();
        }
        else if(select1.value === "city")
        {
            select1.remove();
            gohome.remove();
            showCurrentDataCity();
        }
        else if(select1.value === "IP")
        {
            select1.remove();
            gohome.remove();
            showCurrentDataIP();
        }
    })

    function showCurrentDataLL(){
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input1 = document.createElement("input");
        input1.type = "number";
        input1.placeholder = "Enter the latittude...";
        input1.className = "currlat";
        div.append(input1);
        let input2 = document.createElement("input");
        input2.type = "number";
        input2.placeholder = "Enter the longitude...";
        input2.className = "currlong";
        div.append(input2);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);
        button.addEventListener("click", async () => {
            gocw.remove();
            if(input1.value === "" || input2.value === "")
            {
                alert("Enter something");
                return;
            }
            let response = await fetch(
                `${API_URL}current.json?key=${API_KEY}&q=${input1.value},${input2.value}&aqi=yes`
            )
            let data = response.json();
            data.then((res) => {
                let currweather = res['current'];
                let currlocation = res['location'];
                input1.remove();
                input2.remove();
                button.remove();
                let div1 = document.createElement("div");
                div1.className = "currlldiv1";
                let h2 = document.createElement("h2");
                h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                div.append(h2);

                let templabel = document.createElement("label");
                templabel.innerHTML = `Temperature in \u00B0C: ${currweather["temp_c"]}`;
                let div2 = document.createElement("div");
                div2.className = "currlldiv2";
                let img1 = document.createElement("img");
                img1.src = "";
                div2.append(img1);
                div2.append(templabel);

                let humlabel = document.createElement("label");
                humlabel.innerHTML = `Humidity in %: ${currweather["humidity"]}`;
                let div3 = document.createElement("div");
                div3.className = "currlldiv3";
                let img2 = document.createElement("img");
                img2.src = "";
                div3.append(img2);
                div3.append(humlabel);

                let windlabel = document.createElement("label");
                windlabel.innerHTML = `Wind Speed in mph: ${currweather["wind_mph"]}`;
                let div4 = document.createElement("div");
                div4.className = "currlldiv4";
                let img3 = document.createElement("img");
                img3.src = "";
                div4.append(img3);
                div4.append(windlabel);

                let div5 = document.createElement("div");
                div5.className = "currlldiv5";
                div5.append(div3);
                div5.append(div4);
                
                div1.append(div2);
                div1.append(div5);

                let h3 = document.createElement("h3");
                h3.innerText = `Air Quality in \u03BCg/m3`;
                div1.append(h3);

                let array2 = ["Good", "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"];
                let airQuality = currweather["air_quality"];
                const table = document.createElement('table');
                const thead = table.createTHead();
                const headerRow = thead.insertRow();
                const headers = ['CO','NO2', 'O3', 'PM2.5', 'PM10', 'SO2', 'Quality'];
                headers.forEach(text => {
                    const th = document.createElement('th');
                    th.textContent = text;
                    headerRow.appendChild(th);
                });
                const tbody = table.createTBody();
                const data = [
                    [`${airQuality['co']}`, `${airQuality['no2']}`,`${airQuality['o3']}`,`${airQuality['pm2_5']}`,`${airQuality['pm10']}`,`${airQuality['so2']}`,`${array2[airQuality['us-epa-index'] - 1]}`],
                ];
                data.forEach(rowData => {
                    const row = tbody.insertRow();
                    rowData.forEach(cellData => {
                        const cell = row.insertCell();
                        cell.textContent = cellData;
                    });
                });
                div1.append(table);

                let select2 = document.createElement("select");
                select2.className = "cwllselect";
                let array = ["cloud", "dewpoint_c", "gust_mph", "heatindex_c", "precip_mm", "pressure_mb"];
                let array1 = ["Cloud", "dewpoint in \u00B0C", "Gust in mph", "Heat Index in \u00B0C", "Precipitaion in mm", "Pressure in millibar"];
                let option6 = document.createElement("option");
                option6.innerText = "Others";
                select2.append(option6);
                for(let i=0;i<array.length;i++){
                    let option5 = document.createElement("option");
                    option5.innerText = `${array1[i]}`;
                    option5.value = `${array[i][0]}${array[i][1]}`;
                    select2.append(option5);
                }

                div1.append(select2);

                div.append(div1);
                let label = document.createElement("label");
                label.className = "currllother";
                select2.addEventListener("change", () => {
                    let count = 0;
                    for(let i=0;i<array.length;i++){
                        if(select2.value === `${array[i][0]}${array[i][1]}` && count === 0){
                            label.innerText = `${currweather[array[i]]}`;
                            count++;
                            break;
                        }
                        else if(select2.value === `${array[i][0]}${array[i][1]}` && count !== 0){
                            label.remove();
                            label.innerText = `${currweather[array[i]]}`;
                            count++;
                            break;
                        }
                    }
                    div1.append(label);
                })

                let gocwll = document.createElement("button");
                gocwll.innerText = "Go Back";
                div.append(gocwll);

                gocwll.addEventListener("click", () => {
                    h2.remove();
                    div1.remove();
                    gocwll.remove();
                    div.append(input1);
                    div.append(input2);
                    input1.value = "";
                    input2.value = "";
                    div.append(button);
                    div.append(gocw);
                })

            })
        })
    }

    function showCurrentDataCity(){
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter the City Name...";
        input.className = "currlat";
        div.append(input);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);
        button.addEventListener("click", async () => {
            gocw.remove();
            if(input.value === "")
            {
                alert("Enter something");
                return;
            }
            let response = await fetch(
                `${API_URL}current.json?key=${API_KEY}&q=${input.value}&aqi=yes`
            )
            let data = response.json();
            console.log(data);
            data.then((res) => {
                let currweather = res['current'];
                let currlocation = res['location'];
                input.remove();
                button.remove();
                let div1 = document.createElement("div");
                div1.className = "currlldiv1";
                let h2 = document.createElement("h2");
                h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                div.append(h2);

                let templabel = document.createElement("label");
                templabel.innerHTML = `Temperature in \u00B0C: ${currweather["temp_c"]}`;
                let div2 = document.createElement("div");
                div2.className = "currlldiv2";
                let img1 = document.createElement("img");
                img1.src = "";
                div2.append(img1);
                div2.append(templabel);

                let humlabel = document.createElement("label");
                humlabel.innerHTML = `Humidity in %: ${currweather["humidity"]}`;
                let div3 = document.createElement("div");
                div3.className = "currlldiv3";
                let img2 = document.createElement("img");
                img2.src = "";
                div3.append(img2);
                div3.append(humlabel);

                let windlabel = document.createElement("label");
                windlabel.innerHTML = `Wind Speed in mph: ${currweather["wind_mph"]}`;
                let div4 = document.createElement("div");
                div4.className = "currlldiv4";
                let img3 = document.createElement("img");
                img3.src = "";
                div4.append(img3);
                div4.append(windlabel);

                let div5 = document.createElement("div");
                div5.className = "currlldiv5";
                div5.append(div3);
                div5.append(div4);
                
                div1.append(div2);
                div1.append(div5);

                let h3 = document.createElement("h3");
                h3.innerText = `Air Quality in \u03BCg/m3`;
                div1.append(h3);

                let array2 = ["Good", "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"];
                let airQuality = currweather["air_quality"];
                const table = document.createElement('table');
                const thead = table.createTHead();
                const headerRow = thead.insertRow();
                const headers = ['CO','NO2', 'O3', 'PM2.5', 'PM10', 'SO2', 'Quality'];
                headers.forEach(text => {
                    const th = document.createElement('th');
                    th.textContent = text;
                    headerRow.appendChild(th);
                });
                const tbody = table.createTBody();
                const data = [
                    [`${airQuality['co']}`, `${airQuality['no2']}`,`${airQuality['o3']}`,`${airQuality['pm2_5']}`,`${airQuality['pm10']}`,`${airQuality['so2']}`,`${array2[airQuality['us-epa-index'] - 1]}`],
                ];
                data.forEach(rowData => {
                    const row = tbody.insertRow();
                    rowData.forEach(cellData => {
                        const cell = row.insertCell();
                        cell.textContent = cellData;
                    });
                });
                div1.append(table);

                let select2 = document.createElement("select");
                select2.className = "cwllselect";
                let array = ["cloud", "dewpoint_c", "gust_mph", "heatindex_c", "precip_mm", "pressure_mb"];
                let array1 = ["Cloud", "dewpoint in \u00B0C", "Gust in mph", "Heat Index in \u00B0C", "Precipitaion in mm", "Pressure in millibar"];
                let option6 = document.createElement("option");
                option6.innerText = "Others";
                select2.append(option6);
                for(let i=0;i<array.length;i++){
                    let option5 = document.createElement("option");
                    option5.innerText = `${array1[i]}`;
                    option5.value = `${array[i][0]}${array[i][3]}`;
                    select2.append(option5);
                }


                div1.append(select2);

                div.append(div1);
                let label = document.createElement("label");
                label.className = "currllother";
                select2.addEventListener("change", () => {
                    let count = 0;
                    for(let i=0;i<array.length;i++){
                        if(select2.value === `${array[i][0]}${array[i][3]}` && count === 0){
                            label.innerText = `${currweather[array[i]]}`;
                            count++;
                            break;
                        }
                        else if(select2.value === `${array[i][0]}${array[i][3]}` && count !== 0){
                            label.remove();
                            label.innerText = `${currweather[array[i]]}`;
                            count++;
                            break;
                        }
                    }
                    div1.append(label);
                })

                let gocwcity = document.createElement("button");
                gocwcity.innerText = "Go Back";
                div.append(gocwcity);

                gocwcity.addEventListener("click", () => {
                    h2.remove();
                    div1.remove();
                    gocwcity.remove();
                    div.append(input);
                    input.value = "";
                    div.append(button);
                    div.append(gocw);
                })
            })
        })
    }

    function showCurrentDataIP(){
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter the IP Address...";
        input.className = "currlat";
        div.append(input);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);
        button.addEventListener("click", async () => {
            gocw.remove();
            if(input.value === "")
            {
                alert("Enter something");
                return;
            }
            let ipString = input.value;
            let count1 = 0, count2 = 0;
            for(let i=0;i<ipString.length;i++)
            {
                if(ipString[i] === '.') count1++;
                else if(ipString[i] === ':') count2++;
            }
            if(count1 !== 3 && count2 === 0)
            {
                alert("Enter the correct IPv4 address");
                return;
            }
            else if(count1 === 0 && count2 !== 7){
                alert("Enter the correct IPv6 address");
                return;
            }
            else if((count1 > 0 && count2 > 0)){
                alert("Is it an IP address?");
                return;
            }
            let response = await fetch(
                `${API_URL}current.json?key=${API_KEY}&q=${input.value}&aqi=yes`
            )
            let data = response.json();
            data.then((res) => {
                let currweather = res['current'];
                let currlocation = res['location'];
                input.remove();
                button.remove();
                let div1 = document.createElement("div");
                div1.className = "currlldiv1";
                let h2 = document.createElement("h2");
                h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                div.append(h2);

                let templabel = document.createElement("label");
                templabel.innerHTML = `Temperature in \u00B0C: ${currweather["temp_c"]}`;
                let div2 = document.createElement("div");
                div2.className = "currlldiv2";
                let img1 = document.createElement("img");
                img1.src = "";
                div2.append(img1);
                div2.append(templabel);
                
                let humlabel = document.createElement("label");
                humlabel.innerHTML = `Humidity in %: ${currweather["humidity"]}`;
                let div3 = document.createElement("div");
                div3.className = "currlldiv3";
                let img2 = document.createElement("img");
                img2.src = "";
                div3.append(img2);
                div3.append(humlabel);

                let windlabel = document.createElement("label");
                windlabel.innerHTML = `Wind Speed in mph: ${currweather["wind_mph"]}`;
                let div4 = document.createElement("div");
                div4.className = "currlldiv4";
                let img3 = document.createElement("img");
                img3.src = "";
                div4.append(img3);
                div4.append(windlabel);

                let div5 = document.createElement("div");
                div5.className = "currlldiv5";
                div5.append(div3);
                div5.append(div4);
                
                div1.append(div2);
                div1.append(div5);

                let h3 = document.createElement("h3");
                h3.innerText = `Air Quality in \u03BCg/m3`;
                div1.append(h3);

                let array2 = ["Good", "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"];
                let airQuality = currweather["air_quality"];
                const table = document.createElement('table');
                const thead = table.createTHead();
                const headerRow = thead.insertRow();
                const headers = ['CO','NO2', 'O3', 'PM2.5', 'PM10', 'SO2', 'Quality'];
                headers.forEach(text => {
                    const th = document.createElement('th');
                    th.textContent = text;
                    headerRow.appendChild(th);
                });
                const tbody = table.createTBody();
                const data = [
                    [`${airQuality['co']}`, `${airQuality['no2']}`,`${airQuality['o3']}`,`${airQuality['pm2_5']}`,`${airQuality['pm10']}`,`${airQuality['so2']}`,`${array2[airQuality['us-epa-index'] - 1]}`],
                ];
                data.forEach(rowData => {
                    const row = tbody.insertRow();
                    rowData.forEach(cellData => {
                        const cell = row.insertCell();
                        cell.textContent = cellData;
                    });
                });
                div1.append(table);

                let select2 = document.createElement("select");
                select2.className = "cwllselect";
                let array = ["cloud", "dewpoint_c", "gust_mph", "heatindex_c", "precip_mm", "pressure_mb"];
                let array1 = ["Cloud", "dewpoint in \u00B0C", "Gust in mph", "Heat Index in \u00B0C", "Precipitaion in mm", "Pressure in millibar"];
                let option6 = document.createElement("option");
                option6.innerText = "Others";
                select2.append(option6);
                for(let i=0;i<array.length;i++){
                    let option5 = document.createElement("option");
                    option5.innerText = `${array1[i]}`;
                    option5.value = `${array[i][0]}${array[i][1]}`;
                    select2.append(option5);
                }

                div1.append(select2);

                div.append(div1);
                let label = document.createElement("label");
                label.className = "currllother";
                select2.addEventListener("change", () => {
                    let count = 0;
                    for(let i=0;i<array.length;i++){
                        if(select2.value === `${array[i][0]}${array[i][1]}` && count === 0){
                            label.innerText = `${currweather[array[i]]}`;
                            count++;
                            break;
                        }
                        else if(select2.value === `${array[i][0]}${array[i][1]}` && count !== 0){
                            label.remove();
                            label.innerText = `${currweather[array[i]]}`;
                            count++;
                            break;
                        }
                    }
                    div1.append(label);
                })

                let gocwip = document.createElement("button");
                gocwip.innerText = "Go Back";
                div.append(gocwip);

                gocwip.addEventListener("click", () => {
                    h2.remove();
                    div1.remove();
                    gocwip.remove();
                    div.append(input);
                    input.value = "";
                    div.append(button);
                    div.append(gocw);
                })
            })
        })
    }
}

function showForecastData() {
    let select1 = document.createElement("select");
    select1.className = "cwselect";
    let option1 = document.createElement("option");
    option1.innerText = "Choose your input for location";
    select1.append(option1);
    let option2 = document.createElement("option");
    option2.value = "LL";
    option2.innerText = "Latitude and Longitude";
    select1.append(option2);
    let option3 = document.createElement("option");
    option3.value = "city";
    option3.innerText = "City name";
    select1.append(option3);
    let option4 = document.createElement("option");
    option4.value = "IP";
    option4.innerText = "IP address (IPv4 and IPv6)";
    select1.append(option4);
    main.append(select1);

    let gohome = document.createElement("button");
    gohome.innerText = "Go Back";
    main.append(gohome);
    gohome.addEventListener("click", () => {
        main.append(select);
        select.value = "";
        select1.remove();
        gohome.remove();
    })

    select1.addEventListener("change", () => {
        if(select1.value === "LL")
        {
            select1.remove();
            gohome.remove();
            showForecastDataLL();
        }
        else if(select1.value === "city")
        {
            select1.remove();
            gohome.remove();
            showForecastDataCity();
        }
        else if(select1.value === "IP")
        {
            select1.remove();
            gohome.remove();
            showForecastDataIP();
        }
    })

    function showForecastDataLL(){
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input1 = document.createElement("input");
        input1.type = "number";
        input1.placeholder = "Enter the latittude...";
        input1.className = "currlat";
        div.append(input1);
        let input2 = document.createElement("input");
        input2.type = "number";
        input2.placeholder = "Enter the longitude...";
        input2.className = "currlong";
        div.append(input2);
        let input3 = document.createElement("input");
        input3.type = "number";
        input3.placeholder = "Enter the no. of days ranging from 1 to 10";
        input3.className = "nod";
        div.append(input3);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);

        button.addEventListener("click", async () => {
            gocw.remove();
            if(input1.value === "" || input2.value === "" || input3.value === "")
                {
                    alert("Enter something");
                    return;
                }
                let response = await fetch(
                    `${API_URL}forecast.json?key=${API_KEY}&q=${input1.value},${input2.value}&days=${input3.value}&aqi=yes&alerts=no`
                )
                let data = response.json();
                data.then((res) => {
                    let foreweather = res['forecast'];
                    let currlocation = res['location'];
                    input1.remove();
                    input2.remove();
                    input3.remove();
                    button.remove();
                    let div1 = document.createElement("div");
                    div1.className = "currlldiv1";
                    let h2 = document.createElement("h2");
                    h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                    div.append(h2);

                    let foreweatherarray = foreweather['forecastday'];

                    let array2 = ["Good", "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"];
                    
                    for(let i=0;i<foreweatherarray.length;i++)
                    {
                        let fore = foreweatherarray[i];
                        let h3 = document.createElement("h3");
                        h3.innerText = `${fore['date']}`;
                        div1.append(h3);
                        let forecastday = fore["day"];
                        let airQuality = forecastday["air_quality"];
                        const table = document.createElement('table');
                        const thead = table.createTHead();
                        const headerRow = thead.insertRow();
                        const headers = ['Air Quality','Avg Humidity', 'Avg Temperature in \u00B0C', 'Condition', 'Max Temperature in \u00B0C', 'Min Temperature in \u00B0C', 'Max Wind Speed in mph', 'Total Precipitation in mm'];
                        headers.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow.appendChild(th);
                        });
                        const tbody = table.createTBody();
                        const data = [
                            [`${array2[airQuality['us-epa-index'] - 1]}`, `${forecastday['avghumidity']}`, `${forecastday['avgtemp_c']}`, `${forecastday['condition']['text']}`, `${forecastday['maxtemp_c']}`, `${forecastday['mintemp_c']}`, `${forecastday['maxwind_mph']}`, `${forecastday['totalprecip_mm']}`],
                        ];
                        data.forEach(rowData => {
                            const row = tbody.insertRow();
                            rowData.forEach(cellData => {
                                const cell = row.insertCell();
                                cell.textContent = cellData;
                            });
                        });
                        div1.append(table);

                        let h4 = document.createElement("h4");
                        h4.innerText = "On Hourly Basis";
                        div1.append(h4);

                        let forecasthour = fore["hour"];
                        const table2 = document.createElement('table');
                        const thead2 = table2.createTHead();
                        const headerRow2 = thead2.insertRow();
                        const headers2 = ['Time', 'Air Quality','Cloud', 'Temperature in \u00B0C', 'Condition', 'Humidity', 'Wind Speed in mph', 'Precipitation in mm'];
                        headers2.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow2.appendChild(th);
                        });
                        const tbody2 = table2.createTBody();
                        const data2 = [];
                        for(let i=0;i<24;i++)
                        {
                            let fore1 = forecasthour[i];
                            let airQualityhour = fore1["air_quality"];
                            data2[i] = [`${fore1["time"].slice(11)}`, 
                            `${array2[airQualityhour["us-epa-index"] - 1]}`,
                            `${fore1["cloud"]}`,
                            `${fore1["temp_c"]}`,
                            `${fore1["condition"]["text"]}`,
                            `${fore1["humidity"]}`,
                            `${fore1["wind_mph"]}`,
                            `${fore1["precip_mm"]}`]
                        }
                        console.log(data2);
                        data2.forEach(rowData2 => {
                            const row2 = tbody2.insertRow();
                            rowData2.forEach(cellData2 => {
                                const cell2 = row2.insertCell();
                                cell2.textContent = cellData2;
                            });
                        });
                        div1.append(table2);
                    }

                    div.append(div1);

                    let gocwll = document.createElement("button");
                    gocwll.innerText = "Go Back";
                    div.append(gocwll);

                    gocwll.addEventListener("click", () => {
                        h2.remove();
                        div1.remove();
                        gocwll.remove();
                        div.append(input1);
                        div.append(input2);
                        div.append(input3);
                        input1.value = "";
                        input2.value = "";
                        input3.value = "";
                        div.append(button);
                        div.append(gocw);
                    })
                })
        })
    }

    function showForecastDataCity(){
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter the City Name...";
        input.className = "currlat";
        div.append(input);
        let input3 = document.createElement("input");
        input3.type = "number";
        input3.placeholder = "Enter the no. of days ranging from 1 to 10";
        input3.className = "nod";
        div.append(input3);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);

        button.addEventListener("click", async () => {
            gocw.remove();
            if(input.value === "" || input3.value === "")
                {
                    alert("Enter something");
                    return;
                }
                let response = await fetch(
                    `${API_URL}forecast.json?key=${API_KEY}&q=${input.value}&days=${input3.value}&aqi=yes&alerts=no`
                )
                let data = response.json();
                data.then((res) => {
                    let foreweather = res['forecast'];
                    let currlocation = res['location'];
                    input.remove();
                    input3.remove();
                    button.remove();
                    let div1 = document.createElement("div");
                    div1.className = "currlldiv1";
                    let h2 = document.createElement("h2");
                    h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                    div.append(h2);

                    let foreweatherarray = foreweather['forecastday'];

                    let array2 = ["Good", "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"];
                    
                    for(let i=0;i<foreweatherarray.length;i++)
                    {
                        let fore = foreweatherarray[i];
                        let h3 = document.createElement("h3");
                        h3.innerText = `${fore['date']}`;
                        div1.append(h3);
                        let forecastday = fore["day"];
                        let airQuality = forecastday["air_quality"];
                        const table = document.createElement('table');
                        const thead = table.createTHead();
                        const headerRow = thead.insertRow();
                        const headers = ['Air Quality','Avg Humidity', 'Avg Temperature in \u00B0C', 'Condition', 'Max Temperature in \u00B0C', 'Min Temperature in \u00B0C', 'Max Wind Speed in mph', 'Total Precipitation in mm'];
                        headers.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow.appendChild(th);
                        });
                        const tbody = table.createTBody();
                        const data = [
                            [`${array2[airQuality['us-epa-index'] - 1]}`, `${forecastday['avghumidity']}`, `${forecastday['avgtemp_c']}`, `${forecastday['condition']['text']}`, `${forecastday['maxtemp_c']}`, `${forecastday['mintemp_c']}`, `${forecastday['maxwind_mph']}`, `${forecastday['totalprecip_mm']}`],
                        ];
                        data.forEach(rowData => {
                            const row = tbody.insertRow();
                            rowData.forEach(cellData => {
                                const cell = row.insertCell();
                                cell.textContent = cellData;
                            });
                        });
                        div1.append(table);

                        let h4 = document.createElement("h4");
                        h4.innerText = "On Hourly Basis";
                        div1.append(h4);

                        let forecasthour = fore["hour"];
                        const table2 = document.createElement('table');
                        const thead2 = table2.createTHead();
                        const headerRow2 = thead2.insertRow();
                        const headers2 = ['Time', 'Air Quality','Cloud', 'Temperature in \u00B0C', 'Condition', 'Humidity', 'Wind Speed in mph', 'Precipitation in mm'];
                        headers2.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow2.appendChild(th);
                        });
                        const tbody2 = table2.createTBody();
                        const data2 = [];
                        for(let i=0;i<24;i++)
                        {
                            let fore1 = forecasthour[i];
                            let airQualityhour = fore1["air_quality"];
                            data2[i] = [`${fore1["time"].slice(11)}`, 
                            `${array2[airQualityhour["us-epa-index"] - 1]}`,
                            `${fore1["cloud"]}`,
                            `${fore1["temp_c"]}`,
                            `${fore1["condition"]["text"]}`,
                            `${fore1["humidity"]}`,
                            `${fore1["wind_mph"]}`,
                            `${fore1["precip_mm"]}`]
                        }
                        console.log(data2);
                        data2.forEach(rowData2 => {
                            const row2 = tbody2.insertRow();
                            rowData2.forEach(cellData2 => {
                                const cell2 = row2.insertCell();
                                cell2.textContent = cellData2;
                            });
                        });
                        div1.append(table2);
                    }

                    div.append(div1);

                    let gofocity = document.createElement("button");
                    gofocity.innerText = "Go Back";
                    div.append(gofocity);

                    gofocity.addEventListener("click", () => {
                        h2.remove();
                        div1.remove();
                        gofocity.remove();
                        div.append(input);
                        div.append(input3);
                        input.value = "";
                        input3.value = "";
                        div.append(button);
                        div.append(gocw);
                    })
                })
        })
    }

    function showForecastDataIP() {
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = "Enter the IP Address...";
        input1.className = "currlat";
        div.append(input1);
        let input3 = document.createElement("input");
        input3.type = "number";
        input3.placeholder = "Enter the no. of days ranging from 1 to 10";
        input3.className = "nod";
        div.append(input3);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);
        button.addEventListener("click", async () => {
            gocw.remove();
            if(input1.value === "" || input3.value === "")                {
                alert("Enter something");
                return;
            }
            let ipString = input1.value;
            let count1 = 0, count2 = 0;
            for(let i=0;i<ipString.length;i++)
            {
                if(ipString[i] === '.') count1++;
                else if(ipString[i] === ':') count2++;
            }
            if(count1 !== 3 && count2 === 0)
            {
                alert("Enter the correct IPv4 address");
                return;
            }
            else if(count1 === 0 && count2 !== 7){
                alert("Enter the correct IPv6 address");
                return;
            }
            else if((count1 > 0 && count2 > 0)){
                alert("Is it an IP address?");
                return;
            }
                let response = await fetch(
                    `${API_URL}forecast.json?key=${API_KEY}&q=${input1.value}&days=${input3.value}&aqi=yes&alerts=no`
                )
                let data = response.json();
                data.then((res) => {
                    let foreweather = res['forecast'];
                    let currlocation = res['location'];
                    input1.remove();
                    input3.remove();
                    button.remove();
                    let div1 = document.createElement("div");
                    div1.className = "currlldiv1";
                    let h2 = document.createElement("h2");
                    h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                    div.append(h2);

                    let foreweatherarray = foreweather['forecastday'];

                    let array2 = ["Good", "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"];
                    
                    for(let i=0;i<foreweatherarray.length;i++)
                    {
                        let fore = foreweatherarray[i];
                        let h3 = document.createElement("h3");
                        h3.innerText = `${fore['date']}`;
                        div1.append(h3);
                        let forecastday = fore["day"];
                        let airQuality = forecastday["air_quality"];
                        const table = document.createElement('table');
                        const thead = table.createTHead();
                        const headerRow = thead.insertRow();
                        const headers = ['Air Quality','Avg Humidity', 'Avg Temperature in \u00B0C', 'Condition', 'Max Temperature in \u00B0C', 'Min Temperature in \u00B0C', 'Max Wind Speed in mph', 'Total Precipitation in mm'];
                        headers.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow.appendChild(th);
                        });
                        const tbody = table.createTBody();
                        const data = [
                            [`${array2[airQuality['us-epa-index'] - 1]}`, `${forecastday['avghumidity']}`, `${forecastday['avgtemp_c']}`, `${forecastday['condition']['text']}`, `${forecastday['maxtemp_c']}`, `${forecastday['mintemp_c']}`, `${forecastday['maxwind_mph']}`, `${forecastday['totalprecip_mm']}`],
                        ];
                        data.forEach(rowData => {
                            const row = tbody.insertRow();
                            rowData.forEach(cellData => {
                                const cell = row.insertCell();
                                cell.textContent = cellData;
                            });
                        });
                        div1.append(table);

                        let h4 = document.createElement("h4");
                        h4.innerText = "On Hourly Basis";
                        div1.append(h4);

                        let forecasthour = fore["hour"];
                        const table2 = document.createElement('table');
                        const thead2 = table2.createTHead();
                        const headerRow2 = thead2.insertRow();
                        const headers2 = ['Time', 'Air Quality','Cloud', 'Temperature in \u00B0C', 'Condition', 'Humidity', 'Wind Speed in mph', 'Precipitation in mm'];
                        headers2.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow2.appendChild(th);
                        });
                        const tbody2 = table2.createTBody();
                        const data2 = [];
                        for(let i=0;i<24;i++)
                        {
                            let fore1 = forecasthour[i];
                            let airQualityhour = fore1["air_quality"];
                            data2[i] = [`${fore1["time"].slice(11)}`, 
                            `${array2[airQualityhour["us-epa-index"] - 1]}`,
                            `${fore1["cloud"]}`,
                            `${fore1["temp_c"]}`,
                            `${fore1["condition"]["text"]}`,
                            `${fore1["humidity"]}`,
                            `${fore1["wind_mph"]}`,
                            `${fore1["precip_mm"]}`]
                        }
                        console.log(data2);
                        data2.forEach(rowData2 => {
                            const row2 = tbody2.insertRow();
                            rowData2.forEach(cellData2 => {
                                const cell2 = row2.insertCell();
                                cell2.textContent = cellData2;
                            });
                        });
                        div1.append(table2);
                    }

                    div.append(div1);

                    let gofoip = document.createElement("button");
                    gofoip.innerText = "Go Back";
                    div.append(gofoip);

                    gofoip.addEventListener("click", () => {
                        h2.remove();
                        div1.remove();
                        gofoip.remove();
                        div.append(input1);
                        div.append(input3);
                        input1.value = "";
                        input3.value = "";
                        div.append(button);
                        div.append(gocw);
                    })
                })
        })
    }
}

function showFutureData() {
    let select1 = document.createElement("select");
    select1.className = "cwselect";
    let option1 = document.createElement("option");
    option1.innerText = "Choose your input for location";
    select1.append(option1);
    let option2 = document.createElement("option");
    option2.value = "LL";
    option2.innerText = "Latitude and Longitude";
    select1.append(option2);
    let option3 = document.createElement("option");
    option3.value = "city";
    option3.innerText = "City name";
    select1.append(option3);
    let option4 = document.createElement("option");
    option4.value = "IP";
    option4.innerText = "IP address (IPv4 and IPv6)";
    select1.append(option4);
    main.append(select1);

    let gohome = document.createElement("button");
    gohome.innerText = "Go Back";
    main.append(gohome);
    gohome.addEventListener("click", () => {
        main.append(select);
        select.value = "";
        select1.remove();
        gohome.remove();
    })

    select1.addEventListener("change", () => {
        if(select1.value === "LL")
        {
            select1.remove();
            gohome.remove();
            showFutureDataLL();
        }
        else if(select1.value === "city")
        {
            select1.remove();
            gohome.remove();
            showFutureDataCity();
        }
        else if(select1.value === "IP")
        {
            select1.remove();
            gohome.remove();
            showFutureDataIP();
        }
    })

    function showFutureDataLL(){
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input1 = document.createElement("input");
        input1.type = "number";
        input1.placeholder = "Enter the latittude...";
        input1.className = "currlat";
        div.append(input1);
        let input2 = document.createElement("input");
        input2.type = "number";
        input2.placeholder = "Enter the longitude...";
        input2.className = "currlong";
        div.append(input2);
        let input3 = document.createElement("input");
        input3.type = "text";
        let label = document.createElement("label");
        label.innerText = "Enter the date in yyyy-mm-dd format between 14 days and 300 days from today";
        label.className = "datelabel";
        div.append(label);
        input3.className = "nod";
        div.append(input3);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);

        button.addEventListener("click", async () => {
            gocw.remove();
            if(input1.value === "" || input2.value === "" || input3.value === "")
                {
                    alert("Enter something");
                    return;
                }
                let response = await fetch(
                    `${API_URL}future.json?key=${API_KEY}&q=${input1.value},${input2.value}&dt=${input3.value}`
                )
                let data = response.json();
                data.then((res) => {
                    let foreweather = res['forecast'];
                    let currlocation = res['location'];
                    input1.remove();
                    input2.remove();
                    label.remove(); 
                    input3.remove();
                    button.remove();
                    let div1 = document.createElement("div");
                    div1.className = "currlldiv1";
                    let h2 = document.createElement("h2");
                    h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                    div.append(h2);

                    let foreweatherarray = foreweather['forecastday'][0];
                        console.log(foreweatherarray);
                        let h3 = document.createElement("h3");
                        h3.innerText = `${foreweatherarray['date']}`;
                        div1.append(h3);
                        let forecastday = foreweatherarray["day"];
                        const table = document.createElement('table');
                        const thead = table.createTHead();
                        const headerRow = thead.insertRow();
                        const headers = ['Avg Humidity', 'Avg Temperature in \u00B0C', 'Condition', 'Max Temperature in \u00B0C', 'Min Temperature in \u00B0C', 'Max Wind Speed in mph', 'Total Precipitation in mm'];
                        headers.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow.appendChild(th);
                        });
                        const tbody = table.createTBody();
                        const data = [
                            [`${forecastday['avghumidity']}`, `${forecastday['avgtemp_c']}`, `${forecastday['condition']['text']}`, `${forecastday['maxtemp_c']}`, `${forecastday['mintemp_c']}`, `${forecastday['maxwind_mph']}`, `${forecastday['totalprecip_mm']}`],
                        ];
                        data.forEach(rowData => {
                            const row = tbody.insertRow();
                            rowData.forEach(cellData => {
                                const cell = row.insertCell();
                                cell.textContent = cellData;
                            });
                        });
                        div1.append(table);

                        let h4 = document.createElement("h4");
                        h4.innerText = "On Hourly Basis";
                        div1.append(h4);

                        let forecasthour = foreweatherarray["hour"];
                        const table2 = document.createElement('table');
                        const thead2 = table2.createTHead();
                        const headerRow2 = thead2.insertRow();
                        const headers2 = ['Time', 'Cloud', 'Temperature in \u00B0C', 'Condition', 'Humidity', 'Wind Speed in mph', 'Precipitation in mm'];
                        headers2.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow2.appendChild(th);
                        });
                        const tbody2 = table2.createTBody();
                        const data2 = [];
                        for(let i=0;i<24;i++)
                        {
                            let fore1 = forecasthour[i];
                            data2[i] = [`${fore1["time"].slice(11)}`, 
                            `${fore1["cloud"]}`,
                            `${fore1["temp_c"]}`,
                            `${fore1["condition"]["text"]}`,
                            `${fore1["humidity"]}`,
                            `${fore1["wind_mph"]}`,
                            `${fore1["precip_mm"]}`]
                        }
                        console.log(data2);
                        data2.forEach(rowData2 => {
                            const row2 = tbody2.insertRow();
                            rowData2.forEach(cellData2 => {
                                const cell2 = row2.insertCell();
                                cell2.textContent = cellData2;
                            });
                        });
                        div1.append(table2);

                    div.append(div1);

                    let gocwll = document.createElement("button");
                    gocwll.innerText = "Go Back";
                    div.append(gocwll);

                    gocwll.addEventListener("click", () => {
                        h2.remove();
                        div1.remove();
                        gocwll.remove();
                        div.append(input1);
                        div.append(input2);
                        div.append(label);
                        div.append(input3);
                        input1.value = "";
                        input2.value = "";
                        input3.value = "";
                        div.append(button);
                        div.append(gocw);
                    })
                })
        })
    }

    function showFutureDataCity(){
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter the City Name...";
        input.className = "currlat";
        div.append(input);
        let input3 = document.createElement("input");
        input3.type = "text";
        let label = document.createElement("label");
        label.innerText = "Enter the date in yyyy-mm-dd format between 14 days and 300 days from today";
        label.className = "datelabel";
        div.append(label);
        input3.className = "nod";
        div.append(input3);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);

        button.addEventListener("click", async () => {
            gocw.remove();
            if(input.value === "" || input3.value === "")
                {
                    alert("Enter something");
                    return;
                }
                let response = await fetch(
                    `${API_URL}future.json?key=${API_KEY}&q=${input.value}&dt=${input3.value}`
                )
                let data = response.json();
                data.then((res) => {
                    let foreweather = res['forecast'];
                    let currlocation = res['location'];
                    input.remove();
                    label.remove();
                    input3.remove();
                    button.remove();
                    let div1 = document.createElement("div");
                    div1.className = "currlldiv1";
                    let h2 = document.createElement("h2");
                    h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                    div.append(h2);

                    let foreweatherarray = foreweather['forecastday'];

                    let fore = foreweatherarray[0];
                        let h3 = document.createElement("h3");
                        h3.innerText = `${fore['date']}`;
                        div1.append(h3);
                        let forecastday = fore["day"];
                        const table = document.createElement('table');
                        const thead = table.createTHead();
                        const headerRow = thead.insertRow();
                        const headers = ['Avg Humidity', 'Avg Temperature in \u00B0C', 'Condition', 'Max Temperature in \u00B0C', 'Min Temperature in \u00B0C', 'Max Wind Speed in mph', 'Total Precipitation in mm'];
                        headers.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow.appendChild(th);
                        });
                        const tbody = table.createTBody();
                        const data = [
                            [`${forecastday['avghumidity']}`, `${forecastday['avgtemp_c']}`, `${forecastday['condition']['text']}`, `${forecastday['maxtemp_c']}`, `${forecastday['mintemp_c']}`, `${forecastday['maxwind_mph']}`, `${forecastday['totalprecip_mm']}`],
                        ];
                        data.forEach(rowData => {
                            const row = tbody.insertRow();
                            rowData.forEach(cellData => {
                                const cell = row.insertCell();
                                cell.textContent = cellData;
                            });
                        });
                        div1.append(table);

                        let h4 = document.createElement("h4");
                        h4.innerText = "On Hourly Basis";
                        div1.append(h4);

                        let forecasthour = fore["hour"];
                        const table2 = document.createElement('table');
                        const thead2 = table2.createTHead();
                        const headerRow2 = thead2.insertRow();
                        const headers2 = ['Time', 'Cloud', 'Temperature in \u00B0C', 'Condition', 'Humidity', 'Wind Speed in mph', 'Precipitation in mm'];
                        headers2.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow2.appendChild(th);
                        });
                        const tbody2 = table2.createTBody();
                        const data2 = [];
                        for(let i=0;i<24;i++)
                        {
                            let fore1 = forecasthour[i];
                            data2[i] = [`${fore1["time"].slice(11)}`, 
                            `${fore1["cloud"]}`,
                            `${fore1["temp_c"]}`,
                            `${fore1["condition"]["text"]}`,
                            `${fore1["humidity"]}`,
                            `${fore1["wind_mph"]}`,
                            `${fore1["precip_mm"]}`]
                        }
                        console.log(data2);
                        data2.forEach(rowData2 => {
                            const row2 = tbody2.insertRow();
                            rowData2.forEach(cellData2 => {
                                const cell2 = row2.insertCell();
                                cell2.textContent = cellData2;
                            });
                        });
                        div1.append(table2);

                    div.append(div1);

                    let gofocity = document.createElement("button");
                    gofocity.innerText = "Go Back";
                    div.append(gofocity);

                    gofocity.addEventListener("click", () => {
                        h2.remove();
                        div1.remove();
                        gofocity.remove();
                        div.append(input);
                        div.append(label);
                        div.append(input3);
                        input.value = "";
                        input3.value = "";
                        div.append(button);
                        div.append(gocw);
                    })
                })
        })
    }

    function showFutureDataIP() {
        let div = document.createElement("div");
        div.className = "currlldiv";
        let input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = "Enter the IP Address...";
        input1.className = "currlat";
        div.append(input1);
        let input3 = document.createElement("input");
        input3.type = "text";
        let label = document.createElement("label");
        label.innerText = "Enter the date in yyyy-mm-dd format between 14 days and 300 days from today";
        label.className = "datelabel";
        div.append(label);
        input3.className = "nod";
        div.append(input3);
        let button = document.createElement("button");
        button.className = "currll";
        button.innerText = "Find the weather";
        div.append(button);

        let gocw = document.createElement("button");
        gocw.innerText = "Go Back";
        div.append(gocw);

        gocw.addEventListener("click", () => {
            main.append(select1);
            select1.value = "";
            main.append(gohome);
            div.remove();
        })

        main.append(div);
        button.addEventListener("click", async () => {
            gocw.remove();
            if(input1.value === "" || input3.value === "")                {
                alert("Enter something");
                return;
            }
            let ipString = input1.value;
            let count1 = 0, count2 = 0;
            for(let i=0;i<ipString.length;i++)
            {
                if(ipString[i] === '.') count1++;
                else if(ipString[i] === ':') count2++;
            }
            if(count1 !== 3 && count2 === 0)
            {
                alert("Enter the correct IPv4 address");
                return;
            }
            else if(count1 === 0 && count2 !== 7){
                alert("Enter the correct IPv6 address");
                return;
            }
            else if((count1 > 0 && count2 > 0)){
                alert("Is it an IP address?");
                return;
            }
                let response = await fetch(
                    `${API_URL}future.json?key=${API_KEY}&q=${input1.value}&dt=${input3.value}`
                )
                let data = response.json();
                data.then((res) => {
                    let foreweather = res['forecast'];
                    let currlocation = res['location'];
                    input1.remove();
                    label.remove();
                    input3.remove();
                    button.remove();
                    let div1 = document.createElement("div");
                    div1.className = "currlldiv1";
                    let h2 = document.createElement("h2");
                    h2.innerText = `${currlocation['name']}, ${currlocation['country']}`;
                    div.append(h2);

                    let foreweatherarray = foreweather['forecastday'];
                    
                    let fore = foreweatherarray[0];
                        let h3 = document.createElement("h3");
                        h3.innerText = `${fore['date']}`;
                        div1.append(h3);
                        let forecastday = fore["day"];
                        const table = document.createElement('table');
                        const thead = table.createTHead();
                        const headerRow = thead.insertRow();
                        const headers = ['Avg Humidity', 'Avg Temperature in \u00B0C', 'Condition', 'Max Temperature in \u00B0C', 'Min Temperature in \u00B0C', 'Max Wind Speed in mph', 'Total Precipitation in mm'];
                        headers.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow.appendChild(th);
                        });
                        const tbody = table.createTBody();
                        const data = [
                            [`${forecastday['avghumidity']}`, `${forecastday['avgtemp_c']}`, `${forecastday['condition']['text']}`, `${forecastday['maxtemp_c']}`, `${forecastday['mintemp_c']}`, `${forecastday['maxwind_mph']}`, `${forecastday['totalprecip_mm']}`],
                        ];
                        data.forEach(rowData => {
                            const row = tbody.insertRow();
                            rowData.forEach(cellData => {
                                const cell = row.insertCell();
                                cell.textContent = cellData;
                            });
                        });
                        div1.append(table);

                        let h4 = document.createElement("h4");
                        h4.innerText = "On Hourly Basis";
                        div1.append(h4);

                        let forecasthour = fore["hour"];
                        const table2 = document.createElement('table');
                        const thead2 = table2.createTHead();
                        const headerRow2 = thead2.insertRow();
                        const headers2 = ['Time', 'Cloud', 'Temperature in \u00B0C', 'Condition', 'Humidity', 'Wind Speed in mph', 'Precipitation in mm'];
                        headers2.forEach(text => {
                            const th = document.createElement('th');
                            th.textContent = text;
                            headerRow2.appendChild(th);
                        });
                        const tbody2 = table2.createTBody();
                        const data2 = [];
                        for(let i=0;i<24;i++)
                        {
                            let fore1 = forecasthour[i];
                            data2[i] = [`${fore1["time"].slice(11)}`, 
                            `${fore1["cloud"]}`,
                            `${fore1["temp_c"]}`,
                            `${fore1["condition"]["text"]}`,
                            `${fore1["humidity"]}`,
                            `${fore1["wind_mph"]}`,
                            `${fore1["precip_mm"]}`]
                        }
                        console.log(data2);
                        data2.forEach(rowData2 => {
                            const row2 = tbody2.insertRow();
                            rowData2.forEach(cellData2 => {
                                const cell2 = row2.insertCell();
                                cell2.textContent = cellData2;
                            });
                        });
                        div1.append(table2);

                    div.append(div1);

                    let gofoip = document.createElement("button");
                    gofoip.innerText = "Go Back";
                    div.append(gofoip);

                    gofoip.addEventListener("click", () => {
                        h2.remove();
                        div1.remove();
                        gofoip.remove();
                        div.append(input1);
                        div.append(label);
                        div.append(input3);
                        input1.value = "";
                        input3.value = "";
                        div.append(button);
                        div.append(gocw);
                    })
                })
        })
    }
}