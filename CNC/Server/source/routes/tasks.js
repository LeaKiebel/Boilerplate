
module.exports = function(router){
  router.get('/Tasks',(req, res) => {
    res.status(200);
    res.redirect('http://botnet.artificial.engineering:8080/api/Tasks');
  });
};
