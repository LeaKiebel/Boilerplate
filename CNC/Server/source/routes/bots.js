
var fs = require('fs');

var __TOKEN;
var status = JSON.parse(fs.readFileSync(__dirname +'/data/status.json', 'utf8'));
var tasks = JSON.parse(fs.readFileSync(__dirname +'/data/tasks.json', 'utf8'));

// synchronous watchlist
fs.watch(__dirname +'/data/status.json',(curr,prev) =>{
  status = JSON.parse(fs.readFileSync(__dirname +'/data/status.json', 'utf8'));
}
);

fs.watch(__dirname +'/data/tasks.json',(curr,prev) => {
  tasks = JSON.parse(fs.readFileSync(__dirname +'/data/tasks.json', 'utf8'))
}
);

// Tokenabfrage
function token(res,req,next) {
  (res.get((token) === __TOKEN) ? next() : res.send( {message:'NOT OK'}) );
}



module.exports = function(router) {

  router.get('/Status(/:id)?',(req, res) => {
    // falls id liefere object else array

    (req.params.id ? res.send(status.filter(function (value,index,array) {return (value.id == req.params.id)} )) : res.send(status));

  });

  router.post('/Status',/*token,*/(req, res) => {
    var ans = JSON.stringify({message:'OK'});
    var body = req.body;
    var obj;

    if(body && body.id && body.status) {
    if(body) {

    var objIndex;

    obj = status.filter(function (value,index,array) {

      if(value.id == req.body.id) {
        objIndex = index;
        return true;
      } else {
        return false;
      }
    });


      status[objIndex].workload = req.body.status ? 1 : 0;

      console.log(status[objIndex]);

    } else {
      obj = {
        id: req.body.id ,
        ip: req.ip,
        task:1,
        workload: (req.body.status ? 1 : 0)
      }
      status.push(obj);
    }
  } else {
    ans = JSON.stringify({message:'NOT OK'});
  }
    fs.writeFileSync(__dirname + '/data/status.json',JSON.stringify(status), 'utf8');
    res.send(ans);
  });

  router.get('/Tasks(/:id)?',(req, res) => {
    (req.params.id ? res.send(tasks[req.params.id]): res.send(tasks))

  });

  router.post('/Tasks/:id',(req, res) => {
    var ans = req.body.id ? JSON.stringify({message:'OK'}): JSON.stringify({message:'NOT OK'});

    console.log(ans);
  });
};
