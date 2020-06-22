"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('mysql: clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'nodeuser',
            password: 'nodeuser',
            database: 'dbnode'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Query Error: ', err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('No hay datos que mostrar.');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('mysql: db online');
        });
    }
}
exports.default = MySQL;
