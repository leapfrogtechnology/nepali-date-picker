var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/'));
app.get('/', function(request, response) {
    response.redirect("demo/");
});

app.listen(app.get('port'), function() {
    console.log('Application is running on port', app.get('port'));
});