
import { Person } from "./Classes";

import * as leitor from "readline-sync";

let account: boolean = false;

let nameUser: string = "";
let newPassword: string = "";

let userAccount: Person | null = null;

export function menu() {

    console.log("Bank SENAC \n");
    console.log(" 1- To Deposit  \n"); // 
    console.log(" 2- To Cash withdrawal \n"); // 
    console.log(" 3- Verify statement \n");
    console.log(" 4- Create account \n"); // 
    console.log(" 5- Leave");


    let op: number = leitor.questionInt("Input the option: ")

    switch (op) {

        case 1: //deposit 
            console.clear()

            if (userAccount instanceof Person) {

                let depositValue: number = leitor.questionFloat("Input the value of deposit: ")

                userAccount.deposit(depositValue); 
            }

            menu();
            break;


        case 2:
            if (userAccount instanceof Person) {
                console.clear()
               
                const withdrawal: number = leitor.questionFloat("Input the amount of money: ")
                
                userAccount.cashWithdrawal(withdrawal);
            
            } else {
                console.error("ERROR! You don't have an account! ")
            
            }
            menu();
            break;


        case 3:
            console.clear()

                if (userAccount instanceof Person){
                    userAccount.checkStatement();
                    menu()
                } else {
                    console.log("ERROR! You don't have an account in the bank!")
                    menu()
                }

                break;

        case 4: //create account 
            
        console.clear();

            if (account == true) {

                console.log("You already have an account!")

            } else {

                const user = leitor.question("Input your name: ");
                const passwordUser = leitor.question("Input your new password: ");

                nameUser = user;
                newPassword = passwordUser;

                userAccount = new Person(nameUser, newPassword)


                userAccount.insertDatabase()

                account = true;
            }

            menu()
            break;

        case 5:
            console.clear()
            console.log("leaving . . . ")
            break
    }

}

menu()

