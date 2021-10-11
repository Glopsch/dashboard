var nmap = require('node-nmap');

nmap.nmapLocation = 'C:\\Program Files (x86)\\Nmap\\nmap.exe'; // "nmap"; //default

function handleNetworkScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`${req.params.ip}/${req.params.suffix}`, '-sn -R'); //-sn
    
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
    // returns
    // [  
    //    {  
    //       "hostname":"localhost",
    //       "ip":"127.0.0.1",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    },
    //    {  
    //       "hostname":"google.com",
    //       "ip":"74.125.21.113",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    }
    // ]
}

function handleDetailScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`${req.params.ip}`, '-sV -O'); //-sn
    
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
    // returns
    // [  
    //    {  
    //       "hostname":"localhost",
    //       "ip":"127.0.0.1",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    },
    //    {  
    //       "hostname":"google.com",
    //       "ip":"74.125.21.113",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    }
    // ]
}



function handleQuickScanGet(req, res) {

    console.log(req.params.ip);
    //    Accepts array or comma separated string of NMAP acceptable hosts
    var quickscan = new nmap.QuickScan(`${req.params.ip}`);
    
    quickscan.on('complete', function(data){
      console.log(data);
      res.send(data);
    });
    
    quickscan.on('error', function(error){
      console.log(error);
      res.status( 500 );
    });
    
    quickscan.startScan();
    // returns
    // [  
    //    {  
    //       "hostname":"localhost",
    //       "ip":"127.0.0.1",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    },
    //    {  
    //       "hostname":"google.com",
    //       "ip":"74.125.21.113",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    }
    // ]
}

function handleCustomScanGet(req, res) {
    //    Accepts array or comma separarted string for custom nmap commands in the second argument.
    var nmapscan = new nmap.NmapScan(`192.168.1.0/24`, '-sn -R'); //-sn
    
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
    // returns
    // [  
    //    {  
    //       "hostname":"localhost",
    //       "ip":"127.0.0.1",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    },
    //    {  
    //       "hostname":"google.com",
    //       "ip":"74.125.21.113",
    //       "mac":null,
    //       "openPorts":[  
    
    //       ],
    //       "osNmap":null
    //    }
    // ]
}



function handleOsAndPortScanGet(req, res) {
    var osandports = new nmap.OsAndPortScan(`${req.params.ip}`);

    osandports.on('complete',function(data){
    console.log(data);
    res.send(data);
    });

    osandports.on('error', function(error){
    console.log(error);
    res.status( 500 );
    });

    osandports.startScan();
    // returns
    // [
    //    {  
    //       "hostname":"google.com",
    //       "ip":"74.125.21.113",
    //       "mac":null,
    //       "openPorts":[  
    //          {  
    //             "port":80,
    //             "service":"http"
    //          },
    //          {  
    //             "port":443,
    //             "service":"https"
    //          }
    //       ],
    //       "osNmap":"OpenBSD 4.3"
    //    }
    // ]
}

module.exports = {
    handleNetworkScanGet,
    handleDetailScanGet,
    handleQuickScanGet,
    handleCustomScanGet,
    handleOsAndPortScanGet
};