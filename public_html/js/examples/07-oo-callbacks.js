define([], function ($, _) {
    JSSEXY.e07_oo_callbacks = function () {

        /* 
         Callback Functions Are Closures
         
         When we pass a callback function as an argument to another function, the callback is executed at 
         some point inside the containing function’s body just as if the callback were defined in the 
         containing function. This means the callback is a closure.  
         As we know, closures have access to the containing function’s scope, so the callback function 
         can access the containing functions’ variables, and even the variables from the global scope.
         */


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
        getInput({name: "Rich", speciality: "JavaScript"}, logStuff);

        console.info(allUserData);





        // ---- Problem When Using Methods With The this Object as Callbacks 
        var clientData = {
            id: 094545,
            fullName: "Not Set",
            // setUserName is a method on the clientData object​
            setUserName: function (firstName, lastName) {
                // this refers to the fullName property in this object​
                this.fullName = firstName + " " + lastName;
            }
        }

        function getUserInput(firstName, lastName, callback) {
            // Do other stuff to validate firstName/lastName here​

            // Now save the names​
            callback(firstName, lastName);
        }

        getUserInput("Barack", "Obama", clientData.setUserName);
        console.log(clientData.fullName);// Not Set​

        // The fullName property was initialized on the window object​
        console.log(window.fullName); // Barack Obama



        // --- Lösung: apply
        function getUserInput2(firstName, lastName, callback, callbackObj) {
            // Do other stuff to validate name here​

            // The use of the Apply function below will set the this object to be callbackObj​
            callback.apply(callbackObj, [firstName, lastName]);
        }
        // We pass the clientData.setUserName method and the clientData object as parameters. The clientData object will be used by the Apply function to set the this object​
        getUserInput2("Barack", "Obama", clientData.setUserName, clientData);

        // the fullName property on the clientData was correctly set​
        console.log(clientData.fullName); // Barack Obama




        //
        // ----------------------------------------------------------------------
        //
        // callback mit vielen funktionen
        // 
        // First, setup the generic poem creator function; 
        // it will be the callback function in the getUserInput function below.​
        function genericPoemMaker(name, gender) {
            console.log(name + " is finer than fine wine.");
            console.log("Altruistic and noble for the modern time.");
            console.log("Always admirably adorned with the latest style.");
            console.log("A " + gender + " of unfortunate tragedies who still manages a perpetual smile");
        }
        function greetUser(customerName, sex) {
            var salutation = sex && sex === "Man" ? "Mr." : "Ms.";
            console.log("Hello, " + salutation + " " + customerName);
        }

        //The callback, which is the last item in the parameter, will be our genericPoemMaker function we defined above.​
        function getUserInput(firstName, lastName, gender, callback) {
            var fullName = firstName + " " + lastName;

            // Make sure the callback is a function​
            if (typeof callback === "function") {
                // Execute the callback function and pass the parameters to it​
                callback(fullName, gender);
            }
        }


        getUserInput("Michael", "Fassbender", "Man", genericPoemMaker);
        getUserInput("Bill", "Gates", "Man", greetUser);
    }
});
