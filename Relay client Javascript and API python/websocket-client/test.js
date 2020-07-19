import kg from 'mysql';
const {createConnection} = kg;
var con = createConnection({
  host: "db1",
  user: "mysql",
  password: "maharaja",
  database: 'sprinklerdata',
  port: '3306',
});


con.connect(function(err) {
      if (err) throw err;
      con.query("show columns from action_actions;", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });