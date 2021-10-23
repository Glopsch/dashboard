var nmap = require('node-nmap');

nmap.nmapLocation = process.env.NMAP_LOCATION || "nmap"; // "nmap"; //default

const networkIP     = "192.168.2.0";
const networkSuffix = "24";

function handleNetworkScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`${networkIP}/${networkSuffix}`, '-sn -R -T5'); //-sn
    
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