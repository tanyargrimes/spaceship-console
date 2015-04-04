// Wait for DOM to Load
jQuery(function($) {

	var tl = new TimelineMax();
	var dotContainer = $('.cadets');
	var socket = io();
	var cycleInterval = null;
	var idleTimer = null;
	var randomThree;
    var promise;

	// listen for event connected to pass all data
    socket.on('showAll', function(data){
      
		// kill all intervals and timers
		if ( cycleInterval != null )
			clearInterval(cycleInterval);

		if ( idleTimer != null )
			clearTimeout(idleTimer);

		console.log(data.results);

		showData(data);

		// set timer to start cycleInterval
		idleTimer = setTimeout( function() {
			resetInterval();
		}, 10000);
      
    });

    // listen for event connected to pass developer data
    socket.on('showDev', function(data){
      
		console.log(data.results);

		showData(data);
      
    });

    // listen for event connected to pass designer data
    socket.on('showDes', function(data){
      
		console.log(data.results);

		showData(data);
      
    });


    // initial declaration to start cycling through all students
    // set up interval to randomly display images that can be paused/canceled on button click
    cycleInterval = setInterval( function() { 
    	
    	randomThree = generateRandomAll();

        // call to database to retrieve info on three random students
        promise = queryAll(randomThree);

		showPromisedData(promise);

    }, 5000);


    function resetInterval() {

    	// set up interval to randomly display images that can be paused/canceled on button click
	    cycleInterval = setInterval( function() { 

	    	randomThree = generateRandomAll();

            // get a promise of info retrieved from database query of all students
            promise = queryAll(randomThree);

			showPromisedData(promise);

	    }, 5000);

    }

    // generates three students by id randomly
    function generateRandomAll() {
    	randomThree = [];

		while ( randomThree.length < 3 ){
			
			//CHANGE TO PROPER NUMBER INSTEAD OF 21
            var randomnumber = Math.ceil( Math.random() * 21 )
			var found = false;
			
			for ( var i = 0; i < randomThree.length; i++ ){
				if ( randomThree[i] == randomnumber ) {
					found = true; 
					break;
				}
			}

			if ( !found )
				randomThree[randomThree.length] = randomnumber;
		}

		console.log(randomThree);

		return randomThree;
    }

    // calls to database to retrieve info on three randomly selected students
    function queryAll(data) {

        // ajax call that makes request and returns a promise
        return $.ajax({
            url: '/',
            type: 'get',
            data: data
        });

    }

    // displays data from promise with animation
    function showPromisedData(promise) {

        // http://stackoverflow.com/questions/5316697/jquery-return-data-after-ajax-call-success

        promise.success(function(data) {

            var i = 0;
            var tempData = randomThree;

            // REPLACE WITH ACTUAL DATA

            // display new image for each box
            $('.cadets img').each(function() { 
                
                $(this).attr('src', '/assets/images/students/blogPhoto-' + tempData[i] + '.jpg'); 
                i ++;
            });

            animateStudents();
            
        });

    }

    // displays data from button click with animation
    function showData(data) {

    	var i = 0;

        // REPLACE WITH ACTUAL DATA

        // display new image for each box
        $('.cadets img').each(function() { 
            
            $(this).attr('src', 'http://placeskull.com/35' + i + '/500/cccccc'); 
            i ++;
        });

        animateStudents();
    	
    }

    // animates in student slides
    function animateStudents() {

        // animation of boxes
        TweenMax.staggerFrom('.cadet', 0.5, {
            opacity: 0,
            y: 200
        }, 0.2);

    }

    // creates particle animation FIX THIS
	function getParticlesAnimation() {
        
        //var particlesTimeline = new TimelineLite();
        var particlesTimeline = new TimelineMax({ repeat: -1 });
        var i = 200;
        var radius = $( document ).width() * 0.5;
        var centerX= $( document ).width() * 0.5;
        var centerY = $( document ).height() * 0.5;
        var dots = [];
        var rawDots = [];

        while (--i > -1) {
            var angle = Math.random() * Math.PI * 2;
            var insertionTime = i * 0.015;

            dot = document.createElement('img');
            dot.src = '/assets/images/dot.png';
            dot.id = 'dot' + i;
            dotContainer.append(dot);
            dot.style.cssText = 'position:absolute; left:' + centerX + 'px; top:' + centerY + 'px; width:1px; height:1px;';
            
                 
            particlesTimeline.from(dot, 0.05, {opacity:0, immediateRender:true}, insertionTime);
             
            particlesTimeline.to(dot, .7, {left:Math.cos(angle) * radius + centerX, 
                top:Math.sin(angle) * radius + centerY, 
                width:22, 
                height:22,
                //repeat: -1,
                ease:Cubic.easeIn
            }, insertionTime);
             
        }
        return particlesTimeline;
    }

    // tl.add( getParticlesAnimation()) //add the first particle timeline
	// tl.add( getParticlesAnimation(), 2.5) //add the second particle timeline at a time of 2.5 seconds

});