const express     = require('express');

const scan              = require( './controllers/scanGet' );
const auth              = require( './controllers/auth' );

const { requireAuth }   = require( './middleware/requireAuth' );

const app = express();
const port = 80;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));


app.get('/scan/network/:ip/:suffix', requireAuth, (req, res) => {
  scan.handleNetworkScanGet(req, res);
});
app.get('/scan/ports/:ip', requireAuth, (req, res) => {
  scan.handlePortScanGet(req, res);
});
app.get('/scan/detail/:ip', requireAuth, (req, res) => {
  scan.handleDetailScanGet(req, res);
});


app.post('/auth/init', (req, res) => {
  auth.handleInitPost(req, res);
})
app.post('/auth/login', (req, res) => {
  auth.handleLoginPost(req, res);
})


app.listen(port, () => {
  console.log(`Dashboard app listening on port ${port}`)
});
