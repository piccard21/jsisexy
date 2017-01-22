define([], function ($, _) {
    JSSEXY.e06_oo_vererbung = function () {

        // ---- MDN


        // Definiert den Person Konstruktor
        function Person(firstName) {
            this.firstName = firstName;
        }

        // Fügt Methoden zum Person.prototype hinzu
        Person.prototype.walk = function () {
            console.log("I am walking!");
        };
        Person.prototype.sayHello = function () {
            console.log("Hello, I'm " + this.firstName);
        };



        // Definiert den Student Konstruktor
        function Student(firstName, subject) {
            // Call the parent constructor, making sure (using Function#call)
            // that "this" is set correctly during the call
            Person.call(this, firstName);

            // Initialize our Student-specific properties
            this.subject = subject;
        }

        // Erstellt ein Student.prototype Objekt das von Person.prototype erbt.
        // 
        // Hinweis: Ein häufiger Fehler ist der Einsatz von "new Person()" beim erstellen eines
        // Student.prototype. Das ist falsch aus einigen Gründen, nicht nur 
        // das wir keinen Parameter der Person für "firstName" mitgeben können. 
        // Der korrekte Ort für den Aufruf von Person ist oben, wo wir es 
        // von Student aufrufen.
        Student.prototype = Object.create(Person.prototype); // See note below

        // Setzt die "constructor" Eigenschaft um auf Student zu referenzieren.
        Student.prototype.constructor = Student;

        // Ersetzt die "sayHello" Methode
        Student.prototype.sayHello = function () {
            console.log("Hello, I'm " + this.firstName + ". I'm studying "
                    + this.subject + ".");
        };

        // Fügt die "sayGoodBye" Methode hinzu
        Student.prototype.sayGoodBye = function () {
            console.log("Goodbye!");
        };

        // Beispieleinsatz:
        var student1 = new Student("Janet", "Applied Physics");
        student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
        student1.walk();       // "I am walking!"
        student1.sayGoodBye(); // "Goodbye!"

        // Check that instanceof works correctly
        console.log(student1 instanceof Person);  // true 
        console.log(student1 instanceof Student); // true




        // --------------------------------------------
        // Superklasse
        function Car(CarName) {
            this.CarName = CarName;
            this.CarWheels = "4";
        }

        // Subklasse
        function Audi(CarName) {

            // Dieser Konstruktor ruft den Konstruktor der Superklasse auf
            this.constructor(CarName);
            this.CarColor = 'Black';

            this.getCarInfos = function () {

                console.info(this.CarName + " is " + this.CarColor + " and has " + this.CarWheels + " Wheels!");

            }

        }

//        Audi.prototype = new Car(); // Hier passiert die Vererbung
        Audi.prototype = Object.create(Car.prototype);

        AudiA3 = new Audi('Audi A3');
        Audi80 = new Audi('Audi 80');

        AudiA3.getCarInfos(); // Liefert "Audi A3 is Black and has 4 Wheels"

        Audi.prototype.setCarColor = function (newCarColor) {

            this.CarColor = newCarColor;
            this.getCarInfos();

        }



        // ------------------------------------------------------
        Vehicle = function () { }

        Vehicle.prototype.speed = 0;

        Vehicle.prototype.speedup = function () {
            this.speed += 10;
        }

        Vehicle.prototype.slowdown = function () {
            if (this.speed > 0) {
                this.speed -= 10;
            }
        }




        Car = function () { }

        Car.prototype = Object.create(Vehicle.prototype);
        Car.prototype.constructor = Car;

        Car.prototype.direction = "strait";

        Car.prototype.turnleft = function () {
            this.direction = "left";
        }

        Car.prototype.turnright = function () {
            this.direction = "right";
        }




        Cabriolet = function () { }

        Cabriolet.prototype =  Object.create(Car.prototype);
        Cabriolet.prototype.constructor = Cabriolet;

        Cabriolet.prototype.cover = "closed";

        Cabriolet.prototype.open = function () {
            this.cover = "opened";
        }

        Cabriolet.prototype.close = function () {
            this.cover = "closed";
        }

        var myCar = new Car(); 
        myCar.turnright();
        myCar.speedup();
        myCar.speedup();
        console.dir(myCar);
        
        var myCabriolet = new Cabriolet();
        myCabriolet.open();
        myCabriolet.turnleft();
        myCabriolet.speedup();
        console.dir(myCabriolet);
    }
});
