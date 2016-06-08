
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

    (req.params.id ? res.send(status.filter(function (value,index,array) {return (value.id == req.params.id)} )) : res.send(status));

  });

  router.post('/Status',/*token,*/(req, res) => {

    var ans = JSON.stringify({message:'OK'});
    var body = req.body;
    var obj;

    console.log(body);
    if(body && body.id) {

    // wenn obj existiert
    obj = status.filter(function (value,index,array) {

      if(value.id == body.id) {

        status[index].workload = body.status ? 1 : 0;
        return true;
      } else {
        return false;
      }
    });

    /* if(obj.length){
      obj = {
        id: req.body.id ,
        ip: req.ip,
        task:1,
        workload: (req.body.status ? 1 : 0)
      }
      status.push(JSON.stringify(obj));
    }*/

  } else {
    ans = JSON.stringify({message:'NOT OK'});
  }
    fs.writeFileSync(__dirname + '/data/status.json',JSON.stringify(status), 'utf8');
    res.send(ans);
  });

  router.get('/Tasks(/:id)?',(req, res) => {
    (req.params.id ? res.send(tasks.filter(function (value,index,array) {return (value.id == req.params.id)} )) : res.send(tasks));
  });

  router.post('/Tasks',(req, res) => {
    var ans = JSON.stringify({message:'NOT OK'});
    var body = req.body;

    if(body && body.type && body.data.input) {
      if(body.type == 'hash-md5'|| body.type == 'hash-sha256' || body.type == 'crack-md5'){

        ans = JSON.stringify({message:'OK'});
        console.log(tasks);
        tasks.push({
          id: tasks.length,
          data: {
            input: body.data.input,
            output: null
          }
        })
        console.log(tasks);
        fs.writeFileSync(__dirname + '/data/tasks.json',JSON.stringify(tasks), 'utf8');
      }
    }
    res.send(ans);
  });
};
