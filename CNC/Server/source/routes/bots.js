
var fs = require('fs');

var __TOKEN  = 'password';

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
function token(req,res,next) {
  (req.get('Token') === __TOKEN) ? next() : res.send( {message:'NOT OK'})
}



module.exports = function(router) {

  router.get('/Status(/:id)?',(req, res) => {

    (req.params.id ? res.send(status.filter(function (value,index,array) {return (value.id == req.params.id)} )) : res.send(status));

  });

  router.post('/Status',token,(req, res) => {

    var ans = JSON.stringify({message:'OK'});
    var body = req.body;
    var obj;

    if(body instanceof Object) {

    // wenn obj existiert
    obj = status.filter(function (value,index,array) {

      if(value.id == body.id) {

        status[index].workload = body.status ? 1 : 0;
        return true;
      } else {
        return false;
      }
    });
    // hier vielleicht noch eins anlegen ???? dunno if it is a requirement
    fs.writeFileSync(__dirname + '/data/status.json',JSON.stringify(status), 'utf8');
  } else {
    ans = JSON.stringify({message:'NOT OK'});
  }
    res.send(ans);
  });

  router.get('/Tasks(/:id)?',(req, res) => {
    (req.params.id ? res.send(tasks.filter(function (value,index,array) {return (value.id == req.params.id)} )) : res.send(tasks));
  });

  router.post('/Tasks',token,(req, res) => {
    var ans = JSON.stringify({message:'NOT OK'});
    var body = req.body;

    if(body instanceof Object) {
      if(body.type == 'hash-md5'|| body.type == 'hash-sha256' || body.type == 'crack-md5'){

        ans = JSON.stringify({message:'OK'});
        tasks.push({
          id: tasks.length,
          type: body.type,
          data: {
            input: body.data.input,
            output: null
          }
        })
        fs.writeFileSync(__dirname + '/data/tasks.json',JSON.stringify(tasks), 'utf8');
      }
    }
    res.send(ans);
  });
};
