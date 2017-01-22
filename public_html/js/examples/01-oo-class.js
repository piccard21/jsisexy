define([], function ($, _) {
    JSSEXY.e01_oo_class = function () {

        // Constructor-Pattern
        function User(theName, theEmail) {
            this.name = theName;
            this.email = theEmail;
            this.quizScores = [];
            this.currentScore = 0;
        }



        // Prototype-Pattern
        User.prototype = {
            constructor: User,
            saveScore: function (theScoreToAdd) {
                this.quizScores.push(theScoreToAdd)
            },
            showNameAndScores: function () {
                var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
                return this.name + " Scores: " + scores;
            },
            changeEmail: function (newEmail) {
                this.email = newEmail;
                return "New Email Saved: " + this.email;
            }
        }



        // A User ​
        var firstUser = new User("Richard", "Richard@examnple.com");
        firstUser.changeEmail("RichardB@examnple.com");
        firstUser.saveScore(15);
        firstUser.saveScore(10);
        console.info(firstUser.showNameAndScores()); //Richard Scores: 15,10​
        console.info(firstUser); 

        // Another User​
        var secondUser = new User("Peter", "Peter@examnple.com");
        secondUser.saveScore(18);
        console.info(secondUser.showNameAndScores()); //Peter Scores: 18
        console.info(secondUser); 
    }
});
