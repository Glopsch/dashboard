const autoReloadMs = 5 * 60 * 1000;
var timerHandle = undefined;

scanNetwork();

function setRefreshTimer() {
    timerHandle = setTimeout(function(){ scanNetwork(); }, autoReloadMs);
}
function resetRefreshTimer() {
    if(timerHandle) {
        window.clearTimeout(timerHandle);
        setRefreshTimer();
    }
    else
        console.log("Warning: timerHandle undefined");
}

function logout() {
    window.localStorage.removeItem('dash_tkn');
    window.location.href = "/login.html";
}

function scanNetwork() {
    document.getElementById('network_results').innerText += "\nScanne Netzwerk...";
    const token = window.localStorage.getItem('dash_tkn');
    if(token) {
        fetch(`/scan/network`, {
            method: "get",
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        })
        .then(response => {
            console.log(response);
            if(response.ok)
                return response.json()
            else {
                if(response.status === 401) {
                    logout();
                }
            }
        })
        .then(data => {
            console.log(data);
            document.getElementById('network_results').innerText = `Zuletzt aktualisiert: ${new Date().toLocaleString()}`;
            formatNetwork(data);
            setRefreshTimer();
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        logout();
    }
}

function scanDetailed(deviceID, ip) {
    if(document.getElementById(`detail-button-d${deviceID}`).innerText === "Detailscan") {
        document.getElementById(`detail-button-d${deviceID}`).innerText = "Scanne Gerät...";
        const token = window.localStorage.getItem('dash_tkn');
        if(token) {
            fetch(`/scan/detail/${ip}`, {
                method: "get",
                headers: new Headers({
                    'Authorization': `Bearer ${token}`
                })
            })
            .then(response => {
                console.log(response);
                if(response.ok)
                    return response.json()
                else {
                    if(response.status === 401) {
                        logout();
                    }
                }
            })
            .then(data => {
                console.log(data);
                document.getElementById(`detail-button-d${deviceID}`).innerText = "Details ausblenden";
                // document.getElementById(`detail-button-d${deviceID}`).removeEventListener("click", () => scanDetailed(deviceID, data.ip));
                // document.getElementById(`detail-button-d${deviceID}`).addEventListener("click", () => hideDetails(deviceID, data.ip));
                // document.getElementById(`detail-button-d${deviceID}`).onclick = `() => hideDetails('${deviceID}', '${ip}')`;
                console.log("Helo");
                formatDetails(deviceID, data);
                // resetRefreshTimer();
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            logout();
        }
    } else if(document.getElementById(`detail-button-d${deviceID}`).innerText === "Details ausblenden") {
        hideDetails(deviceID, ip);
    } else {
        console.log("trying abort");
    }
}

function hideDetails(deviceID, ip) {
    console.log("HIAFS");
    // const foundDetails = document.getElementsByClassName(`detail-row-d${deviceID}`);
    removeElementsByClassName(`detail-row-d${deviceID}`);
    // console.log(foundDetails, foundDetails.toString());
    // for (const detailRow of foundDetails) {
    //     console.log("removing", JSON.stringify(detailRow));
    //     detailRow.remove();
    // }
    document.getElementById(`detail-button-d${deviceID}`).innerText = "Detailscan";
    // document.getElementById(`detail-button-d${deviceID}`).removeEventListener("click", () => hideDetails(deviceID, ip));
    // document.getElementById(`detail-button-d${deviceID}`).addEventListener("click", () => scanDetailed(deviceID, ip));
}

function removeElementsByClassName(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function formatNetwork(resultData) {
    const devicesTable = document.getElementById("t-devices");
    devicesTable.innerHTML = "";
    for (let i = 0; i < resultData.length; i++) {
        deviceTR = document.createElement("tr");
        deviceTR.innerHTML = 
                `<td class="py-3">`
            +       `<a id="b-dropdown-d${i}" class="b-dropdown" data-toggle="collapse" href="#collapse-d${i}" role="button" aria-expanded="false" aria-controls="collapse-d${i}">`
            +           `<span class="b-dropdow">&#9660;  </span><h3 id="d${i}" style="display: inline-block;">${resultData[i].hostname ? resultData[i].hostname : (resultData[i].ip ? resultData[i].ip : (resultData[i].mac ? resultData[i].mac : "Unbekanntes Gerät"))}</h3>`
            +       `</a>`
            +       `<div class="t-device collapse" id="collapse-d${i}">`
            +           `<table id="t${i}">`
            +               `<tr><td class="device-network">MAC</td><td>${resultData[i].mac ? resultData[i].mac : "?"}</td></tr>\n`
            +               `<tr><td class="device-network">IP</td><td>${resultData[i].ip ? resultData[i].ip : "?"}</td></tr>\n`
            +               `<tr><td class="device-network">Vendor</td><td>${resultData[i].vendor ? resultData[i].vendor : "?"}</td></tr>`
            +           `</table>`
            +           `<div style="text-align: center; padding: 10px 0">`
            +               `<button id="detail-button-d${i}" class="b-filled-orange" onclick="scanDetailed('${i}', '${resultData[i].ip}')">Detailscan</button>`
            +           `</div>`
            +       `</div>`
            +   `</td>`;
        console.log(deviceTR.innerHTML.toString());
        devicesTable.appendChild(deviceTR);
    }
}
function formatDetails(deviceID, resultData) {          
    let i = 0;
    // console.log(resultData[i].openPorts && resultData[i].openPorts);
        document.getElementById(`d${deviceID}`).innerText = resultData[i].hostname ? resultData[i].hostname : (resultData[i].ip ? resultData[i].ip : (resultData[i].mac ? resultData[i].mac : "Unbekanntes Gerät"));
        document.getElementById(`t${deviceID}`).innerHTML =
              `<tr><td class="device-network">MAC</td><td>${resultData[i].mac ? resultData[i].mac : "?"}</td></tr>\n`
            + `<tr><td class="device-network">IP</td><td>${resultData[i].ip ? resultData[i].ip : "?"}</td></tr>\n`
            + `<tr><td class="device-network">Vendor</td><td>${resultData[i].vendor ? resultData[i].vendor : "?"}</td></tr>\n`
            + `<tr class="detail-row-d${deviceID}"><td colspan="2"><hr></td></tr>`
            + `<tr class="detail-row-d${deviceID}"><td class="device-detail">OS</td><td>${resultData[i].osNmap ? resultData[i].osNmap : "?"}</td></tr>\n`
            + `<tr class="detail-row-d${deviceID}"><td class="device-detail">Offene Ports</td><td>${resultData[i].openPorts ? formatPorts(resultData[i].openPorts) : "?"}</td></tr>`;
}
function formatPorts(resultDataPorts) {
    console.log(resultDataPorts);
    let formatted = `<div class="t-ports"><table>`;
    for (let i = 0; i < resultDataPorts.length; i++) {
        formatted +=
          ``
        
        + `<tr><td class="device-detail">Port</td><td>${resultDataPorts[i].port ? resultDataPorts[i].port : "?"}</td></tr>\n`
        + `<tr><td class="device-detail">Protokol</td><td>${resultDataPorts[i].protocol ? resultDataPorts[i].protocol : "?"}</td></tr>\n`
        + `<tr><td class="device-detail">Dienst</td><td>${resultDataPorts[i].service ? resultDataPorts[i].service : "?"}</td></tr>\n`
        + `${(i < resultDataPorts.length - 1) ? '<tr><td colspan="2"><hr class="light"></td></tr>' : ''}`
        + ``
    }
    return formatted + "</table></div>";
}