// Wait for DOM to Load
jQuery(function($) {

    var tl = new TimelineMax();
    var dotContainer = $('.cadets');
    var socket = io();
    var cycleInterval = null;
    var idleTimer = null;
    var randomThree;
    var promise;
    var designerData = [];
    var developerData = [];
    //var studentData = [{"id":"1","studentName":"Ariel Gelbard","title":"Developer","position":"Mobile Developer","bio":"","url":"http:\/\/arielgelbard.com","logo":"","image":"5"},{"id":"2","studentName":"Jesse \"Batman\" Sinfield","title":"Developer","position":"Front-End Developer","bio":"I am a front end developer in Toronto, Ontario with a focus on forward thinking and efficiency. All my life I?ve had a critical eye when it comes to the web and now I?m able to use that and do my best to make the web a better place. My specialities lie in HTML and CSS but I?m also fluent in javaScript and have a strong interest in WordPress.","url":"http:\/\/jessesinfield.com","logo":"http:\/\/jessesinfield.com\/assets\/images\/Logo.png","image":"2"},{"id":"3","studentName":"Andres Hernandez","title":"Designer","position":"Interactive Designer","bio":"An interactive designer who enjoys to keep things simple, simplicity is key when it comes to design. I enjoy creating things that are visually appealing to the eye.","url":"http:\/\/andhez.com","logo":"http:\/\/andhez.com\/portfolio\/images\/logo.png","image":"9"},{"id":"4","studentName":"Emerson Stewart","title":"Developer","position":"iOS Developer","bio":"I'm an iOS application developer from Toronto. I was brought up on a farm in mid-western Ontario, but when I wasn't doing farm things, I developed a huge passion for programming and technology in general. I love building awesome stuff, so let's build something together!","url":"http:\/\/emersongstewart.com","logo":"","image":"11"},{"id":"5","studentName":"Dylon Alkerton","title":"Designer","position":"Designer","bio":"Im a designer with a background in traditional art. I strive to create clean and elegant web designs.","url":"http:\/\/dylonalkerton.com","logo":"","image":"1"},{"id":"6","studentName":"Priscilla Cunningham","title":"Designer","position":"Designer","bio":"","url":"http:\/\/priscillatheresa.com","logo":"","image":"0"},{"id":"7","studentName":"James McGaghey","title":"Developer","position":"Web Developer","bio":"I enjoy all forms of web development weither it's front-end, back-end or mobile. I have also developed a passion for physical prototyping with arduino.","url":"http:\/\/jamesmcgaghey.com","logo":"http:\/\/www.jamesmcgaghey.com\/images\/logo.png","image":"14"},{"id":"8","studentName":"Leah de Vries","title":"Designer","position":"UX, UI Interactive Designer","bio":"","url":"http:\/\/leahdevries.com","logo":"","image":"17"},{"id":"9","studentName":"Will Du","title":"Designer","position":"Interactive Designer","bio":"","url":"http:\/\/willduart.com","logo":"http:\/\/willduart.com\/assets\/images\/logo-main.svg","image":"20"},{"id":"10","studentName":"Dustin Gamble","title":"Designer","position":"Interactive Designer","bio":"Ich mag das Zeug gut fur alle Orte visuell und sauber in der Anwendung zu machen","url":"http:\/\/dustingamble.ca","logo":"","image":"4"},{"id":"11","studentName":"Lana Milley","title":"Designer","position":"Interactive Designer","bio":"I have a passion for clarity and perfection in design, creating accessible and visually appealing user interfaces, unique illustrations, and discovering new interactive innovations.","url":"http:\/\/lanamilley.com","logo":"http:\/\/lanamilley.com\/images\/logo118.svg","image":"22"},{"id":"12","studentName":"Elicia Durtnall","title":"Designer","position":"UX Designer","bio":"","url":"http:\/\/elicia-durtnall.com","logo":"","image":"12"},{"id":"13","studentName":"Moin Patel","title":"Designer","position":"Interactive Designer","bio":"Hi there, I'm Moin. I'm a Interactive designer from Toronto. I have a passion for modern design and an understanding of the importance of good user experience. I enjoy making things look good and I love making them work.","url":"http:\/\/mpcreative.ca","logo":"http:\/\/mpcreative.ca\/site-webd252\/wp-content\/themes\/portfolio-theme\/images\/logo.png","image":"18"},{"id":"14","studentName":"Tristan Darwent","title":"Developer","position":"Interactive Developer","bio":"Trapped in spreadsheet factory, send help","url":"http:\/\/tristandarwent.com","logo":"","image":"16"},{"id":"15","studentName":"Eduard Kachan","title":"Developer","position":"Front-End Developer","bio":"","url":"http:\/\/edvaard.ca","logo":"","image":"13"},{"id":"16","studentName":"Stefano Lombardo","title":"Designer","position":"Interactive Designer","bio":"I'm a designer that likes to...well...design stuff","url":"http:\/\/www.stefanol.com","logo":"http:\/\/www.stefanol.com\/wp-content\/themes\/portfolio\/images\/logoImages\/stefLogo.png","image":"3"},{"id":"17","studentName":"Hemachandra Dewamuni","title":"Developer","position":"Front-End Developer","bio":"","url":"http:\/\/lassna.com","logo":"","image":"6"},{"id":"18","studentName":"Fatemah Manji","title":"Designer","position":"Interactive Designer","bio":"","url":"http:\/\/fatemahmanji.com","logo":"http:\/\/fatemahmanji.com\/portfolio\/images\/logos\/logo.svg","image":"7"},{"id":"19","studentName":"Tanya Grimes","title":"Developer","position":"Full Stack Developer","bio":"Hello! I'm Tanya. I like to make the back end communicate with the front. It's fun to make ends meet.","url":"http:\/\/tanyargrimes.com","logo":"","image":"8"},{"id":"20","studentName":"Emmanuel Amponsah","title":"Designer","position":"Front-End Developer","bio":"I am a Front end Web Developer with a passion for branding and identity design. I admire the intricacies behind design, but I like to show off my technical side through semi-complex web apps.","url":"http:\/\/eamponsah.com","logo":"","image":"10"},{"id":"21","studentName":"Katelyn Chrissikos","title":"Designer","position":"Designer","bio":"","url":"","logo":"","image":"21"}];
    var studentData = [
        {"id":"5","studentName":"Dylon Alkerton","title":"Designer","position":"Designer","image":"1"},
        {"id":"2","studentName":"Jesse \"Batman\" Sinfield","title":"Developer","position":"Front-End Developer","image":"2"},
        {"id":"16","studentName":"Stefano Lombardo","title":"Designer","position":"Interactive Designer","image":"3"},
        {"id":"10","studentName":"Dustin Gamble","title":"Designer","position":"Interactive Designer","image":"4"},
        {"id":"1","studentName":"Ariel Gelbard","title":"Developer","position":"Mobile Developer","image":"5"},
        {"id":"17","studentName":"Hemachandra Dewamuni","title":"Developer","position":"Front-End Developer","image":"6"},
        {"id":"18","studentName":"Fatemah Manji","title":"Designer","position":"Interactive Designer","image":"7"},
        {"id":"19","studentName":"Tanya Grimes","title":"Developer","position":"Full Stack Developer","image":"8"},
        {"id":"3","studentName":"Andres Hernandez","title":"Designer","position":"Interactive Designer","image":"9"},
        {"id":"20","studentName":"Emmanuel Amponsah","title":"Designer","position":"Front-End Developer","image":"10"},
        {"id":"4","studentName":"Emerson Stewart","title":"Developer","position":"iOS Developer","image":"11"},
        {"id":"12","studentName":"Elicia Durtnall","title":"Designer","position":"UX Designer","image":"12"},
        {"id":"15","studentName":"Eduard Kachan","title":"Developer","position":"Front-End Developer","image":"13"},
        {"id":"7","studentName":"James McGaghey","title":"Developer","position":"Web Developer","image":"14"},
        {"id":"14","studentName":"Tristan Darwent","title":"Developer","position":"Interactive Developer","image":"16"},
        {"id":"8","studentName":"Leah de Vries","title":"Designer","position":"Interactive Designer","image":"17"},
        {"id":"13","studentName":"Moin Patel","title":"Designer","position":"Interactive Designer","image":"18"},
        {"id":"9","studentName":"Will Du","title":"Designer","position":"Interactive Designer","image":"20"},
        {"id":"21","studentName":"Katelyn Chrissikos","title":"Designer","position":"Designer","image":"21"},
        {"id":"11","studentName":"Lana Milley","title":"Designer","position":"Interactive Designer","image":"22"},
        {"id":"6","studentName":"Priscilla Cunningham","title":"Designer","position":"Designer","image":"23"}
    ];



    // create arrays for designers and developers
    for(var i = 0; i < studentData.length; i++) {

        // if(studentData[i].title.toUpperCase() === 'DEVELOPER') {
        //     developerData.push(studentData[i]);
        // }

        // if(studentData[i].title.toUpperCase() === 'DESIGNER') {
        //     designerData.push(studentData[i]);
        // }

        // to accommodate hybrids
        switch (studentData[i].title.toUpperCase()) {
            case 'DEVELOPER':
                developerData.push(studentData[i]);
                break;
            case 'DESIGNER':
                designerData.push(studentData[i]);
                break;
            default:
                developerData.push(studentData[i]);
                designerData.push(studentData[i]);
        }

    }
    //console.log(designerData, developerData);

    // listen for event connected to pass all data
    socket.on('showAll', function(data){

        console.log(data.results);

        getRandomStudents();

        clearAndReset();

    });

    // listen for event connected to pass developer data
    socket.on('showDev', function(data){

        console.log(data.results);

        getRandomDevelopers();

        clearAndReset();

    });

    // listen for event connected to pass designer data
    socket.on('showDes', function(data){

        console.log(data.results);

        getRandomDesigners();

        clearAndReset();

    });


    // initial declaration to start cycling through all students
    // set up interval to randomly display images that can be paused/canceled on button click
    cycleInterval = setInterval( function() {

        getRandomStudents();

    }, 10000);


    function resetInterval() {

        // set up interval to randomly display images that can be paused/canceled on button click
        cycleInterval = setInterval( function() {

            getRandomStudents();

        }, 10000);

    }

    // generates three students by id randomly
    function generateRandomPositions(filter) {

        var dataLength;
        randomThree = [];

        switch (filter) {

            case 2:
                dataLength = developerData.length;
                break;
            case 3:
                dataLength = designerData.length;
                break;
            case 1: default:
            dataLength = studentData.length;
        }

        while ( randomThree.length < 3 ){

            //CHANGE TO PROPER NUMBER INSTEAD OF 21
            var randomNumber = Math.floor( Math.random() * dataLength );
            var found = false;

            for ( var i = 0; i < randomThree.length; i++ ){
                if ( randomThree[i] == randomNumber ) {
                    found = true;
                    break;
                }
            }

            if ( !found )
                randomThree[randomThree.length] = randomNumber;
        }

        console.log(randomThree);

        return randomThree;
    }

    function getRandomStudents() {
        randomThree = generateRandomPositions(1);
        randomStudents = [];

        // get a promise of info retrieved from database query of all students
        // promise = queryAll(randomThree);
        // showPromisedData(promise);

        for(var i = 0; i < studentData.length; i++) {
            for (var j = 0; j < randomThree.length; j++) {
                if(i === randomThree[j]) {
                    randomStudents.push(studentData[i]);
                }
            }
        }

        showData(randomStudents);
    }

    function getRandomDevelopers() {
        randomThree = generateRandomPositions(2);
        randomDevelopers = [];

        // get a promise of info retrieved from database query of all students
        // promise = queryAll(randomThree);
        // showPromisedData(promise);

        for(var i = 0; i < developerData.length; i++) {
            for (var j = 0; j < randomThree.length; j++) {
                if(i === randomThree[j]) {
                    randomDevelopers.push(developerData[i]);
                }
            }
        }

        showData(randomDevelopers);
    }

    function getRandomDesigners() {
        randomThree = generateRandomPositions(3);
        randomDesigners = [];

        // get a promise of info retrieved from database query of all students
        // promise = queryAll(randomThree);
        // showPromisedData(promise);

        for(var i = 0; i < designerData.length; i++) {
            for (var j = 0; j < randomThree.length; j++) {
                if(i === randomThree[j]) {
                    randomDesigners.push(designerData[i]);
                }
            }
        }

        showData(randomDesigners);
    }

    function clearAndReset() {

        // kill all intervals and timers
        if ( cycleInterval != null )
            clearInterval(cycleInterval);

        if ( idleTimer != null )
            clearTimeout(idleTimer);

        // set timer to start cycleInterval
        idleTimer = setTimeout( function() {
            resetInterval();
        }, 10000);

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
        // $('.cadets img').each(function() { 

        //     $(this).attr('src', '/assets/images/students/blogPhoto-' + data[i] + '.jpg'); 
        //     i ++;
        // });

        // display new image for each box
        $('section').each(function() {

            //if (data[i].image == 0) {
            //$('img', this).attr('src', 'http://placeskull.com/353/500/cccccc');
            //}
            //else {
            $('img', this).attr('src', '/assets/images/students/' + data[i].image + '.png');
            //}

            $('h1', this).html(data[i].studentName);
            $('h2', this).html(data[i].position);

            $('.yellow_1', this).attr('style', 'animation-duration: ' + (1 + Math.random() * 1) + 's');
            $('.yellow_2', this).attr('style', 'animation-duration: ' + (1 + Math.random() * 1) + 's');
            $('.red_1', this).attr('style', 'animation-duration: ' + (2 + Math.random() * 2) + 's');
            $('.red_2', this).attr('style', 'animation-duration: ' + (2 + Math.random() * 2) + 's');

            console.log(data[i].studentName + ': ' + data[i].title);
            //console.log($('.info h2', this).html());
            //console.log($('.info h3', this).html());

            i++;
        });

        animateStudents();

    }

    // animates in student slides
    function animateStudents() {

        // animation of boxes
        TweenMax.staggerFrom('section', 0.5, {
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