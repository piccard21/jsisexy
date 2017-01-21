define([], function ($, _) { 
    JSSEXY.c01 = function () {

        //
        //
        //
        //------------------------------------------------------------------------------------------------
//
//Property names can be a string or a number, 
//but if the property name is a number, 
//it has to be accessed with the bracket notation.

        var ageGroup = {30: "Children", 100: "Very Old"};
        // This will throw an error​
        //console.log(ageGroup.30) 

        // This is how you will access the value of the property 30, to get value "Children"​
        console.log(ageGroup["30"]); // Children​


        //
        //------------------------------------------------------------------------------------------------
        //
//Reference Data Type and Primitive Data Types
//
// The primitive data type String is stored as a value​

        var person = "Kobe";
        var anotherPerson = person; // anotherPerson = the value of person​
        person = "Bryant"; // value of person changed​

        console.log(anotherPerson); // Kobe​
        console.log(person); // Bryant


        //Compare the primitive data saved-as-value demonstrated above with 
        //the save-as-reference for objects:
        var person = {
            name: "Kobe"
        };
        var anotherPerson = person;
        person.name = "Bryant";

        console.log(anotherPerson.name); // Bryant​
        console.log(person.name); // Bryant



        //
        //------------------------------------------------------------------------------------------------
        //
        //Object Data Properties Have Attributes
//        Each data property (object property that store data) has not only the name-value pair, but also 3 attributes (the three attributes are set to true by default):
//            Configurable Attribute: Specifies whether the property can be deleted or changed.
//            Enumerable: Specifies whether the property can be returned in a for/in loop.
//            Writable: Specifies whether the property can be changed.

        //
        //------------------------------------------------------------------------------------------------
        //
        //Creating Objects

//        Object Constructor
        var mango = new Object();
        mango.color = "yellow";
        mango.shape = "round";
        mango.sweetness = 8;

        mango.howSweetAmI = function () {
            console.log("Hmm Hmm Good");
        }



//        Practical Patterns for Creating Objects

//If you have 10 fruits, you will have to add the same code 10 times. 
        var mangoFruit = {
            color: "yellow",
            sweetness: 8,
            fruitName: "Mango",
            nativeToLand: ["South America", "Central America"],
            showName: function () {
                console.log("This is " + this.fruitName);
            },
            nativeTo: function () {
                this.nativeToLand.forEach(function (eachCountry) {
                    console.log("Grown in:" + eachCountry);
                });
            }
        }




//Constructor Pattern for Creating Objects

//With this pattern in place, it is very easy to create all sorts of fruits. 
        function Fruit(theColor, theSweetness, theFruitName, theNativeToLand) {

            this.color = theColor;
            this.sweetness = theSweetness;
            this.fruitName = theFruitName;
            this.nativeToLand = theNativeToLand;

            this.showName = function () {
                console.log("This is a " + this.fruitName);
            }

            this.nativeTo = function () {
                this.nativeToLand.forEach(function (eachCountry) {
                    console.log("Grown in:" + eachCountry);
                });
            }
        }

        mangoFruit = new Fruit("Yellow", 8, "Mango", ["South America", "Central America", "West Africa"]);

        console.log(mangoFruit);
        console.log(mangoFruit.color);

        mangoFruit.showName(); // This is a Mango.​
        mangoFruit.nativeTo();
        //Grown in:South America​
        // Grown in:Central America​
        // Grown in:West Africa​

        var pineappleFruit = new Fruit("Brown", 5, "Pineapple", ["United States"]);
        pineappleFruit.showName(); // This is a Pineapple.


//        Notes:
//— An inherited property is defined on the object’s prototype property. For example: someObject.prototype.firstName = “rich”;
//
//— An own property is defined directly on the object itself, for example:
//// Let’s create an object first:
//var aMango = new Fruit ();
//// Now we define the mangoSpice property directly on the aMango object
//// Because we define the mangoSpice property directly on the aMango object, 
//it is an own property of aMango, not an inherited property.
//aMango.mangoSpice = “some value”; 
//    




//Prototype Pattern for Creating Objects

        function Fruit2() {

        }

        Fruit2.prototype.color = "Yellow";
        Fruit2.prototype.sweetness = 7;
        Fruit2.prototype.fruitName = "Generic Fruit";
        Fruit2.prototype.nativeToLand = "USA";

        Fruit2.prototype.showName = function () {
            console.log("This is a " + this.fruitName);
        }

        Fruit2.prototype.nativeTo = function () {
            console.log("Grown in:" + this.nativeToLand);
        }

        mangoFruit = new Fruit2();
        mangoFruit.showName(); //​
        mangoFruit.nativeTo();
// This is a Generic Fruit​
// Grown in:USA


        //
        //------------------------------------------------------------------------------------------------
        //
//Own and Inherited Properties
//Objects have inherited properties and own properties. 
//The own properties are properties that were defined on the object, 
//while the inherited properties were inherited from the object’s Prototype object.

//To find out if a property exists on an object 
//(either as an inherited or an own property), you use the in operator:
// Create a new school object with a property name schoolName​


        var school = {schoolName: "MIT"};

//Prints true because schoolName is an own property on the school object​
        console.log("schoolName" in school);  // true​

// Prints false because we did not define a schoolType property on the school object, and neither did the object inherit a schoolType property from its prototype object Object.prototype.​
        console.log("schoolType" in school);  // false​

// Prints true because the school object inherited the toString method from Object.prototype. ​
        console.log("toString" in school);  // true



//hasOwnProperty
//To find out if an object has a specific property as one of its own property, 
//you use the hasOwnProperty method. This method is very useful because from time to time 
//you need to enumerate an object and you want only the own properties, not the inherited ones.

// Create a new school object with a property name schoolName​
        var school = {schoolName: "MIT"};

// Prints true because schoolName is an own property on the school object​
        console.log(school.hasOwnProperty("schoolName"));  // true​

// Prints false because the school object inherited the toString method from Object.prototype, 
// therefore toString is not an own property of the school object.​
        console.log(school.hasOwnProperty("toString"));  // false 




//Accessing and Enumerating Properties on Objects
//To access the enumerable (own and inherited) properties on objects, 
//you use the for/in loop or a general for loop.

// Create a new school object with 3 own properties: schoolName, schoolAccredited, and schoolLocation.​
        var school = {
            schoolName: "MIT",
            schoolAccredited: true,
            schoolLocation: "Massachusetts"
        };

//Use of the for/in loop to access the properties in the school object​

        for (var eachItem in school) {
            console.log(eachItem); // Prints schoolName, schoolAccredited, schoolLocation​
        }





//Accessing Inherited Properties
//Properties inherited from Object.prototype are not enumerable, so the for/in loop does not show them.  
// Create a new HigherLearning function that the school object will inherit from.​

        function HigherLearning() {
            this.educationLevel = "University";
        }

// Implement inheritance with the HigherLearning constructor​
        var school = new HigherLearning();
        school.schoolName = "MIT";
        school.schoolAccredited = true;
        school.schoolLocation = "Massachusetts";


//Use of the for/in loop to access the properties in the school object​
        for (var eachItem in school) {
            console.log(eachItem); // Prints educationLevel, schoolName, schoolAccredited, and schoolLocation​
        }
        console.info(school);



        //
        //------------------------------------------------------------------------------------------------
        //
//Deleting Properties of an Object 
//To delete a property from an object, you use the delete operator. 
//You cannot delete properties that were inherited, nor can you delete properties with 
//their attributes set to configurable. You must delete the inherited properties on the 
//prototype object (where the properties were defined). 
//
//Also, you cannot delete properties of the global object, which were declared with the var keyword.
//
//The delete operator returns true if the delete was successful. 
//And surprisingly, it also returns true if the property to delete was nonexistent 
//or the property could not be deleted (such as non-configurable or not owned by the object).



        var christmasList = {mike: "Book", jason: "sweater"}
        delete christmasList.mike; // deletes the mike property​

        for (var people in christmasList) {
            console.log(people);
        }
// Prints only jason​
// ​// The mike property was deleted​


        delete christmasList.toString; // returns true, but toString not deleted because it is an inherited method​

// Here we call the toString method and it works just fine—wasn’t deleted ​
        christmasList.toString(); //"[object Object]"​

// You can delete a property of an instance if the property is an own property of that instance. 
// For example, we can delete the educationLevel property from the school's object 
// we created above because the educationLevel property is defined on the instance: 
// 
// !!!!
// we used the "this" keyword to define the property when we declare the HigherLearning function. 
// We did not define the educationLevel property on the HigherLearning function's prototype.​

        console.log(school.hasOwnProperty("educationLevel"));
// educationLevel is an own property on school, so we can delete it​


        delete school.educationLevel;
        true

// The educationLevel property was deleted from the school instance​
        console.log(school.educationLevel);



// But the educationLevel property is still on the HigherLearning function​

        var newSchool = new HigherLearning();
        console.log(newSchool.educationLevel); // University​

// If we had defined a property on the HigherLearning function's prototype, such as this educationLevel2 property:​
        HigherLearning.prototype.educationLevel2 = "University 2";

// Then the educationLevel2 property on the instances of HigherLearning would not be own property. ​

// The educationLevel2 property is not an own property on the school instance​
        console.log(school.hasOwnProperty("educationLevel2"));
        console.log(school.educationLevel2); // 


// Let's try to delete the inherited educationLevel2 property​ 
        delete school.educationLevel2;

// The inherited educationLevel2 property was not deleted​
// console.log(school.educationLevel2); 


//Serialize and Deserialize Objects
//To transfer your objects via HTTP or to otherwise convert it to a string, 
//you will need to serialize it (convert it to a string); 
//you can use the JSON.stringify function to serialize your objects. 
//
//Note that prior to ECMAScript 5, you had to use a popular json2 library 
//(by Douglas Crockford) to get the JSON.stringify function. 
//It is now standardized in ECMAScript 5.

        var christmasList = {mike: "Book", jason: "sweater", chelsea: "iPad"}
        JSON.stringify(christmasList);
// Prints this string:​
// "{"mike":"Book","jason":"sweater","chels":"iPad"}"  

// To print a stringified object with formatting, add "null" and "4" as parameters:​
        JSON.stringify(christmasList, null, 4);
// "{
//    "mike": "Book",
//    "jason": "sweater",
//    "chels": "iPad"​
//}"
//​
// JSON.parse Examples \\​
        // The following is a JSON string, so we cannot access the properties with dot notation (like christmasListStr.mike)​
                var christmasListStr = '{"mike":"Book","jason":"sweater","chels":"iPad"}';

// Let’s convert it to an object​

        var christmasListObj = JSON.parse(christmasListStr);

// Now that it is an object, we use dot notation​
        console.log(christmasListObj.mike); // Book


//+++++
    }


}); 