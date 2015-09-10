
var answers = [];

function get_answer(data){
    var answer = data.getAttribute('data-answer');
    answers.push(answer);

    var count = answers.length;
    if(count == 6){

        var counts = {};

        for(var i=0;i< answers.length; i++)
        {
            var key = answers[i];
            counts[key] = (counts[key])? counts[key] + 1 : 1 ;
        }
    }
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

$(document).ready(function(){

    function footerOnTop (indicator) {
        if (window.innerWidth < 360 || window.innerHeight < 430) {
            if (indicator === true) {
                $('.wrapper .footer').css('top', '2px');
                $('.wrapper .question-box').css('padding', '116px 21px 0');
            } else {
                $('.wrapper .footer').css('top', '');
                $('.wrapper .question-box').css('padding', '96px 21px 0');
            }
        }
    }

    $('.start-eng-button').click(function(){
        $('.start-frame').hide();
        $('.malay-questions').hide();
        $('.english-questions').show();
        $('.frame-2').show();
        $('body').addClass('question-body');

        footerOnTop(true);
    });


    $('.start-malay-button').click(function(){
        $('.start-frame').hide();
        $('.english-questions').hide();
        $('.malay-questions').show();
        $('.frame-2').show();
        $('body').addClass('question-body');

        footerOnTop(true);
    });


    $('.answer-text').click(function(){
        var parent = $(this).parent().parent();

        if(answers.length == 6){
            $(parent).hide();
            footerOnTop(false);
            $('body').removeClass('question-body');
            $('.result-frame').show();

            var rand_result = ['solero', 'fruttare', 'wallscup', 'topten'];
            var rand = Math.floor(Math.random() * rand_result.length);
            rand = rand_result[rand];

            var result_frame = document.getElementById("result-frame");
            result_frame.className = '';
            result_frame.className = "result-frame " + result[rand]['class'];
            document.getElementById("result-bubble-text").innerHTML = result[rand]['bubble_text'];
            document.getElementById("result-caption").innerHTML = result[rand]['caption'];
            document.getElementById("result-text").innerHTML = result[rand]['text'];
        } else {
        
            $(parent).addClass('animated slideOutLeft');
            setTimeout(function() {
                $(parent).hide();
                $(parent).next(parent).addClass('animated slideInRight').show();

            }, 700);

        }
    });

    $('.try-button').click(function(){
        answers = [];
        $('.result-frame').hide();
        $('.start-frame').show();
    });

});

