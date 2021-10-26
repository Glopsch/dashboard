require('dotenv').config();

var nmap = require('node-nmap');
var ip = require('ip');

const { execSync } = require('child_process');

nmap.nmapLocation = process.env.NMAP_LOCATION || "nmap"; // "nmap"; //default

const fallbackNetworkCIDR = process.env.FALLBACK_NETWORK_CIDR || "192.168.2.0/24";


function getNetworkAddressAndSuffix() {
    console.log(1);
    try{
        execSync("ip -o -f inet addr show | awk '/scope global/ {print $4}'", (err, localIP, stderr) => {
            console.log(2);
            if (err) {
                console.log(err);
                console.log(2.1);
            } else {
                console.log(`stdout: ${localIP}`);
                const { networkAddress, subnetMaskLength } = ip.cidrSubnet(localIP);
                console.log(2.2);
                return `${networkAddress}/${subnetMaskLength}`;
            }
        });
    } catch(err) {
        console.log(3);
        console.log("exec failed");
        console.log(err);
    }
    console.log(4);
    // const { networkAddress, subnetMaskLength } = ip.cidrSubnet("192.168.2.0/24");
    // return `${networkAddress}/${subnetMaskLength}`;
    return fallbackNetworkCIDR;
}

function handleNetworkScanGet(req, res) {
    const netIpAndSuffix = getNetworkAddressAndSuffix();
    console.log(netIpAndSuffix);

    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(netIpAndSuffix, '-sn -R -T5'); //-sn
    
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
