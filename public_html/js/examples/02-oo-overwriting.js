define([], function ($, _) {
    JSSEXY.e02_oo_overwriting = function () { 

        function Katze() {}

        Katze.prototype.pfoten = 4;
        Katze.prototype.miau = function () {
            alert("Miau!");
        };

        var maunzi = new Katze();
        var schnucki = new Katze();

        // Überschreibe vom Prototyp vererbte Eigenschaft,
        // indem eine gleichnamige Eigenschaft bei der Instanz erzeugt wird:
        maunzi.pfoten = 5;
        console.info('Maunzi hat nun ' + maunzi.pfoten + ' Pfoten.');

        // Überschreibe Methode des Prototyps:
        Katze.prototype.miau = function () {
            console.info("Wau, wau!");
        };
        schnucki.miau(); 
    }
})