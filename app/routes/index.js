var request = require('request');

exports.index = function(req, res){
  request(
    'http://dart.fss.or.kr/api/search.json?auth=c0d8ff01675e520c02426ac55eee239b0694b55d&crp_cd=035720&sort=date&series=desc&page_set=25&start_dt=' + create_start_dt(), 
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        eval('var result = ' + body);
        if (result.err_code === '000') {
          console.log(create_start_dt());
          res.render('index', { items : result.list });
        }
      }
    }
  );
};

create_start_dt = function() {
  var today = new Date();
  today.setMonth(today.getMonth() - 6);
  
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  
  return yyyy + mm + dd;
}