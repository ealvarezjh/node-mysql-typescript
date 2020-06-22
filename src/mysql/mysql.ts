import mysql = require('mysql');

export default class MySQL{

    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        
        console.log('mysql: clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'nodeuser',
            password: 'nodeuser',
            database: 'dbnode'
        });

        this.conectarDB();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public static ejecutarQuery(query: string, callback: Function){
       
        this.instance.cnn.query(query, (err, results: Object[], fields) => {

            if(err){
                console.log('Query Error: ',err);
                return callback(err);
            }

            if(results.length === 0){
                callback('No hay datos que mostrar.')
            }else{
                callback(null, results);
            }


        });
    }


    private conectarDB(){    

        this.cnn.connect((err: mysql.MysqlError)=>{

            if(err){
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('mysql: db online');
        });
    }


}
