import * as leitor from "readline-sync"

class Animal {
    public name: string

    constructor(name: string) { 
        this.name = name
    }

    public emitirSom(): void {
        console.log(`Algum som de animal`);
    }

}

class Dog extends Animal {
    public emitirSom(): void {

        console.log(`${this.name} diz Woof!`);
         
    }
}

class Cat extends Animal {
    public emitirSom(): void {

        console.log(`${this.name} diz Meow!`);
        
    }
}

export class SistemaDeAnimais{
    public dogs: Array<Dog> = []
    public cats: Array<Cat> = []
    public animals: Array<Animal> = []

    public cadastrarAnimal(){
        console.log(`1 - Animal sem identificação de espécie.`);
        console.log(`2 - Cachorro`);
        console.log(`3 - Gato`);
        
        let animal = leitor.questionInt(`Informe o numero referente ao animal que quer cadastrar: `)
        switch(animal){
            case 1:
                let nome = leitor.question(`Qual o nome do animal?: `)
                let animal = new Animal(nome)
                this.animals.push(animal)
                console.log(`O ${nome} foi cadastrado no nosso sistema com sucesso! \n`);
                break;
            case 2:
                let nomeDog = leitor.question(`Qual o nome do cachorro?: `)
                let cachorro = new Dog(nomeDog)
                this.dogs.push(cachorro)
                console.log(`O ${nomeDog} foi cadastrado no nosso sistema com sucesso! \n`);
                break;
            case 3:
                let nomeCat = leitor.question(`Qual o nome do gato?: `)
                let gato = new Cat(nomeCat)
                this.cats.push(gato)
                console.log(`O ${nomeCat} foi cadastrado no nosso sistema com sucesso! \n`);
                break;
            default:
                console.log(`Não existe essa opção :/`);
        }

    }

    public interagirAnimais(): void{
        this.animals.forEach(a => {
            a.emitirSom()
        })

        this.dogs.forEach(d => {
            d.emitirSom()
        })

        this.cats.forEach(c => {
            c.emitirSom()
        })
    }

    public removerAnimais(): void{
        console.log(`1 - Animal sem identificação de espécie.`);
        console.log(`2 - Cachorro`);
        console.log(`3 - Gato`);
        
        let animal = leitor.questionInt(`Informe a opção referente ao animal que quer remover: `)
        switch(animal){
            case 1:
                let nome = leitor.question(`Qual o nome do animal?: `)
                let animalIndex: number = this.animals.findIndex(a => a.name === nome)
                if (animalIndex) {
                    this.animals.splice(animalIndex, 1)
                    console.log(`Animal removido do sistema com sucesso!`);
                } else {
                    console.log(`Animal não encontrado na nossa base :/`);
                }
                break;
                
            case 2:
                let nomeDog = leitor.question(`Qual o nome do animal?: `)
                let dogIndex: number = this.dogs.findIndex(d => d.name === nomeDog)
                if (dogIndex) {
                    console.log(`${this.dogs[dogIndex].name} removido do sistema com sucesso \n${this.dogs[dogIndex].emitirSom}`);
                    this.dogs.splice(dogIndex, 1)
                } else {
                    console.log(`Cachorro não encontrado na nossa base :/`);
                }
                break;

            case 3:
                let nomeCat = leitor.question(`Qual o nome do animal?: `)
                let catIndex: number = this.cats.findIndex(d => d.name === nomeCat)
                if (catIndex) {
                    console.log(`${this.cats[catIndex].name} removido do sistema com sucesso \n${this.cats[catIndex].emitirSom}`);
                    this.cats.splice(catIndex, 1)
                } else {
                    console.log(`Gato não encontrado na nossa base :/`);
                }
                break;
            default:
                console.log(`Não existe essa opção :/`);
        }
    }
    
    public listarAnimais(): void{
        this.animals.forEach(a => {
            console.log(`Nome: ${a.name} (Animal sem espécie)`);
        })

        this.dogs.forEach(d => {
            console.log(`Nome: ${d.name} (Cachorro)`);
        })

        this.cats.forEach(c => {
            console.log(`Nome: ${c.name} (Gato)`);
        })
    }
}