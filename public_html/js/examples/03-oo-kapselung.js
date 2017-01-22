//http://molily.de/js/organisation-module.html

define([], function ($, _) {
    JSSEXY.e03_oo_kapselung = function () {

        function Katze(name) {
            // --- Private Objekte
            // Private Variablen
            var pfoten = 4;
            var gestreichelt = 0;
            // name ist ebenfalls eine private Variable

            // Private Funktionen
            function miau() {
                console.info(name + ' macht miau!');
            }

            // --- Öffentliche (priviligierte) Eigenschaften
            this.name = name;
            // Öffentliche Methoden
            this.kitzeln = function () {
                console.info(name + ' hat ' + pfoten + ' kitzlige Pfoten.');
                miau();
            };
            this.streicheln = function () {
                gestreichelt++;
                miau();
            };
        }

        var maunzi = new Katze('Maunzi');
        maunzi.kitzeln();
        maunzi.streicheln();

        console.info('maunzi.name: ' + maunzi.name);
        // pfoten ist keine Objekt-Eigenschaft, also von außen UNZUGÄNGLICH:
        console.info('maunzi.pfoten: ' + maunzi.pfoten);
        console.info(maunzi);



        // ------------------------------------------------------------

        // privater Funktions-Scope
        var Modul = (function () {

            // Private Objekte
            var privateVariable = "privat";
            function privateFunktion() {
                console.info("privateFunktion wurde aufgerufen\n" +
                        "Private Variable: " + privateVariable);
            }

            // Gebe öffentliches Schnittstellen-Objekt zurück
            return {
                öffentlicheMethode: function () {
                    console.info("öffentlicheMethode wurde aufgerufen\n" +
                            "Private Variable: " + privateVariable);
                    privateFunktion();
                }
            };

        })();

        // Rufe öffentliche Methode auf
        Modul.öffentlicheMethode();

        // Ergibt undefined, weil von außen nicht sichtbar:
        console.info("Modul.privateFunktion von außerhalb: " + Modul.privateFunktion);



        /* Erweiterung des Grundmoduls */

        // Feste Kopplung
        (function (modul) {
            
            console.info(modul)
            
            /* ... private Objekte ... */
            function moreAbilities( ) {
                console.info("Ich kann viel mehr ... ");
            }

            /* Erweitere Modul um neue Methoden: */
            modul.erweiterteModulMethode01 = function () {
                moreAbilities();
                modul.öffentlicheMethode();
                // NICHT MÖGLICH
//                modul.privateFunktion();
            };
        })(Modul);


        // Rufe Erweiterung auf
        Modul.erweiterteModulMethode01();




        // Lose Kopplung
        var Modul = (function (modul) {
            /* ... private Objekte ... */

            /* Lege Methode am Modulobjekt an: */
            modul.erweiterteModulMethode02 = function () {
                console.info('erweiterteModulMethode02');
            };

            return modul;
        }(Modul || {})); 


        var Modul = (function (modul) {
            /* ... private Objekte ... */

            /* Lege Methode am Modulobjekt an: */
            modul.erweiterteModulMethode03 = function () {
                console.info('erweiterteModulMethode03');
                modul.öffentlicheMethode();
                modul.erweiterteModulMethode01();
            };

            return modul;
        }(Modul || {}));
        
        
        Modul.erweiterteModulMethode02();
        Modul.erweiterteModulMethode03();
    }
});
