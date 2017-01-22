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

define([], function ($, _) {
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
        
    }
});
