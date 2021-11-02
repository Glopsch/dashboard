require('dotenv').config();

var nmap = require('node-nmap');
var ip = require('ip');

const { exec } = require('child_process');

nmap.nmapLocation = process.env.NMAP_LOCATION || "nmap"; // "nmap"; //default

const fallbackNetworkCIDR = process.env.FALLBACK_NETWORK_CIDR || "192.168.2.0/24";


function handleNetworkScanGet(req, res) {

    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan;
    if(process.platform === "linux") { //production
        exec("ip -o -f inet addr show | awk '/scope global/ {print $4}'", (err, stdout, stderr) => {
            if(err) {
                console.log(err);
                return;
            }
            if(stderr) {
                console.log(stderr);
                return;
            }
            console.log(`stdout: ${stdout}`);
            const { networkAddress, subnetMaskLength } = ip.cidrSubnet(stdout);
            console.log(2.2, networkAddress, subnetMaskLength);
            nmapscan = new nmap.NmapScan(`${networkAddress}/${subnetMaskLength}`, '-sn -R -T5');
    
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
        })
    }
    else { //development
        nmapscan = new nmap.NmapScan(fallbackNetworkCIDR, '-sn -R -T5');
    
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
