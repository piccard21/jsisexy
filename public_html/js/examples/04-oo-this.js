//http://molily.de/js/organisation-verfuegbarkeit.html

/*
 * PROBLEME bei THIS
 * 
 * Beim Event-Handling, wenn die Funktion als Event-Handler registriert wird. 
 * Beim Unobtrusive JavaScript ist es üblich, dass Methoden eines Moduls oder einer Instanz als 
 * Event-Handler dienen (siehe Grundlagen zur Ereignisverarbeitung). 
 * this zeigt in Handler-Funktionen auf das Elementobjekt, bei dem das Ereignis verarbeitet wird – 
 * siehe this beim Event-Handling. Dadurch werden die Methoden außerhalb des Modul- bzw. 
 * Instanzkontextes ausgeführt.
 * 
 * Beim Aufrufen der Funktion mit setTimeout oder setInterval. 
 * Die verzögert bzw. wiederholt ausgeführte Funktion verliert den Bezug zum Ursprungsobjekt, 
 * denn this verweist darin auf das globale Objekt window. In vielen Fällen ist der 
 * Zugriff auf das Modul bzw. die Instanz notwendig.
 * 
 * Bei der Übergabe einer Funktion als Parameter (z.B. als Callback-Funktion), 
 * beim Speichern in einer Variablen und dergleichen. In diesen Fällen zeigt gibt es 
 * oftmals keinen spezifischen Kontext, sodass this als Fallback auf window zeigt.
 */

