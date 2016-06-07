
var fs = require('fs');

var status = JSON.parse(fs.readFileSync('/home/crixus/Uni/3.Semester/WAW/Boilerplate/CNC/Server/data/status.json', 'utf8'));
var tasks = JSON.parse(fs.readFileSync('/home/crixus/Uni/3.Semester/WAW/Boilerplate/CNC/Server/data/tasks.json', 'utf8'));


module.exports = function(router) {

  router.get('/Status',(req, res) => {

        res.send(status);

    });

  router.post('/Status',(req, res) => {
    res.status(200);
    res.send();
  });

  router.get('/Tasks',(req, res) => {
    res.send(tasks);
  });

  router.post('/Tasks',(req, res) => {
    res.status(200);
    res.send();
  });
};
