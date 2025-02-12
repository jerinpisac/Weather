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
    else if(select.value === "PW")
    {
        select.remove();
        showPreviousData();
    }
    else if(select.value === "F")
    {
        select.remove();
        showForecastData();
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

