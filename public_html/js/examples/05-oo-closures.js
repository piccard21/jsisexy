define([], function ($, _) {
    JSSEXY.e05_oo_closures = function () {


        function äußereFunktion() {
            // Definiere eine lokale Variable
            var variable = "wert";
            // Lege eine verschachtelte Funktion an
            function innereFunktion() {
                // Obwohl diese Funktion einen eigenen Scope mit sich bringt,
                // ist die Variable aus dem umgebenden Scope hier verfügbar:
                console.info("Wert der Variablen aus der äußeren Funktion: " + variable);
            }
            // Führe die eben definierte Funktion aus
            innereFunktion();
        }
        äußereFunktion();



        // ---- innere Funktion speichern 
        /**
         * Bei einem Klick auf den Button wird die Closure als Event-Handler ausgeführt. 
         * äußereFunktion wird schon längst nicht mehr ausgeführt, aber variable wurde in die Closure eingeschlossen.
         * 
         * Beginn der Ausführung der äußeren Funktion
         * - Lokale Variablen werden definiert
         * - Innere Funktion wird definiert
         * - Innere Funktion wird außerhalb gespeichert, sodass sie erhalten bleibt
         * - Ende der Ausführung der äußeren Funktion
         * - Unbestimmte Zeit später: Innere Funktion (Closure-Funktion) wird ausgeführt
         */
        function äußereFunktion2() {
            var variable = "wert";
            // Lege eine verschachtelte Funktion an
            function closure() {
                console.info("Wert der Variablen aus der äußeren Funktion: " + variable);
            }
            // Speichere die Closure-Funktion als Event-Handler
            document.getElementById("button3").onclick = closure;
        }
        äußereFunktion2();


        // --- Wie helfen uns Closures nun beim this-Problem weiter?
        /*
         * Eine kleine Änderung ist nötig, damit öffentliche Methoden sich gegenseitig 
         * sowie private Funktionen öffentliche Methoden aufrufen können. 
         * Anstatt die öffentliche API-Objekt direkt hinter return zu notieren, 
         * speichern wir es zuvor in einer Variable. 
         * 
         * Auf this kann verzichtet werden, denn alle benötigten Variablen werden durch Closures eingeschlossen. 
         * Infolgedessen stellt die Nutzung von setTimeout kein Problem dar.
         */
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
        })();
        Modul.start();



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



        // --- Function Binding: Closures automatisiert erzeugen
        /*
         * obige Methode funktioniert nicht bei einfachen Object-Literalen und bei der Nutzung von Prototypen.
         */
        // ------- this-Kontext erzwingen mit call und apply
        var objekt = {
            eigenschaft: "Objekteigenschaft"
        };

        function beispielFunktion() {
            // this zeigt nun auf objekt
            console.info(this.eigenschaft);
        }

        // Erzwinge Kontext mit apply, setze objekt als Kontext
        beispielFunktion.call(objekt);


        // call & apply Unterschiede
        var objekt = {
            eigenschaft: 0
        };

        function summe(a, b, c) {
            this.eigenschaft = a + b + c;
            console.info("Ergebnis: " + this.eigenschaft);
        }

        // call: Übergebe drei einzelne Parameter
        summe.call(objekt, 1, 2, 3);
        // apply: Übergebe drei Parameter in einem Array
        summe.apply(objekt, [1, 2, 3]);



        // --- bind und bindAsEventListener
        /* bind und bindAsEventListener erzeugen Wrapper-Funktionen. 
         * 
         * bind ist die allgemeinere Funktion, die z.B. bei Timeouts, Intervallen und Callbacks Verwendung findet. 
         * bindAsEventListener ist die Nutzung einer Funktion als Event-Handler zugeschnitten.
         * */
        if (!Function.prototype.bind) { 
            Function.prototype.bind = function () {
                var method = this;
                var args = Array.prototype.slice.call(arguments);
                var object = args.shift();
                return function () {
                    return method.apply(object, args);
                };
            };
        }

        if (!Function.prototype.bindAsEventListener) {
            Function.prototype.bindAsEventListener = function (object) {
                var method = this;
                return function (event) {
                    return method.call(object, event || window.event);
                }
            };
        }



        // ------ Anwendung bei einfachen Modulen
        var Modul = {
            eigenschaft: "Eigenschaftswert",
            start: function () {
                console.info("start wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
                setTimeout(this.verzögert.bind(this), 100);
                document.getElementById("button5").onclick = this.handler.bindAsEventListener(this);
            },
            verzögert: function () {
                console.info("verzögert wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
            },
            handler: function (e) {
                console.info("handler wurde aufgerufen\n" + "Event-Objekt: " + e + "\n",
                        "this.eigenschaft: " + this.eigenschaft);
            },
        };
        Modul.start();



        // ------ Anwendung bei Prototypen und Instanzmethoden
        function Konstruktor2() {}
        Konstruktor2.prototype = {
            eigenschaft: "Eigenschaftswert",
            start: function () {
                console.info("start wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
                setTimeout(this.verzögert.bind(this), 100);
                document.getElementById("button6").onclick = this.handler.bindAsEventListener(this);
            },
            verzögert: function () {
                console.info("verzögert wurde aufgerufen\n" + "this.eigenschaft: " + this.eigenschaft);
            },
            handler: function (e) {
                console.info("handler wurde aufgerufen\n" +
                        "Event-Objekt: " + e + "\n",
                        "this.eigenschaft: " + this.eigenschaft);
            }
        };
        var instanz2 = new Konstruktor2();
        instanz2.start();






        // --- Closures Gone Awry

        // i in Funktion ist Referenz und kann daher nicht so benutzt werden!!!
        function celebrityIDCreator(theCelebrities) {
            var i;
            var uniqueID = 100;
            for (i = 0; i < theCelebrities.length; i++) {
                theCelebrities[i]["id"] = function () {
                    return uniqueID + i;
                }
            }

            return theCelebrities;
        }

        var actionCelebs = [{name: "Stallone", id: 0}, {name: "Cruise", id: 0}, {name: "Willis", id: 0}];
        var createIdForActionCelebs = celebrityIDCreator(actionCelebs);
        var stalloneID = createIdForActionCelebs[0];
        console.log(stalloneID.id); // 103


        // LÖSUNG
        function celebrityIDCreator(theCelebrities) {
            var i;
            var uniqueID = 100;
            for (i = 0; i < theCelebrities.length; i++) {
                // the j parametric variable is the i passed in on invocation of this IIFE​
                theCelebrities[i]["id"] = function (j) {
                    return function () {
                        // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array​
                        return uniqueID + j;
                        // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, 
                        // instead of returning a function.​
                    }()
                }(i); // immediately invoke the function passing the i variable as a parameter​
            }

            return theCelebrities;
        }


        createIdForActionCelebs = celebrityIDCreator(actionCelebs);
        console.log(createIdForActionCelebs);

        var stalloneID = createIdForActionCelebs[0];
        console.log(stalloneID);
        console.log(stalloneID.id); // 100​

        var cruiseID = createIdForActionCelebs [1];
        console.log(cruiseID.id); // 101
    }
});
