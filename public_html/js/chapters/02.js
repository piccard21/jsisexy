define([], function ($, _) {
    JSSEXY.c02 = function () {

//
//------------------------------------------------------------------------------------------------
//
//        First, every JavaScript function has a prototype property (this property is empty by default), 
//        and you attach properties and methods on this prototype property when you want to implement inheritance. 
//This prototype property is not enumerable; that is, it isn’t accessible in a for/in loop. 
//        But Firefox and most versions of Safari and Chrome have a __proto__ “pseudo” property 
//(an alternative syntax) that allows you to access an object’s prototype property. 
//        You will likely never use this __proto__ pseudo property, but you should know that it exists and 
//it is simply a way to access an object’s prototype property in some browsers.


        function PrintStuff(myDocuments) {
            this.documents = myDocuments;
        }


// We add the print () method to PrintStuff prototype property so that other instances (objects) 
// can inherit it:​
        PrintStuff.prototype.print = function () {
            console.log(this.documents);
        }

        // Create a new object with the PrintStuff () constructor, thus allowing this new object to inherit PrintStuff's properties and methods.​
        var newObj = new PrintStuff("I am a new Object and I can print.");

        // newObj inherited all the properties and methods, including the print method, from the PrintStuff function. Now newObj can call print directly, even though we never created a print () method on it.​
        newObj.print(); //I am a new Object and I can print.




//
//------------------------------------------------------------------------------------------------
//
//Constructor
//The constructor in this example is Object () ​ 
        var myObj = new Object();
        // And if you later want to find the myObj constructor:​
        console.log(myObj.constructor); // Object()​ 

        // Another example: Account () is the constructor​
        var userAccount = new Account();
        // Find the userAccount object's constructor​
        console.log(userAccount.constructor); // Account()



//Prototype Attribute

        // The userAccount object inherits from Object and as such its prototype attribute is 
        // Object.prototype.​
        var userAccount = new Object();

        // This demonstrates the use of an object literal to create the userAccount object; 
        // the userAccount object inherits from Object; therefore, its prototype attribute 
        // is Object.prototype just as the userAccount object does above.​
        var userAccount = {name: "Mike"}



        function Account() {

        }
        var userAccount = new Account()
// userAccount initialized with the Account () constructor and as such its prototype attribute 
// (or prototype object) is Account.prototype.




// ==== Prototype Property: Prototype-based Inheritance
        function Plant() {
            this.country = "Mexico";
            this.isOrganic = true;
        }


// Add the showNameAndColor method to the Plant prototype property​
        Plant.prototype.showNameAndColor = function () {
            console.log("I am a " + this.name + " and my color is " + this.color);
        }

// Add the amIOrganic method to the Plant prototype property​
        Plant.prototype.amIOrganic = function () {
            if (this.isOrganic)
                console.log("I am organic, Baby!");
        }

        function Fruit(fruitName, fruitColor) {
            this.name = fruitName;
            this.color = fruitColor;
        }

// Set the Fruit's prototype to Plant's constructor, thus inheriting all of Plant.prototype methods and properties.​
        Fruit.prototype = new Plant();

// Creates a new object, aBanana, with the Fruit constructor​
        var aBanana = new Fruit("Banana", "Yellow");

// Here, aBanana uses the name property from the aBanana object prototype, which is Fruit.prototype:​
        console.log(aBanana.name); // Banana​

// Uses the showNameAndColor method from the Fruit object prototype, which is Plant.prototype. The aBanana object inherits all the properties and methods from both the Plant and Fruit functions.​
        console.log(aBanana.showNameAndColor()); // I am a Banana and my color is yellow.





// ==== Prototype Attribute: Accessing Properties on Objects
        function People() {
            this.superstar = "Michael Jackson";
        }
// Define "athlete" property on the People prototype so that "athlete" is accessible by all objects that use the People () constructor.​
        People.prototype.athlete = "Tiger Woods";

        var famousPerson = new People();
        famousPerson.superstar = "Steve Jobs";
        // OVERWRITTEN DIRECTLY!!!

// The search for superstar will first look for the superstar property on the famousPerson object, 
// and since we defined it there, that is the property that will be used. 
// Because we have overwritten the famousPerson’s superstar property with one directly
//  on the famousPerson object, the search will NOT proceed up the prototype chain. ​
        console.log(famousPerson.superstar); // Steve Jobs​
    }
});
