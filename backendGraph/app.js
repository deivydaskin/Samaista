const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require("cors");
const PDFDocument = require('pdfkit');
const Menu = require('./models/Menu.js');
const TechCard = require('./models/TechCard.js');
const Product = require('./models/Product.js');

app.use(cors({ origin: 'http://localhost:3000' }));

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-fj-8t2wi.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:3001',
  issuer: 'https://dev-fj-8t2wi.eu.auth0.com/',
  algorithms: ['RS256']
});

// bodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./configuration/config').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/graphql', jwtCheck, expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.get('/pdf', async function (req, res, next) {
  var myDoc = new PDFDocument({ bufferPages: true });
  const techCard = TechCard.findOne({ recipeNumber: req });
  let buffers = [];
  myDoc.on('data', buffers.push.bind(buffers));
  myDoc.on('end', () => {

    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=test.pdf',
    })
    res.end(pdfData);

  });

  myDoc.font('Times-Roman')
    .fontSize(12)
    .text(`this is a test text`);
  myDoc.end();
});

// process.env.PORT for heroku
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3001 : process.env.PORT;

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
    port,
    port,
  );
});

module.exports = app;
