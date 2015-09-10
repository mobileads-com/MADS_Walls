
var answers = [];
var solero = 0;
var topten = 0;
var wallscup = 0;
var fruttare = 0;
var ans;

function get_answer(data){
    var answer = data.getAttribute('data-answer');
    answers.push(answer);


    if (answer == 'solero') {
        solero = solero + 1; 
    } else if (answer == 'topten') {
        topten = topten + 1; 
    } else if (answer == 'wallscup') {
        wallscup = wallscup + 1; 
    } else if (answer == 'fruttare') {
        fruttare = fruttare + 1; 
    }
}

function setAnswerMsg(finalAnswer) {
    ans = finalAnswer;
    var result_frame = document.getElementById("result-frame");
    result_frame.className = '';
    result_frame.className = "result-frame " + result[finalAnswer]['class'];
    document.getElementById("result-bubble-text").innerHTML = result[finalAnswer]['bubble_text'];
    document.getElementById("result-caption").innerHTML = result[finalAnswer]['caption'];
    document.getElementById("result-text").innerHTML = result[finalAnswer]['text'];
}

function pickOne() {
    return Math.floor(Math.random() * 2) + 1;
}


var result = new Object();

result['solero'] = {
    class: 'solero',
    bubble_text: 'yee-haa!',
    caption: 'YOU ARE SOLERO!',
    text: 'The Solero is extroverted, quick-thinking, practical, self-confident and very independent minded. They are decisive, opinionated and find it easy to make decisions for themselves as well as others. They never seem to run out of ideas and plans, much like the exciting lime exterior of a Solero. But on the other hand, they are as practical as the delicious vanilla core of a Solero.'
};

result['fruttare'] = {
    class: 'fruttare',
    bubble_text: 'Hi there :)',
    caption: 'YOU ARE Fruttare!',
    text: "The Fruttare is a fun-loving, entertaining and optimistic person. Fruttares are receptive and open to others and build relationships quickly. They are animated, excited and accepting of others. It is not unusual to feel as if you have known the Fruttare person for years after only a few minutes, much like the Fruttare, who is a new addition in the Wall's family."
};

result['wallscup'] = {
    class: 'walls-cup',
    bubble_text: "it's a lovely day!",
    caption: "YOU ARE Wall's CUP!",
    text: "The Wall's Cup is a calm, easy-going person. Wall's Cups are by far the easiest person with which to get along. The Wall's Cup communicates a warm, sincere interest in others preferring to have just a few close friends whom they are very loyal to. They are practical, happy and sweet, just like Wall's Cup!"
};


result['topten'] = {
    class: 'top-ten',
    bubble_text: "Hello!",
    caption: "YOU ARE Top Ten!",
    text: "The Top Ten is well organized; on occasion you may find a Top Ten that keeps things cluttered, however, they know where everything is. The Top Ten is determined to make the right and best decision. If they make a promise the Top Ten will keep it. Top Tens are creative (and sometimes nutty) people. Top Tens can be hard as chocolate on the outside, but soft like vanilla ice cream on the inside."
};

var fburl = new Object();
        
fburl['solero'] = 'https://www.facebook.com/sharer/sharer.php?u=https://rmarepo.richmediaads.com/2754/walls/fb/en/solero.html&title=YOU ARE SOLERO!';
fburl['fruttare'] = 'https://www.facebook.com/sharer/sharer.php?u=https://rmarepo.richmediaads.com/2754/walls/fb/en/fruttare.html&title=YOU ARE Fruttare!';
fburl['wallscup'] = 'https://www.facebook.com/sharer/sharer.php?u=https://rmarepo.richmediaads.com/2754/walls/fb/en/wallscup.html&title=YOU ARE Wall\'s CUP!';
fburl['topten'] = 'https://www.facebook.com/sharer/sharer.php?u=https://rmarepo.richmediaads.com/2754/walls/fb/en/topten.html&title=YOU ARE Top Ten!';

var twurl = new Object();
        
