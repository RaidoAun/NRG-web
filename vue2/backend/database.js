import mysql from 'mysql'
export class Database{
  users_insert_into = "INSERT INTO users (first_name, last_name, is_admin) VALUES ?"
  parking_insert_into = "INSERT INTO parking (validation_status, user_id) VALUES ?"
  parking_select_all = "SELECT * FROM parking"
  constructor(){
      this.con = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS
        });
      this.con.connect(function(err) {
          if (err) throw err; //kui err, siis viska ära.
          console.log("Connected!");
        });
      this.con.query("use nrgweb",function (err, result, fields) {
        if (err) throw err;
      });
  }
  addUser(user){
    let values = [user.first_name,user.last_name, user.is_admin];
    this.con.query(this.users_insert_into, [values], function (err, result) {
      if (err) throw err;
    })
  }
  addParkingRow(row){
    let values = [row.validation_status, row.user_id]
    this.con.query(this.parking_insert_into, [values], function (err, result) {
      if (err) throw err;
    })
  }
  getParkingData(){
    this.con.query(this.parking_select_all, function (err, result, fields) {
      if (err) throw err;
      return result
    });
  }
}