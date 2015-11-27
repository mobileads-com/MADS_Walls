/*
 *
 * mads - version 2.00.01
 * Copyright (c) 2015, Ninjoe
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://en.wikipedia.org/wiki/MIT_License
 * https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 */
var mads = function () {
    /* Get Tracker */
    if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
        this.custTracker = rma.customize.custTracker;
    } else if (typeof custTracker != 'undefined') {
        this.custTracker = custTracker;
    } else {
        this.custTracker = [];
    }

    /* Unique ID on each initialise */
    this.id = this.uniqId();

    /* Tracked tracker */
    this.tracked = [];

    /* Body Tag */
    this.bodyTag = document.getElementsByTagName('.wrapper')[0];

    /* Head Tag */
    this.headTag = document.getElementsByTagName('head')[0];

    /* RMA Widget - Content Area */
    this.contentTag = document.getElementById('rma-widget');

    /* URL Path */
    this.path = typeof rma != 'undefined' ? rma.customize.src : '';
};

/* Generate unique ID */
mads.prototype.uniqId = function () {
    return new Date().getTime();
};

/* Link Opner */
mads.prototype.linkOpener = function (url) {

    if (typeof url != "undefined" && url != "") {
        if (typeof mraid !== 'undefined') {
            mraid.open(url);
        } else {
            window.open(url);
        }
    }
}

/* tracker */
mads.prototype.tracker = function (tt, type, name, value) {

    /* 
     * name is used to make sure that particular tracker is tracked for only once
     * there might have the same type in different location, so it will need the name to differentiate them
     */
    name = name || type;

    if (typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1) {
        for (var i = 0; i < this.custTracker.length; i++) {
            var img = document.createElement('img');

            if (typeof value == 'undefined') {
                value = '';
            }

            /* Insert Macro */
            var src = this.custTracker[i].replace('{{type}}', type);
            src = src.replace('{{tt}}', tt);
            src = src.replace('{{value}}', value);
            /* */
            img.src = src + '&' + this.id;

            img.style.display = 'none';
            this.bodyTag.appendChild(img);

            this.tracked.push(name);
        }
    }
};

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
    var script = document.createElement('script');
    script.src = js;

    if (typeof callback != 'undefined') {
        script.onload = callback;
    }

    this.headTag.appendChild(script);
}

/* Load CSS File */
mads.prototype.loadCss = function (href) {
    var link = document.createElement('link');
    link.href = href;
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');

    this.headTag.appendChild(link);
};

/*
 *
 * Wall Custom Ad
 *
 */