twurl['solero'] = 'https://twitter.com/intent/tweet?original_referer=https://rmarepo.richmediaads.com/2754/walls/fb/en/solero.html&text=YOU ARE SOLERO!&tw_p=tweetbutton&url=https://rmarepo.richmediaads.com/2754/walls/fb/en/solero.html';
twurl['fruttare'] = 'https://twitter.com/intent/tweet?original_referer=https://rmarepo.richmediaads.com/2754/walls/fb/en/fruttare.html&text=YOU ARE Fruttare!&tw_p=tweetbutton&url=https://rmarepo.richmediaads.com/2754/walls/fb/en/fruttare.html';
twurl['wallscup'] = 'https://twitter.com/intent/tweet?original_referer=https://rmarepo.richmediaads.com/2754/walls/fb/en/wallscup.html&text=YOU ARE Wall\'s CUP!&tw_p=tweetbutton&url=https://rmarepo.richmediaads.com/2754/walls/fb/en/wallscup.html';
twurl['topten'] = 'https://twitter.com/intent/tweet?original_referer=https://rmarepo.richmediaads.com/2754/walls/fb/en/topten.html&text=YOU ARE Top Ten!&tw_p=tweetbutton&url=https://rmarepo.richmediaads.com/2754/walls/fb/en/topten.html';

$(document).ready(function(){

    $('.start-eng-button').click(function(){
        $('.start-frame').hide();
        $('.malay-questions').hide();
        $('.english-questions').show();
        $('.frame-2').show();
        $('body').addClass('question-body');

    });


    $('.start-malay-button').click(function(){
        $('.start-frame').hide();
        $('.english-questions').hide();
        $('.malay-questions').show();
        $('.frame-2').show();
        $('body').addClass('question-body');

    });


    $('.answer-text').click(function(){
        var parent = $(this).parent().parent();
        $(parent).addClass('animated slideOutLeft');
     
        setTimeout(function() {
            $(parent).next(parent).addClass('animated slideInRight').show();
        }, 100);
            
        if(answers.length == 6){
            $(parent).hide();
            $('body').removeClass('question-body');
            $('.result-frame').show();

            if (solero > topten && solero > wallscup && solero > fruttare) {
                setAnswerMsg('solero');
            } else if (topten > solero && topten > wallscup && topten > fruttare) {
                setAnswerMsg('topten');
            } else if (wallscup > solero && wallscup > topten && wallscup > fruttare) {
                setAnswerMsg('wallscup');
            } else if (fruttare > solero && fruttare > topten && fruttare > wallscup) {
                setAnswerMsg('fruttare');
            } else {
                if (solero == topten) {
                    var pickedAnswer = ['solero', 'topten'];
                    setAnswerMsg(pickedAnswer[pickOne()]);
                } else if (solero == wallscup) {
                    var pickedAnswer = ['solero', 'wallscup'];
                    setAnswerMsg(pickedAnswer[pickOne()]);
                } else if (solero == fruttare) {
                    var pickedAnswer = ['solero', 'frutarre'];
                    setAnswerMsg(pickedAnswer[pickOne()]);
                } else if (topten == wallscup) {
                    var pickedAnswer = ['topten', 'wallscup'];
                    setAnswerMsg(pickedAnswer[pickOne()]);
                } else if (topten == frutarre) {
                    var pickedAnswer = ['topten', 'fruttare'];
                    setAnswerMsg(pickedAnswer[pickOne()]);
                } else if (wallscup == fruttare) {
                    var pickedAnswer = ['wallscup', 'fruttare'];
                    setAnswerMsg(pickedAnswer[pickOne()]);
                } else {
                    var pickedAnswer = ['solero', 'topten', 'wallscup', 'frutarre'];
                    setAnswerMsg(pickedAnswer[pickOne()]);
                }
            }

        } 
    });

    $('.try-button').click(function(){
        answers = [];
        $('.result-frame').hide();
        $('.start-frame').show();
    });
    
    $('.facebook-button').on('click', function () {
        
        window.open( fburl[ans] );
    });
    
    $('.twitter-button').on('click', function () {

        window.open( twurl[ans] );
    });

});

