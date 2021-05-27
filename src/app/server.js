const express = require('express');

const app = express();

app.use(express.static('./dist/frontend'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/frontend' }
  );
});
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

console.log(`Running on port ${process.env.PORT || 8080}`)