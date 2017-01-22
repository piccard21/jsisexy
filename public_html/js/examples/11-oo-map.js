define(['jquery', 'underscore'], function ($, _) {
    JSSEXY.e11_oo_map = function () {


        /*
         * https://code.tutsplus.com/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209
         * */

        // ----  map 
        // 
        // verändert ein bestehendes Array
        // 
        //Under the hood, map passes three arguments to your callback:
        //
        //The current item in the array
        //The array index of the current item
        //The entire array you called map on 
        // 

        var tasks = [
            {
                'name': 'Write for Envato Tuts+',
                'duration': 120

            },
            {
                'name': 'Work out',
                'duration': 60

            },
            {
                'name': 'Procrastinate on Duolingo',
                'duration': 240

            }

        ];


        var task_names = [];

        for (var i = 0, max = tasks.length; i < max; i += 1) {

            task_names.push(tasks[i].name);

        }


        task_names = [];

        tasks.forEach(function (task) {

            task_names.push(task.name);

        });

        // I include the index and  array parameters to remind you that they're there if you need them. 
        task_names = tasks.map(function (task, index, array) {

            return task.name;

        });

        console.info(task_names)





        // ----   filter 
        // It does exactly what it sounds like: It takes an array, and filters out unwanted elements.
        // 
        // The current item 
        // The current index
        // The array you called filter on


        var difficult_tasks = [];

        tasks.forEach(function (task) {
            if (task.duration >= 120) {
                difficult_tasks.push(task);
            }
        });

        var difficult_tasks = tasks.filter(function (task) {
            return task.duration >= 120;
        });
 





        // ----  reduce
        // 
        // takes all of the elements in an array, and reduces them into a single value.
        // 
        // reduce iterates over all the elements of an array, 
        // combining them however you specify in your callback. 
        //
        //        reduce passes your callback four arguments:
        //
        //The current value
        //The previous value 
        //The current index
        //The array you called reduce on
        var numbers = [1, 2, 3, 4, 5], total = 0;

        numbers.forEach(function (number) {
            total += number;
        });

        var total = [1, 2, 3, 4, 5].reduce(function (previous, current) {
            return previous + current;
        }, 0);



        var total = [1, 2, 3, 4, 5].reduce(function (previous, current, index) {
            var val = previous + current;
            console.log("The previous value is " + previous +
                    "; the current value is " + current +
                    ", and the current iteration is " + (index + 1));
            return val;
        }, 0);

        console.log("The loop is done, and the final value is " + total + ".");




        // ------ Map, Filter, Reduce, and Chainability
        // 
        //Collect two days' worth of tasks.
        //Convert the task durations to hours, instead of minutes.
        //Filter out everything that took two hours or more.
        //Sum it all up.
        //Multiply the result by a per-hour rate for billing.
        //Output a formatted dollar amount.
        var monday = [
            {
                'name': 'Write a tutorial',
                'duration': 180
            },
            {
                'name': 'Some web development',
                'duration': 120
            }
        ];

        var tuesday = [
            {
                'name': 'Keep writing that tutorial',
                'duration': 240
            },
            {
                'name': 'Some more web development',
                'duration': 180
            },
            {
                'name': 'A whole lot of nothing',
                'duration': 240
            }
        ];

        var tasks = [monday, tuesday];


        var result = tasks.reduce(function (accumulator, current) {
            // Concatenate our 2D array into a single list
            return accumulator.concat(current);
        }).map(function (task) {
            // Extract the task duration, and convert minutes to hours
            return (task.duration / 60);
        }).filter(function (duration) {
            // Filter out any task that took less than two hours
            return duration >= 2;
        }).map(function (duration) {
            // Multiply each tasks' duration by our hourly rate
            return duration * 25;
        }).reduce(function (accumulator, current) {
            // Combine the sums into a single dollar amount
            return [(+accumulator) + (+current)];
        }).map(function (dollar_amount) {
            // Convert to a "pretty-printed" dollar amount
            return '$' + dollar_amount.toFixed(2);
        }).reduce(function (formatted_dollar_amount) {
            // Pull out the only element of the array we got from map
            return formatted_dollar_amount;
        });
        
        console.info(result)
    }
});