define(['jquery', 'underscore'], function ($, _) {
    JSSEXY.e04_oo_this = function () {

        // easy
        function Katze(name) {
            this.name = name;
        }
        Katze.prototype = {
            pfoten: 4,
            zeigePfoten: function () {
                console.info("Die Katze zeigt ihre " + this.pfoten + " Pfoten.");
            }
        };
        var maunzi = new Katze('Maunzi');
        maunzi.zeigePfoten();
        var schnucki = new Katze('Schnucki');
        schnucki.zeigePfoten();



        // Methoden in anderen Kontexten ausführen
        // --- this-Problem bei einfachen Modulen
        var Modul = {
            eigenschaft: "Eigenschaftswert",
            start: function () {
                // Funktioniert:
                console.info("start wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
                setTimeout(this.verzögert, 100);
                document.getElementById("button1").onclick = this.handler;
            },
            // this === WINDOW 
            verzögert: function () {
                // Fehler: this verweist auf window
                console.info("verzögert wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
            },
            // this === WINDOW 
            handler: function (e) {
                // Fehler: this verweist auf das Element, dem der Event-Handler anhängt
                console.info("handler wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
            }
        };
        Modul.start();


        // --- this-Problem bei Prototypen und Instanzmethoden
        function Konstruktor() {}
        Konstruktor.prototype = {
            eigenschaft: "Eigenschaftswert",
            start: function () {
                // Funktioniert:
                console.info("start wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
                setTimeout(this.verzögert, 100);
                document.getElementById("button2").onclick = this.handler;
            },
            // this === WINDOW 
            verzögert: function () {
                // Fehler: this verweist auf window
                console.info("verzögert wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
            },
            // this === WINDOW 
            handler: function (e) {
                // Fehler: this verweist auf das Element, dem der Event-Handler anhängt
                console.info("handler wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
            }
        };
        var instanz = new Konstruktor();
        instanz.start();



        // Lösung: s. Closure
        /*
         * Die Methode in der Klasse hat natürlich vollen Zugriff auf alles was drinnen so abläuft, 
         * d.h ich kann auf alle Eigenschaften und Methoden zugreifen. 
         * Die Methode außerhalb der Klasse kann lediglich auf öffentliche Eigenschaften und Methoden zugreifen. 
         */


        function Car() {

            // öffentliche Eigenschaft
            this.CarName = "Audi";
            // private Eigenschaft
            var CarColor = "Black";

            // private Methode
            var setCarColor = function (newCarColor) {
                CarColor = newCarColor;
            }

            // privilegierte öffentliche Methode
            this.getCarInfosInside = function () {
                setCarColor('Green');
                console.info("CarName:" + this.CarName + " CarColor:" + CarColor);
            }

        }

        // nicht-privilegierte öffentliche Methode
        Car.prototype.getCarInfosOutside = function () {
            setCarColor('Green');
            console.info("CarName:" + this.CarName + " CarColor:" + CarColor);

        }

        var Audi = new Car();
        // Liefert "Audi" und "Green"
        Audi.getCarInfosInside();
        // Liefert "setCarColor" is not defined, "Audi" und "undefined"
//        Audi.getCarInfosOutside(); 





        // --------------------------------------------------------------------------------
        //

        // ---- Fix this when used in a method passed as a callback
        // We have a simple object with a clickHandler method that we want to use when a button on the page is clicked​
        var user = {
            tournament: "The Masters",
            data: [
                {name: "T. Woods", age: 37},
                {name: "P. Mickelson", age: 43}
            ],
            clickHandler: function (event) {
                var randomNum = ((Math.random() * 2 | 0) + 1) - 1; // random number between 0 and 1​

                // This line is printing a random person's name and age from the data array​
                console.log(this.data[randomNum].name + " " + this.data[randomNum].age);
            },
            clickHandler2: function () {
                // To capture the value of "this" when it refers to the user object, we have to set it to another variable here:​
                // We set the value of "this" to theUserObj variable, so we can use it later​
                var theUserObj = this;

                // the use of this.data here is fine, because "this" refers to the user object, and data is a property on the user object.​
                this.data.forEach(function (person) {
                    // But here inside the anonymous function (that we pass to the forEach method), "this" no longer refers to the user object.​
                    // This inner function cannot access the outer function's "this"​

                    console.log("What is This referring to? " + theUserObj); //[object Window]​

                    console.log(person.name + " is playing at " + theUserObj.tournament);
                    // T. Woods is playing at undefined​
                    // P. Mickelson is playing at undefined​
                })
            },
            showData: function (event) {
                var randomNum = ((Math.random() * 2 | 0) + 1) - 1; // random number between 0 and 1​

                // This line is adding a random person from the data array to the text field​
                console.log(this.data[randomNum].name + " " + this.data[randomNum].age);
            }

        }


        // The button is wrapped inside a jQuery $ wrapper, so it is now a jQuery object​
        // And the output will be undefined because there is no data property on the button object​
//        $("button").click(user.clickHandler); // Cannot read property '0' of undefined

        $("#button1").click(user.clickHandler.bind(user)); // P. Mickelson 43






        // ---- Fix this inside closure 
        user.clickHandler2();

        // ---- Fix this when method is assigned to a variable

        // Assign the user.showData to a variable​
        var showUserData = user.showData;
        // When we execute the showUserData function, the values printed to the
        // console are from the global data array, not from the data array in the user object​

        // showUserData(); // Samantha 12 (from the global data array)​
        // Bind the showData method to the user object​
        var showUserData = user.showData.bind(user);

        // Now we get the value from the user object, because the <em>this</em> keyword is bound to the user object​
        showUserData(); // P. Mickelson 43






        // ---- Fix this when borrowing methods 

        var gameController = {
            scores: [20, 34, 55, 46, 77],
            avgScore: null,
            players: [
                {name: "Tomy", playerID: 987, age: 23},
                {name: "Pau", playerID: 87, age: 33}
            ]
        }

        var appController = {
            scores: [900, 845, 809, 950],
            avgScore: null,
            avg: function () {

                var sumOfScores = this.scores.reduce(function (prev, cur, index, array) {
                    return prev + cur;
                });

                this.avgScore = sumOfScores / this.scores.length;
            }
        }

        //If we run the code below,
        //
        // gameController.avgScore = appController.avg();
        // 
        // the gameController.avgScore property will be set to the average score from the appController object scores array
        // The avg method "this" keyword will not refer to the gameController object, it will refer to the appController object because it is being invoked on appController
        // Don't run this code, we want the appController.avgScore to remain null

        appController.avg.apply(gameController, gameController.scores);

        // The avgScore property was successfully set on the gameController object, even though we borrowed the avg () method from the appController object
        console.log(gameController.avgScore); // 46.4 
        console.log(appController.avgScore);


    }
});
