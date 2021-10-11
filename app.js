const express = require('express');

const scan = require( './controllers/scanGet' );

const app = express();
const port = 3000;

app.use(express.static('public'));


app.get('/scan/network/:ip/:suffix', (req, res) => {
  scan.handleNetworkScanGet(req, res);
});

app.get('/scan/detail/:ip', (req, res) => {
  scan.handleDetailScanGet(req, res);
});


app.listen(port, () => {
  console.log(`Dashboard app listening at http://localhost:${port}`)
});