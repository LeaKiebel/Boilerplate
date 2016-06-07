
var fs = require('fs');

var status = JSON.parse(fs.readFileSync('/home/crixus/Uni/3.Semester/WAW/Boilerplate/CNC/Server/data/status.json', 'utf8'));
var tasks = JSON.parse(fs.readFileSync('/home/crixus/Uni/3.Semester/WAW/Boilerplate/CNC/Server/data/tasks.json', 'utf8'));


module.exports = function(router) {

  router.get('/Status(/:id)?',(req, res) => {
    (req.params.id ? res.send(status[req.params.id]): res.send(status))
  });

  router.post('/Status/:id',(req, res) => {

    var ans = req.body.id ? JSON.stringify({message:'OK'}): JSON.stringify({message:'NOT OK'});

    console.log(ans);
  });

  router.get('/Tasks(/:id)?',(req, res) => {
    (req.params.id ? res.send(tasks[req.params.id]): res.send(tasks))

  });

  router.post('/Tasks/:id',(req, res) => {
    var ans = req.body.id ? JSON.stringify({message:'OK'}): JSON.stringify({message:'NOT OK'});

    console.log(ans);
  });
};