var walls = function () {
    var app = new mads();

    var answers = [];
    var solero = 0;
    var topten = 0;
    var wallscup = 0;
    var fruttare = 0;
    var ans;
    var language = '_en';

    function get_answer(answer) {
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

        /* Tracker */
        app.tracker('E', 'result' + finalAnswer);

        ans = finalAnswer;
        var result_frame = document.getElementById("result-frame");
        result_frame.className = '';
        result_frame.className = "result-frame " + result[finalAnswer + language]['class'];
        document.getElementById("result-bubble-text").innerHTML = result[finalAnswer + language]['bubble_text'];
        document.getElementById("result-caption").innerHTML = result[finalAnswer + language]['caption'];
        document.getElementById("result-text").innerHTML = result[finalAnswer + language]['text'];
    }

    function pickOne(max) {
        return Math.floor(Math.random() * max);
    }


    var result = {};

    result['solero_en'] = {
        class: 'solero',
        bubble_text: '<img src="images/mly-bubble-01.png"/>',
        caption: 'YOU ARE SOLERO!',
        text: 'The Solero is extroverted, quick-thinking, practical, self-confident and very independent minded. They are decisive, opinionated and find it easy to make decisions for themselves as well as others. They never seem to run out of ideas and plans, much like the exciting lime exterior of a Solero. But on the other hand, they are as practical as the delicious vanilla core of a Solero.'
    };
    result['fruttare_en'] = {
        class: 'fruttare',
        bubble_text: '<img src="images/eng-bubble-02.png"/>',
        caption: 'YOU ARE Fruttare!',
        text: "The Fruttare is a fun-loving, entertaining and optimistic person. Fruttares are receptive and open to others and build relationships quickly. They are animated, excited and accepting of others. It is not unusual to feel as if you have known the Fruttare person for years after only a few minutes, much like the Fruttare, who is a new addition in the Wall's family."
    };
    result['wallscup_en'] = {
        class: 'walls-cup',
        bubble_text: '<img src="images/eng-bubble-01.png"/>',
        caption: "YOU ARE Wall's CUP!",
        text: "The Wall's Cup is a calm, easy-going person. Wall's Cups are by far the easiest person with which to get along. The Wall's Cup communicates a warm, sincere interest in others preferring to have just a few close friends whom they are very loyal to. They are practical, happy and sweet, just like Wall's Cup!"
    };
    result['topten_en'] = {
        class: 'top-ten',
        bubble_text: '<img src="images/mly-bubble-04.png"/>',
        caption: "YOU ARE Top Ten!",
        text: "The Top Ten is well organized; on occasion you may find a Top Ten that keeps things cluttered, however, they know where everything is. The Top Ten is determined to make the right and best decision. If they make a promise the Top Ten will keep it. Top Tens are creative (and sometimes nutty) people. Top Tens can be hard as chocolate on the outside, but soft like vanilla ice cream on the inside."
    };

    /* Malay Version */
    result['solero_bm'] = {
        class: 'solero',
        bubble_text: '<img src="images/mly-bubble-01.png"/>',
        caption: 'ANDA ADALAH SOLERO!',
        text: 'Solero adalah seorang yang mudah menyesuaikan diri, berfikiran pantas, praktikal, yakin diri dan berfikiran terbuka. Mereka penuh dengan idea dan mudah membuat keputusan untuk diri sendiri dan orang lain. Mereka seperti lapisan limau yang menarik di luar Solero. Tetapi pada sudut lain, mereka adalah seorang yang praktikal seperti lapisan teras vanilla yang lazat pada Solero.'
    };
    result['fruttare_bm'] = {
        class: 'fruttare',
        bubble_text: '<img src="images/mly-bubble-03.png"/>',
        caption: 'ANDA ADALAH FRUTTARE!',
        text: "Fruttare adalah seorang yang suka berseronok, banyak aktiviti, mudah mempengaruhi orang lain, berkeyakinan tinggi, peramah dan mudah tersenyum. Tidaklah janggal sekiranya anda berasa seolah–olah telah lama mengenali seorang Fruttare walaupun hanya berjumpa dengannya beberapa minit sahaja. Inilah kelebihan Fruttare, ahli baru di dalam keluarga Wall’s."
    };
    result['wallscup_bm'] = {
        class: 'walls-cup',
        bubble_text: '<img src="images/mly-bubble-02.png"/>',
        caption: "ANDA ADALAH AISKRIM CAWAN WALL'S!",
        text: "Aiskrim Cawan Wall’s adalah seorang yang tenang, mudah bergaul, tidak mudah terasa hati. Aiskrim Cawan Wall’s adalah seorang yang sangat mudah untuk didekati. Aiskrim Cawan Wall’s sangat selesa, ikhlas, lebih gemar memiliki hanya sedikit rakan karib dan mereka sangat setia. Mereka adalah praktikal, gembira dan manis sama seperti Aiskrim Cawan Wall’s!"
    };
    result['topten_bm'] = {
        class: 'top-ten',
        bubble_text: '<img src="images/mly-bubble-04.png"/>',
        caption: "ANDA ADALAH TOP TEN!",
        text: "Top Ten adalah seorang yang sangat teratur, bersungguh-sungguh dalam membuat keputusan dan menepati janji. Top Ten adalah seorang yang sangat kreatif (dan gila–gila) dan setia kepada keluarga serta rakan-rakan. Top Ten boleh menjadi keras seperti coklat di luar, tetapi lembut seperti aiskrim vanilla di dalamnya."
    };

    /* Facebook share url */
    var fburl = {};

    var image_place = window.location.protocol + "//" + window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

    /* English */
    fburl['solero_en'] = {
        name: 'YOU ARE SOLERO!',
        caption: 'The Solero is extroverted, quick-thinking, practical, self-confident and very independent minded. They are decisive, opinionated and find it easy to make decisions for themselves as well as others. They never seem to run out of ideas and plans, much like the exciting lime exterior of a Solero. But on the other hand, they are as practical as the delicious vanilla core of a Solero.',
        image: image_place + '/fb/share_solero.jpg',
        url: 'http://www.walls.com.my'
    };
    fburl['fruttare_en'] = {
        name: 'YOU ARE Fruttare!',
        caption: "The Fruttare is a fun-loving, entertaining and optimistic person. Fruttares are receptive and open to others and build relationships quickly. They are animated, excited and accepting of others. It is not unusual to feel as if you have known the Fruttare person for years after only a few minutes, much like the Fruttare, who is a new addition in the Wall's family.",
        image: image_place + 'fb/share_fruttare_en.jpg',
        url: 'http://www.walls.com.my'
    };
    fburl['wallscup_en'] = {
        name: "YOU ARE Wall's CUP!",
        caption: "The Wall's Cup is a calm, easy-going person. Wall's Cups are by far the easiest person with which to get along. The Wall's Cup communicates a warm, sincere interest in others preferring to have just a few close friends whom they are very loyal to. They are practical, happy and sweet, just like Wall's Cup!",
        image: image_place + 'fb/share_walls_cup_en.jpg',
        url: 'http://www.walls.com.my'
    };
    fburl['topten_en'] = {
        name: "YOU ARE Top Ten!",
        caption: "The Top Ten is well organized; on occasion you may find a Top Ten that keeps things cluttered, however, they know where everything is. The Top Ten is determined to make the right and best decision. If they make a promise the Top Ten will keep it. Top Tens are creative (and sometimes nutty) people. Top Tens can be hard as chocolate on the outside, but soft like vanilla ice cream on the inside.",
        image: image_place + 'fb/share_top_ten.jpg',
        url: 'http://www.walls.com.my'
    };
    /* Malay */
    fburl['solero_bm'] = {
        name: 'ANDA ADALAH SOLERO!',
        caption: 'Solero adalah seorang yang mudah menyesuaikan diri, berfikiran pantas, praktikal, yakin diri dan berfikiran terbuka. Mereka penuh dengan idea dan mudah membuat keputusan untuk diri sendiri dan orang lain. Mereka seperti lapisan limau yang menarik di luar Solero. Tetapi pada sudut lain, mereka adalah seorang yang praktikal seperti lapisan teras vanilla yang lazat pada Solero.',
        image: image_place + 'fb/share_solero.jpg',
        url: 'http://www.walls.com.my'
    };
    fburl['fruttare_bm'] = {
        name: 'ANDA ADALAH FRUTTARE!',
        caption: "Fruttare adalah seorang yang suka berseronok, banyak aktiviti, mudah mempengaruhi orang lain, berkeyakinan tinggi, peramah dan mudah tersenyum. Tidaklah janggal sekiranya anda berasa seolah–olah telah lama mengenali seorang Fruttare walaupun hanya berjumpa dengannya beberapa minit sahaja. Inilah kelebihan Fruttare, ahli baru di dalam keluarga Wall’s.",
        image: image_place + 'fb/share_fruttare_bm.jpg',
        url: 'http://www.walls.com.my'
    };
    fburl['wallscup_bm'] = {
        name: "ANDA ADALAH AISKRIM CAWAN WALL'S!",
        caption: "Aiskrim Cawan Wall’s adalah seorang yang tenang, mudah bergaul, tidak mudah terasa hati. Aiskrim Cawan Wall’s adalah seorang yang sangat mudah untuk didekati. Aiskrim Cawan Wall’s sangat selesa, ikhlas, lebih gemar memiliki hanya sedikit rakan karib dan mereka sangat setia. Mereka adalah praktikal, gembira dan manis sama seperti Aiskrim Cawan Wall’s!",
        image: image_place + 'fb/share_walls_cup_bm.jpg',
        url: 'http://www.walls.com.my'
    };
    fburl['topten_bm'] = {
        name: "ANDA ADALAH TOP TEN!",
        caption: "Top Ten adalah seorang yang sangat teratur, bersungguh-sungguh dalam membuat keputusan dan menepati janji. Top Ten adalah seorang yang sangat kreatif (dan gila–gila) dan setia kepada keluarga serta rakan-rakan. Top Ten boleh menjadi keras seperti coklat di luar, tetapi lembut seperti aiskrim vanilla di dalamnya.",
        image: image_place + 'fb/share_top_ten.jpg',
        url: 'http://www.walls.com.my'
    };


    /* Twitter share url */
    var twurl = {};
    /* English */
    twurl['solero_en'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1K0Lejd&text=YOU ARE SOLERO!&tw_p=tweetbutton&url=http://bit.ly/1K0Lejd';
    twurl['fruttare_en'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1Nl5WMQ&text=YOU ARE FRUTTARE!&tw_p=tweetbutton&url=http://bit.ly/1Nl5WMQ';
    twurl['wallscup_en'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1K0LcIf&text=YOU ARE WALL\'S CUP!&tw_p=tweetbutton&url=http://bit.ly/1K0LcIf';
    twurl['topten_en'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1iB1uhM&text=YOU ARE TOP TEN!&tw_p=tweetbutton&url=http://bit.ly/1iB1uhM';
    /* Malay */
    twurl['solero_bm'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1UKqMpw&text=ANDA ADALAH SOLERO!&tw_p=tweetbutton&url=http://bit.ly/1UKqMpw';
    twurl['fruttare_bm'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1Q552DF&text=ANDA ADALAH FRUTTARE!&tw_p=tweetbutton&url=http://bit.ly/1Q552DF';
    twurl['wallscup_bm'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1ER9dlY&text=ANDA ADALAH AISKRIM CAWAN WALL\'S!&tw_p=tweetbutton&url=http://bit.ly/1ER9dlY';
    twurl['topten_bm'] = 'https://twitter.com/intent/tweet?original_referer=http://bit.ly/1KdZgza&text=ANDA ADALAH TOP TEN!&tw_p=tweetbutton&url=http://bit.ly/1KdZgza';

    app.loadJs('js/jquery-1.11.3.min.js', function () {
        if (typeof window.jQuery != 'undefined') {
            (function ($) {
                $(app.contentTag).load('tpl/index.html', function () {
                    $('.start-eng-button').click(function () {
                        /* Tracker */
                        app.tracker('E', 'startenglish');

                        language = '_en';
                        $('.start-frame').hide();
                        $('.malay-questions').hide();
                        $('.english-questions').show();
                        $('.frame-2').show();
                        $('.result-button-bm').hide();
                        $('.result-button-en').show();
                        $('.wrapper').addClass('question-body');
                    });


                    $('.start-malay-button').click(function () {

                        /* Tracker */
                        app.tracker('E', 'startmalay');

                        language = '_bm';
                        $('.start-frame').hide();
                        $('.english-questions').hide();
                        $('.malay-questions').show();
                        $('.frame-2').show();
                        $('.result-button-en').hide();
                        $('.result-button-bm').show();
                        $('.wrapper').addClass('question-body');

                    });

                    var ans_text = function () {
                        $('.answer-text').off();

                        var answer = $(this).data('answer');
                        get_answer(answer);

                        var parent = $(this).parent().parent();
                        $(parent).addClass('animated slideOutLeft');

                        setTimeout(function () {
                            $(parent).next(parent).addClass('animated slideInRight').show();
                        }, 100);

                        setTimeout(function () {
                            $('.answer-text').on('click', ans_text);
                        }, 1000);

                        if (answers.length == 6) {
                            $(parent).hide();
                            $('.wrapper').removeClass('question-body').addClass('lastframe');
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
                                if (solero == topten && solero != 0) {
                                    var pickedAnswer = ['solero', 'topten'];
                                    setAnswerMsg(pickedAnswer[pickOne(pickedAnswer.length)]);
                                } else if (solero == wallscup && solero != 0) {
                                    var pickedAnswer = ['solero', 'wallscup'];
                                    setAnswerMsg(pickedAnswer[pickOne(pickedAnswer.length)]);
                                } else if (solero == fruttare && solero != 0) {
                                    var pickedAnswer = ['solero', 'fruttare'];
                                    setAnswerMsg(pickedAnswer[pickOne(pickedAnswer.length)]);
                                } else if (topten == wallscup && topten != 0) {
                                    var pickedAnswer = ['topten', 'wallscup'];
                                    setAnswerMsg(pickedAnswer[pickOne(pickedAnswer.length)]);
                                } else if (topten == fruttare && topten != 0) {
                                    var pickedAnswer = ['topten', 'fruttare'];
                                    setAnswerMsg(pickedAnswer[pickOne(pickedAnswer.length)]);
                                } else if (wallscup == fruttare && wallscup != 0) {
                                    var pickedAnswer = ['wallscup', 'fruttare'];
                                    setAnswerMsg(pickedAnswer[pickOne(pickedAnswer.length)]);
                                } else {
                                    var pickedAnswer = ['solero', 'topten', 'wallscup', 'fruttare'];
                                    setAnswerMsg(pickedAnswer[pickOne(pickedAnswer.length)]);
                                }
                            }

                        }
                    };


                    $('.answer-text').on('click', ans_text);

                    $('.try-button').click(function () {
                        /* Tracker */
                        app.tracker('E', 'tryagain');

                        answers = [];

                        solero = 0;
                        topten = 0;
                        wallscup = 0;
                        fruttare = 0;

                        $('.question-frame').removeClass('animated slideInRight slideOutLeft').hide();

                        $('.result-frame').hide();
                        $('.start-frame').show();
                    });

                    $('.facebook-button').on('click', function () {

                        /* Tracker */
                        app.tracker('E', 'facebook');

                        app.linkOpener('https://www.facebook.com/dialog/feed?app_id=1168146013199372&display=popup&name=' + fburl[ans + language].name + '&caption=www.walls.com.my&description=' + fburl[ans + language].caption + '&link=http%3A%2F%2Fwalls.com.my%2Fwalls%2F&picture=' + fburl[ans + language].image + '&redirect_uri=http%3A%2F%2Fwalls.com.my%2Fwalls%2F');
                    });

                    $('.twitter-button').on('click', function () {

                        /* Tracker */
                        app.tracker('E', 'twitter');

                        app.linkOpener(twurl[ans + language]);
                    });

                    $('.landing-page').on('click', function () {

                        /* Tracker */
                        app.tracker('CTR', 'site');

                        app.linkOpener('http://www.walls.com.my/walls/');
                    });
                });


            })(jQuery);
        }
    });

    app.loadCss('css/style.css');
    app.loadCss('css/custom.css');

    //app.custTracker = ['http://www.tracker.com?type={{type}}&tt={{tt}}','http://www.tracker2.com?type={{type}}'];
    //
    //app.tracker('CTR', 'test');
    //app.tracker('E','test','name');

    //app.linkOpener('http://www.google.com');
};

var w = new walls();