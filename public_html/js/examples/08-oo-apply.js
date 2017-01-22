define([], function ($, _) {
    JSSEXY.e08_oo_apply = function () {


        //The Apply, Call, and Bind methods are all used to set the this value when invoking a method
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




        // ---- Borrowing Functions with Apply and Call (A Must Know)
        // An array-like object: note the non-negative integers used as keys​
        var anArrayLikeObj = {
            0: "Martin", 1: 78, 2: 67,
            3: ["Letta", "Marieta", "Pauline"],
            length: 4
        };


        // Make a quick copy and save the results in a real array:​
        // First parameter sets the "this" value​
        var newArray = Array.prototype.slice.call(anArrayLikeObj, 0);

        console.log(newArray); // ["Martin", 78, 67, Array[3]]​

        // Search for "Martin" in the array-like object​
        console.log(Array.prototype.indexOf.call(anArrayLikeObj, "Martin") === -1 ? false : true); // true​

        // Try using an Array method without the call () or apply ()​
//        console.log(anArrayLikeObj.indexOf("Martin") === -1 ? false : true); // Error: Object has no method 'indexOf'​

        // Reverse the object:​
        console.log(Array.prototype.reverse.call(anArrayLikeObj));
        // {0: Array[3], 1: 67, 2: 78, 3: "Martin", length: 4}​

        // Sweet. We can pop too:​
        console.log(Array.prototype.pop.call(anArrayLikeObj));
        console.log(anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, length: 3}​

        // What about push?​
        console.log(Array.prototype.push.call(anArrayLikeObj, "Jackie"));
        console.log(anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, 3: "Jackie", length: 4}​




        // ---- Use Apply () to Execute Variable-Arity Functions
        /*
         * We can pass an array with of arguments to a function and, by virtue of using the apply () method, 
         * the function will execute the items in the array as if we called the function like this:
         *     createAccount (arrayOfItems[0], arrayOfItems[1], arrayOfItems[2], arrayOfItems[3])
         */

        // We can pass any number of arguments to the Math.max () method​
        console.log(Math.max(23, 11, 34, 56)); // 56

        var allNumbers = [23, 11, 34, 56];
        // We cannot pass an array of numbers to the the Math.max method like this​
        console.log(Math.max(allNumbers)); // NaN 11, 34, 56]; 
        // console.log (Math.max (allNumbers)); // NaN

        var allNumbers = [23, 11, 34, 56];
        // Using the apply () method, we can pass the array of numbers:​
        console.log(Math.max.apply(null, allNumbers)); // 56




        var students = ["Peter Alexander", "Michael Woodruff", "Judy Archer", "Malcolm Khan"]; 
        // No specific parameters defined, because ANY number of parameters are accepted​
        function welcomeStudents() {
            var args = Array.prototype.slice.call(arguments);

            var lastItem = args.pop();
            console.log("Welcome " + args.join(", ") + ", and " + lastItem + ".");
        }

        welcomeStudents.apply(null, students);
        // Welcome Peter Alexander, Michael Woodruff, Judy Archer, and Malcolm Khan.
        
        // ist also wie:
        welcomeStudents("Peter Alexander", "Michael Woodruff", "Judy Archer", "Malcolm Khan");






        /* 
         
         BIND
         
         So, with the bind () method, we can explicitly set the this value for invoking methods on objects, 
         we can borrow and copy methods, 
         and assign methods to variable to be executed as functions. 
         you can use bind for currying.
         */

        // --- Bind () Allows us to Borrow Methods
        // ECMAScript 5 introduced the Bind method
        // Fallback
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

        // ---- Bind Allows Us to Set the this Value on Methods 
        // PROBLEM: this.data in function 

        var user = {
            // local data variable​
            data: [
                {name: "T. Woods", age: 37},
                {name: "P. Mickelson", age: 43}
            ],
            showData: function (event) {
                var randomNum = ((Math.random() * 2 | 0) + 1) - 1; // random number between 0 and 1​  
                console.log(this.data[randomNum].name + " " + this.data[randomNum].age);
            }
        }

        // Assign the showData method of the user object to a variable​
        var showDataVar = user.showData;
        // GEHT NICHT
//        showDataVar();  



        // LÖSUNG: bind
        // Bind the showData method to the user object​
        showDataVar = user.showData.bind(user);

        // Now we get the value from the user object because the this keyword is bound to the user object​
        showDataVar(); // P. Mickelson 43​








        // --- Bind () Allows us to Borrow Methods
        // Here we have a cars object that does not have a method to print its data to the console​
        var cars = {
            data: [
                {name: "Honda Accord", age: 14},
                {name: "Tesla Model S", age: 2}
            ]

        }

        // CALL, APPLY BEIM BORGEN BESSER
        // We can borrow the showData () method from the user object we defined in the last example.​
        // Here we bind the user.showData method to the cars object we just created.​
        cars.showData = user.showData.bind(cars);
        cars.showData(); // Honda Accord 14​


        // One problem with this example is that we are adding a new method (showData) on 
        // the cars object and we might not want to do that just to borrow a method because 
        // the cars object might already have a property or method name showData. 
        // We don’t want to overwrite it accidentally.
        // --> it is best to borrow a method using either the Apply or Call method.



        // --- Bind Allows Us to Curry a Function 
        // === Curry = Parameter der Funktion mit Werten belegen
        function greet(gender, age, name) {
            // if a male, use Mr., else use Ms.​
            var salutation = gender === "male" ? "Mr. " : "Ms. ";

            if (age > 25) {
                return "Hello, " + salutation + name + ".";
            } else {
                return "Hey, " + name + ".";
            }
        }
        // So we are passing null because we are not using the "this" keyword in our greet function.​
        var greetAnAdultMale = greet.bind(null, "male", 45);

        greetAnAdultMale("John Hartlove"); // "Hello, Mr. John Hartlove."​

        var greetAYoungster = greet.bind(null, "", 16);
        greetAYoungster("Alex"); // "Hey, Alex."​
        greetAYoungster("Emma Waterloo"); // "Hey, Emma Waterloo."​

    }
});
