const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ejs = require('ejs');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.post('/submit', (req, res) => {
  const name = req.body.name;
  execSync(`./provision.sh ${name}`, {
    encoding: 'utf8',
    timeout: 10000,
  });
  res.end();
});

app.get('/', (req, res, next) => {
  let templateData = [];
  let provisionedList = {};

  const stdout = execSync('aws lightsail get-instances', {
    encoding: 'utf8',
    timeout: 10000,
  });

  provisionedList = JSON.parse(stdout);

  provisionedList.instances.forEach((instance) =>
    templateData.push({
      name: instance.name,
      createdAt: instance.createdAt,
      publicIpAddress: instance.publicIpAddress,
      state: instance.state.name,
    })
  );

  res.render(path.join(__dirname, 'public', 'index.ejs'), {
    instances: templateData,
  });
});

app.listen(port);
