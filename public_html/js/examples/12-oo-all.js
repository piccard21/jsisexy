define(['jquery', 'underscore'], function ($, _) {
    JSSEXY.e12_oo_all = function () {

        /*
         * damit öffentliche Methoden sich gegenseitig 
         * sowie private Funktionen öffentliche Methoden aufrufen können. 
         * Anstatt die öffentliche API-Objekt direkt hinter return zu notieren, 
         * speichern wir es zuvor in einer Variable. 
         * 
         * Auf this kann verzichtet werden, denn alle benötigten Variablen werden durch Closures eingeschlossen. 
         * Infolgedessen stellt die Nutzung von setTimeout kein Problem dar.
         */

        //  --- privater Funktions-Scope
        var Modul = (function () {
            // Private Objekte
            var privateVariable = "privat";
            function privateFunktion() {
                console.info("privateFunktion wurde verzögert aufgerufen\n" + "privateVariable: " + privateVariable);
                // Rufe öffentliche Methode auf:
                api.end();
            }
            // Öffentliche API, gespeichert in einer Variable
            var api = {
                start: function () {
                    console.info("Test startet");
                    // Hier würde this noch funktionieren, wir nutzen trotzdem api
                    setTimeout(api.öffentlicheMethode, 100);
                },
                öffentlicheMethode: function () {
                    console.info("öffentliche Methode wurde verzögert aufgerufen");
                    setTimeout(privateFunktion, 100);
                },
                end: function () {
                    console.info("Öffentliche ende-Methode wurde aufgerufen. Test beendet");
                }
            };
            return api;
        })(Modul || {});

        Modul.öffentlicheMethode();




        // --- Methoden im Konstruktor verschachteln
        function Konstruktor() {
            // Referenz auf das Instanzobjekt anlegen
            var thisObject = this;
            // Weitere private Objekte
            var privateVariable = "privat";

            // Öffentliche Eigenschaften
            this.eigenschaft = "wert";

            this.start = function () {
                console.info("start() wurde aufgerufen\n" + "Instanz-Eigenschaft: " + thisObject.eigenschaft);
                setTimeout(thisObject.verzögert, 500);
            };

            this.verzögert = function () {
                console.info("verzögert() wurde aufgerufen\n" + "Instanz-Eigenschaft: " + thisObject.eigenschaft);
            };

            this.handler = function () {
                console.info("handler wurde aufgerufen\n" + "Element, das den Event behandelt: " + this + "\n" + "Instanz-Eigenschaft: " + thisObject.eigenschaft);
            };

            // Hier im Konstruktor kann this noch verwendet werden
            document.getElementById("button4").onclick = this.handler;
        }

        var instanz = new Konstruktor();
        instanz.start();







        // ----  Callbacks
        // global variable​
        var allUserData = [];
        //Global variable​
        var generalLastName = "Clinton";

        // generic logStuff function that prints to console​  
        function logStuff(ln, userData) {
            if (typeof userData === "string") {
                console.log(userData);
            } else if (typeof userData === "object") {
                for (var item in userData) {
                    console.log(item + ": " + userData[item]);
                }
            }
            console.log(generalLastName);
            console.log(ln);
        }

        //​A function that takes two parameters, the last one a callback function​
        function getInput(options, callback) {
            allUserData.push(options);
            // Make sure the callback is a function​
            if (typeof callback === "function") {
                // Call it, since we have confirmed it is callable​
                callback(generalLastName, options);
            }
        }

        // When we call the getInput function, we pass logStuff as a parameter.​
        // So logStuff will be the function that will called back (or executed) inside the getInput function​
        getInput({
            name: "Rich",
            speciality: "JavaScript"
        }, logStuff);
        getInput("STRING", logStuff);





        // ----  All
        var Whatever = (function () {
            // Private Objekte
            var privateVariable = "privat";
            function privateFunktion() {
                console.info("privateFunktion wurde verzögert aufgerufen\n" + "privateVariable: " + privateVariable);
                // Rufe öffentliche Methode auf:
                api.end();
            }
            // Öffentliche API, gespeichert in einer Variable
            var api = {
                start: function () {
                    console.info("Test startet");
                    // Hier würde this noch funktionieren, wir nutzen trotzdem api
                    setTimeout(api.öffentlicheMethode, 100);
                },
                öffentlicheMethode: function () {
                    console.info("öffentliche Methode wurde verzögert aufgerufen");
                    setTimeout(privateFunktion, 100);
                },
                end: function () {
                    console.info("Öffentliche ende-Methode wurde aufgerufen. Test beendet");
                },
                callbacktest: function (options, callback) {
                    // Make sure the callback is a function​
                    if (typeof callback === "function") {
                        // Call it, since we have confirmed it is callable​
                        callback(privateVariable, options);
                    }
                }
            };
            return api;
        })(Whatever || {});

        Whatever.öffentlicheMethode();

        Whatever.callbacktest({
            name: "Hans",
            speciality: "Plumbus"
        }, logStuff);
    }
});
