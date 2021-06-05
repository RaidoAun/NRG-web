import mysql from 'mysql'
export class Database{
  users_insert_into = "INSERT INTO users (first_name, last_name, is_admin) VALUES (?)"
  parking_insert_into = "INSERT INTO parking (validation_status, user_id, car_nr) VALUES (?)"
  parking_select_all = "select parking.id, validation_status, car_nr, first_name, last_name from parking inner join users on parking.user_id = users.id"
  users_select_by_id = "select * from users where id = ?"
  parking_select_user_data = "select * from parking where user_id = ?"
  parking_delete_row = "DELETE FROM parking WHERE id = ?"
  parking_edit_row = "UPDATE parking SET validation_status = 1 WHERE id = ?"
  parking_select_by_id = "select * from parking where id = ?"
  diary_select_user_data = "select diary.id, diary.reason, diary.start, diary.end, diary.notes, users.first_name, users.last_name, users.room_nr from diary inner join users on diary.user_id = users.id where users.id = ?"
  diary_select_all = "select diary.id, diary.reason, diary.start, diary.end, diary.notes, users.first_name, users.last_name, users.room_nr from diary inner join users on diary.user_id = users.id"
  diary_insert_into = "INSERT INTO diary (reason, start, notes, user_id) VALUES (?)"
  diary_edit_end = "update diary set end = ? where id = "
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
      this.con.query("use "+process.env.DB_NAME,function (err, result, fields) {
        if (err) throw err;
      });
  }
  addUser(user){
    let values = [user.first_name,user.last_name, user.is_admin];
    this.con.query(this.users_insert_into, [values], function (err, result) {
      if (err) throw err;
    })
  }
  addParkingRow(data){
    let values = [0, data.user_id, data.car_nr]
    this.con.query(this.parking_insert_into, [values], function (err, result) {
      if (err) throw err;
    })
  }
  getParkingData(callback){
    this.con.query(this.parking_select_all, function (err, result, fields) {
      if (err) throw err;
      callback(result)
    })
  }
  getUserById(id,callback){
    let values = [id]
    this.con.query(this.users_select_by_id, [values], function (err, result, fields) {
      if (err) throw err;
      callback(result)
    })
  }
  getUserParkingData(user, callback){
    let values = [user.id]
    this.con.query(this.parking_select_user_data, [values], function (err, result, fields) {
      if (err) throw err;
      callback(result)
    })
  }
  deleteParkingRowById(id){
    let values = [id]
    this.con.query(this.parking_delete_row, [values], function (err, result) {
      if (err) throw err;
    })
  }
  editParkingRowById(id){
    let values = [id]
    this.con.query(this.parking_edit_row, [values], function (err, result) {
      if (err) throw err;
    })
  }
  getParkingDataByRowId(id, callback){
    let values = [id]
    this.con.query(this.parking_select_by_id, [values], function (err, result, fields) {
      if (err) throw err;
      callback(result)
    })
  }
  getUserDiaryDataByUserId(id, callback){
    let values = [id]
    this.con.query(this.diary_select_user_data, [values], function (err, result, fields) {
      if (err) throw err;
      callback(result)
    })
  }
  getAllDiaryData(callback){
    this.con.query(this.diary_select_all, function (err, result, fields) {
      if (err) throw err;
      callback(result)
    })
  }
  addToDiary(data){
    let values = [data.reason, data.start, data.notes, data.user_id]
    this.con.query(this.diary_insert_into, [values], function (err, result) {
      if (err) throw err;
    })
  }
  editDiaryEnd(data){
    let values = [data.end]
    this.con.query(this.diary_edit_end + mysql.escape(data.id), [values], function (err, result) {
      if (err) throw err;
    })
  }
}