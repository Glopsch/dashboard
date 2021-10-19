var nmap = require('node-nmap');

nmap.nmapLocation = 'C:\\Program Files (x86)\\Nmap\\nmap.exe'; // "nmap"; //default

function handleNetworkScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`${req.params.ip}/${req.params.suffix}`, '-sn -R -T5'); //-sn
    
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

function handlePortScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`${req.params.ip}`, '-sT -Pn -T5'); //-sn
    
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

function handleDetailScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`${req.params.ip}`, '-sV -Pn -T5'); //-sn
    
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
    handlePortScanGet,
    handleDetailScanGet
};