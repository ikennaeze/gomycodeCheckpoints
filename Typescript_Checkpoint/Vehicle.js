var Car = /** @class */ (function () {
    function Car(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    Car.prototype.start = function () {
        console.log("\n            Car made by ".concat(this.make, "\n            Car model is ").concat(this.model, "\n            Car was made in ").concat(this.year, "\n            "));
        console.log('Engine Started');
    };
    return Car;
}());
var hondaCivic = new Car('Honda', 'Civic', 2014);
hondaCivic.start();
