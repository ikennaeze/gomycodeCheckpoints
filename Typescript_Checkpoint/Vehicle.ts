interface Vehicle {
    make: string;
    model: string;
    year: number;
    start: () => void
}

class Car implements Vehicle {
    make: string;
    model: string;
    year: number;

    constructor(make: string, model: string, year: number){
        this.make = make
        this.model = model
        this.year = year
    }

    start() {
        console.log(`
            Car made by ${this.make}
            Car model is ${this.model}
            Car was made in ${this.year}
            `)
        console.log('Engine Started')
    }
}

let hondaCivic = new Car('Honda', 'Civic', 2014)
hondaCivic.start()

