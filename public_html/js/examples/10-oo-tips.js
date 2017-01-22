define(['jquery', 'underscore'], function ($, _) {
    JSSEXY.e10_oo_tips = function () {

        // ---- Basic “short circuting” with || 
        // JavaScript Falsy Values: 
        // null, false, 0 undefined, NaN, and “” (this last item is an empty string).
        // 
        // — Note that Infinity, which is a special number like NaN, is truthy; it is not falsy, while NaN is falsy.
        // 
        // DON'T: 
        function documentTitle(theTitle) {
            if (!theTitle) {
                if (!theTitle) {
                    theTitle = "Untitled Document";
                }
            }
        }

        // BUT:
        function documentTitle(theTitle) {
            theTitle = theTitle || "Untitled Document";
        }




        // ---- Basic short circuting with && (Logical AND)
        // DON'T: 
        function isAdult(age) {
            if (age && age > 17) {
                return true;
            } else {
                return false;
            }
        }

        // BUT:
        function isAdult(age) {
            return age && age > 17;
        }




        // ----
        // DON'T: 
        var userName;
        if (userName) {
//            logIn(userName);
        } else {
//            signUp();
        }

        // BUT:
//        userName && logIn(userName) || signUp();
        /*
         * — If userName is truthy, then call the logIn function with userName as the parameter.
         * — If userName is falsy, call the signUp function
         */


        // ----
        // DON'T: 
        var userID;
        if (userName && userName.loggedIn) {
            userID = userName.id;
        } else {
            userID = null;
        }

        // BUT:
        var userID = userName && userName.loggedIn && userName.id;
        /*
         * — If userName is truthy, call userName.loggedIn and check if it is truthy; 
         *      if it is truthy, then get the id from userName.
         * — If userName is falsy, return null.
         * */



        // ---- Powerful Uses of Immediately Invoked Function Expressions
        (showName = function (name) {
            console.log(name || "No Name")
        })(); // No Name​
        //showName ("Rich"); // Rich​
        showName(); // No Name




        // ---- When To Use Immediately Invoked Function Expressions?
        // -------- To Avoid Polluting the Global Scope
        /*
         * In this first example, I am using it in the global scope to 
         * keep all my variables local to the anonymous function, and thus 
         * outside the global scope where variables can shadow (block) other 
         * already-defined variables with the same name (probably 
         * from an included library or framework). 
         */
        (function () {

            var firstName = "Richard";
            function init() {
                doStuff(firstName);
                // code to start the application​
            }

            function doStuff() {
                // Do stuff here​
            }

            function doMoreStuff() {
                // Do more stuff here​
            }

            // Start the application 
            init();
        })();



        // -------- Use With the Conditional Operator 
        var unnamedDocs = [], namedDocs = ["a_bridge_runover", "great_dreamers"];
        function createDoc(documentTitle) {
            var documentName = documentTitle

                    ?
                    (function (theName) {
                        var newNamedDoc = theName.toLocaleLowerCase().replace(" ", "_");
                        namedDocs.push(newNamedDoc);

                        return newNamedDoc;
                    })(documentTitle)


                    :
                    (function () {
                        var newUnnamedDoc = "untitled_" + Number(namedDocs.length + 1);
                        unnamedDocs.push(newUnnamedDoc);
                        return newUnnamedDoc;
                    })();


            return documentName;
        }
        createDoc("Over The Rainbow"); // over_the rainbow​
        createDoc(); // untitled_4






        // -------- Use it in Closures to Prevent Fold Over
        function celebrityIDCreator(theCelebrities) {
            var i;
            var uniqueID = 100;
            for (i = 0; i < theCelebrities.length; i++) {
                theCelebrities[i]["id"] = function (j) { // the j parametric variable is the i passed in on invocation of this IIFE​
                    return function () {
                        return uniqueID + j; // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array​
                    }
                }(i); // immediately invoke the function passing the i variable as a parameter​
            }

            return theCelebrities;
        }

        var actionCelebs = [{name: "Stallone", id: 0}, {name: "Cruise", id: 0}, {name: "Willis", id: 0}];

        var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

        var stalloneID = createIdForActionCelebs [0];
        console.log(stalloneID.id()); // 100​

        var cruiseID = createIdForActionCelebs [1];
        console.log(cruiseID.id()); // 101






        // BUT:
// ----
        // DON'T: 


        // BUT:
// ----
// ----
// ----
// ----
// ----
    }
});
