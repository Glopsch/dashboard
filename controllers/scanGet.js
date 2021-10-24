var nmap = require('node-nmap');
var ip = require('ip');

const { exec } = require('child_process');

nmap.nmapLocation = process.env.NMAP_LOCATION || "nmap"; // "nmap"; //default



// const networkIP     = "192.168.2.0";
// const networkSuffix = "24";

function getNetworkAddressAndSuffix() {
    exec("ip -o -f inet addr show | awk '/scope global/ {print $4}'", (err, localIP, stderr) => {
        if (err) {
            console.error(err)
            return undefined;
        } else {
            console.log(`stdout: ${localIP}`);
            return { networkAddress, subnetMaskLength } = ip.cidrSubnet(localIP);
        }
    });
}

function handleNetworkScanGet(req, res) {
    const { networkAddress, subnetMaskLength } = getNetworkAddressAndSuffix();
    console.log(networkAddress, subnetMaskLength);
    // if( networkAddress == undefined || subnetMaskLength == undefined)
    //     res.status(500);

    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`${networkAddress}/${subnetMaskLength}`, '-sn -R -T5'); //-sn
    
    nmapscan.on('complete',function(data){
        console.log(nmapscan.scanTime);
        console.log(data);
        res.send(data);
    });

    nmapscan.on('error', function(error){
        console.log(error);
        res.status( 500 );
    });
    
    nmapscan.startScan();
}

// function handlePortScanGet(req, res) {
//     //    Accepts array or comma separarted string for custom nmap commands in the second argument.
//     var nmapscan = new nmap.NmapScan(`${req.params.ip}`, '-sT -Pn -T5'); //-sn
    
//     nmapscan.on('complete',function(data){
//         console.log(nmapscan.scanTime);
//         console.log(data);
//         res.send(data);
//     });

//     nmapscan.on('error', function(error){
//         console.log(error);
//         res.status( 500 );
//     });
    
//     nmapscan.startScan();
// }

function handleDetailScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.OsAndPortScan(`${req.params.ip}`);
    
    nmapscan.on('complete',function(data){
        console.log(nmapscan.scanTime);
        console.log(data);
        res.send(data);
    });

    nmapscan.on('error', function(error){
        console.log(error);
        res.status( 500 );
    });
    
    nmapscan.startScan();
}

module.exports = {
    handleNetworkScanGet,
    // handlePortScanGet,
    handleDetailScanGet
};
