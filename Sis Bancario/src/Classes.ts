
import database from "./db";


export class Person {

    private name: string;
    private password: string;
    private total_value:number;



    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.total_value = 0;
    }
    
    insertDatabase(): void {

        console.clear()

        //debug
        console.log(this.total_value);
        console.log(this.name);
        console.log(this.password);

        database.execute(`INSERT INTO user_info(name_user, password_user, total_value) VALUES (?, ?, ?)`, [this.name, this.password, this.total_value]);
    }

     deposit(depositValue: number): void{
        console.clear()
        
        this.total_value += depositValue; 

        //debug
        console.log(this.total_value);
        console.log(this.name);

        database.execute(`UPDATE user SET total_value = total_value + ? WHERE name_user = ?`, (this.total_value, this.name));

      }

    
    cashWithdrawal(withdrawal:number):void {

        if (withdrawal > this.total_value){
            console.log("insufficient funds")
            
        }  else {

        this.total_value -= withdrawal; 
        
        //debug
        console.log(this.total_value); 
        console.log(this.name);
        console.log(this.password);
        
        
        database.execute(`UPDATE user SET total_value = ? WHERE name_user = ?`, [this.total_value, this.name]);
        }
    }

    checkStatement():void{
        
        //debug
        console.log(this.name)
        console.log(this.total_value)

        const bankStatement = database.execute(`SELECT total_value FROM user_info`);

        console.log(bankStatement);
    }

}