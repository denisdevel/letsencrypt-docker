var accessToken = "fb19bb33bb904d8798120589364fc0a7";
var baseUrl = "https://api.api.ai/v1/";
var send_to_slack = '';
var messageCycle = 0;
var endofPage = 0;
var firstTimeCaseStudy = 0;
var firstTimeContact = 0;
var contactButNotSubmitted = 0;
var howOftenChatted = 0;
var howOftenTryToContact = 0;

// disable the input field by default

$("#chatbotInputField").hide();

nlp = window.nlp_compromise;

var messages = [], //array that hold the record of each string in chat
    lastUserMessage = "", //keeps track of the most recent input string from the user
    botMessage = "", //var keeps track of what the chatbot is going to say
    botName = 'Grobot', //name of the chatbot
    talking = true; //when false the speach function doesn't work

// Button Meta Data
var introductionButtons = [{ 'id': 'ihaveaQuestionsButton', 'value': 'Story of GRONADE' }, { 'id': 'contactGronade', 'value': 'Contact GRONADE' }, {'id': 'iWantSomeSmalltalk', 'value': "Chitchat with Grobot"}];
var howWeDoiTButtons = [{ 'id': 'tellMeTheProcess', 'value': 'Sure!' }, {'id': 'exitConversation', 'value': "No, I’ve got it"}];
var showMeCaseStudy = [{'id': 'showMeTheCaseStudy', 'value': 'Show me!'}, {'id': 'exitConversation', 'value': "I'm afraid of the future."}];
var iWantToBeTheNewCaseStudy = [{'id': 'iWantToBeCaseStudy', 'value': "Sounds like a plan!"}, {'id': 'exitConversation', 'value': "No,I'm good."}];
var anythingElseButtons = [{'id': 'iWantSomeSmalltalk', 'value': "Speak to Grobot"}, {'id': 'finish', 'value': "That's all, Thanks"}, {'id':'startFromTheBeginning', 'value': 'Start from scratch'}];
var iNeedHelpButtons = [{'id':'startFromTheBeginning', 'value': 'Start from scratch'}, { 'id': 'contactGronade', 'value': 'Contact Gronade' }, {'id': 'continueChatting', 'value': "I'd like to chat more"}];
var alreadyContactedUsButtons = [{'id': 'yesContactAgain', 'value':'YESSSS!!!!'}, {'id':'exitConversation', 'value': 'No, Thank you.'}];
var justRestart = [{'id':'startFromTheBeginning', 'value': 'Start from scratch'}];

function hideAllButtones(){
    $('.theContactForm').hide('slow', function(){ $('.theContactForm').remove(); });
    $('.theContactFormForm').hide('slow', function(){ $('.theContactForm').remove(); });
    $('.tellmeTheProcessButtons').hide('slow', function(){ $('.anythingElse').remove(); });   
    $('.showMeCaseStudyButtons').hide('slow', function(){ $('.showMeCaseStudyButtons').remove(); });
    $('.iwantToBeCaseStudy').hide('slow', function(){ $('.iwantToBeCaseStudy').remove(); });
    $('.alreadyContactedUsButtons').hide('slow', function(){ $('.alreadyContactedUsButtons').remove(); });
}

function yesContactAgain(){
    firstTimeContact = 0;
    $('.alreadyContactedUsButtons').hide('slow', function(){ $('.alreadyContactedUsButtons').remove(); });
    appendtext("Contact again", 1);
    setTimeout(timeOne, 2000);
    setTimeout(timeTwo, 4000);
    // setTimeout(timeThree, 6000);

    function timeOne() {
        appendtext("No worries, go ahead!", 1);
    }

    function timeTwo() {
        contactGronade();
    }
}

function finish(){
    $('.anythingElse').hide('slow', function(){ $('.anythingElse').remove(); });
    appendtext("Goodbye for now.");
    setTimeout(timeOne, 2000);
    setTimeout(timeTwo, 4000);
    setTimeout(timeThree, 6000);

    function timeOne() {
        appendtext("It was nice to virtually meet you, lets do it again some time?", 1);
    }
    function timeTwo() {
        appendAniceGif('https://media.giphy.com/media/3oz8xI3zlSQOMzt3G0/giphy.gif');
    }
    function timeThree() {
        appendMessageAndButtons(justRestart,'justRestart');
    }
}

function startFromTheBeginning(){
    endofPage = 0;

    $('#divFadeout').hide('slow', function(){ 
        $('#divFadeout').html('');
        $('#divFadeout').css("height", "200px");
        $('#divFadeout').show('slow');
     });
    setTimeout(timeOne, 2000);

    function timeOne(){
        welcomeFromChatbot();
    }
}

function exitConversation(){
    hideAllButtones();
    
    appendtext("I'm good for now, thanks!");
    setTimeout(timeOne, 2000);
    setTimeout(timeTwo, 4000);

    function timeOne() {
        appendtext("No problem at all, is there anything else I can help you with?", 1);
    }

    function timeTwo(){
        appendMessageAndButtons(anythingElseButtons, 'anythingElse');
    }

}

function ihaveaQuestionsButton() {
    $('.IntroductionButtons').hide('slow', function(){ $('.IntroductionButtons').remove(); });
    appendtext("So, what’s your story?");
    setTimeout(timeOne, 2000);
    setTimeout(timeOneAdd, 4000);
    setTimeout(timeThree, 8000);
    setTimeout(timeFour, 10000);
    setTimeout(timeFive, 12000);
    setTimeout(timeSix, 14000);

    function timeOne() {
        appendtext("Thought you’d never ask <i class='em em---1'></i>! The problem with the way most organisations use data, is, well, they don’t.", 1);
    }
    function timeOneAdd(){
        appendtext("Well, not to it’s full potential. Data isn’t just for insights and pretty visualisations, you can literally revolutionise your whole industry.", 1);
    }
    function timeThree(){
        appendtext("First, we build a data driven understanding of your challenge, and then creatively layer automation and other sciences to optimise everything from marketing, to your product, and operations.", 1);
    }
    function timeFour(){
        appendtext("We are often hired by enterprise, government and blockchain organisations to develop <a href='https://businessesoftomorrow.com.au/discover/' target='_blank'>killer award-winning</a> solutions through a blend of data science, machine learning and experimentation.", 1);
    }
    function timeFive(){
        appendtext("Want to know how our process works? <i class='em em-smirk'></i>", 1);
    }
    function timeSix(){
        appendMessageAndButtons(howWeDoiTButtons, 'tellmeTheProcessButtons');
    }
}

function tellMeTheProcess() {
    $('.tellmeTheProcessButtons').hide('slow', function(){ $('.tellmeTheProcessButtons').remove(); });
    appendtext("So, how would we engage?");
    setTimeout(timeOne, 2000);
    setTimeout(timeTwo, 4000);
    setTimeout(timeThree, 6000);
    setTimeout(timeFour, 8000);
    setTimeout(timeFive, 10000);
    setTimeout(timeSix, 12000);
    setTimeout(timeSeven, 14000);

    function timeOne() {
        appendtext("Inquisitive as well! You're on <i class='em em-fire'></i>!", 1);
    }
    function timeTwo(){
        appendtext("Well, it all starts with you. Based on your organisation’s challenges or objectives, we’ll do some digging in your data and workshop a solution so good, it’ll be the meat on your innovation bones.", 1);
    }
    function timeThree(){
        appendAniceGif('/assets/images/analy.gif');
    }
    function timeFour(){
        appendtext("It might be a matter of friction reduction through your customer ingestion pipeline, optimising the way people spend money with you, automating customer discovery, or even taking your organisation into the future with artificial intelligence.", 1);
    }
    function timeFive(){
        appendtext("Check out some of our case studies above for a sneak peek.", 1);
    }
    function timeSix(){
        appendtext("Want to be our next case study? <i class='em em-muscle'></i>?", 1);
    }
    function timeSeven(){
        appendMessageAndButtons(iWantToBeTheNewCaseStudy, 'iwantToBeCaseStudy');
    }
}

function showMeTheCaseStudy(){
    $('.showMeCaseStudyButtons').hide('slow', function(){ $('.showMeCaseStudyButtons').remove(); });
    appendtext("<a href='' data-toggle='modal' data-target='#myModal3'>Show me the Case Study!</a>");
    setTimeout(timeOne, 2000);
    setTimeout(timeTwo, 4000);
    setTimeout(timeThree, 6000);

    function timeOne() {
        $('#myModal3').modal('toggle');
    }
    function timeTwo() {
        appendtext("Would you Like to Become the next Case Study <i class='em em-muscle'></i>?", 1);
    }
    function timeThree() {
        appendMessageAndButtons(iWantToBeTheNewCaseStudy, 'iwantToBeCaseStudy');
    }
}

function iWantToBeCaseStudy(){
    $('.iwantToBeCaseStudy').hide('slow', function(){ $('.iwantToBeCaseStudy').remove(); });
    appendtext("I've been waiting for this my whole career <i class='em em-rocket'></i>!")

    setTimeout(timeOne, 2000);
    setTimeout(timeTwo, 4000);
    setTimeout(timeThree, 6000);
    
    function timeOne(){
        appendtext("Nice one  <i class='em em-clap'></i><i class='em em-clap'></i><i class='em em-clap'></i>! Just a few details below and we’re good to go!", 1);
    }
    function timeTwo(){
        appendAniceGif('https://media.giphy.com/media/3ohhwq55fzVRcWouGY/giphy.gif');
    }
    function timeThree(){
        appendContactForm();
    }
}

function sendContacts(){
    $('.ContactInfoSpan').html('');
    $('.loadingCircles').show(300);
    var useremail = $('#contactFormEmail').val();
    var userName = $('#userFormName').val();
    var userCompany = $('#userFormCompany').val();
    if (useremail == '' || userName == '' || userCompany == ''){
        $('.loadingCircles').hide(700);
        $('.ContactInfoSpan').html('<span style="background-color: #5cb85c;">Please fill out the Form Fields</span>').fadeIn("fast");
    } else {

    $.get("https://apilayer.net/api/check?access_key=4076a512155e7866312f3585b7b55c89&email="+ useremail +"&smtp=1&format=1", function(data) {

        if (data['smtp_check'] == true || data['mx_found'] == true){
            howOftenTryToContact++;
            sendToSlack("Name = "+ userName + " // Email = " + useremail + " // Company = " + userCompany);
            $('.loadingCircles').hide(700);
            $('.theContactForm').hide('slow', function(){ $('.theContactForm').remove(); });
            $('.theContactFormForm').hide('slow', function(){ $('.theContactForm').remove(); });
            setTimeout(timeOne, 1000);
            setTimeout(timeTwo, 2000);
            setTimeout(timeThree, 3000);
            setTimeout(timeFour, 8000);
            setTimeout(timeFive, 10000);

            function timeOne(){
                appendtext("Transmission Successful!", 2);
            }
            function timeTwo(){
                appendtext("Thank you!", 1);
            }
            function timeThree(){
                appendAniceGif('https://media.giphy.com/media/l2R0eYcNq9rJUsVAA/giphy.gif');
            }
            function timeFour(){
                appendtext("Sending it off to the team at GRONADE, is there anything else I can do for you?", 1);
            }
            function timeFive(){
                appendMessageAndButtons(anythingElseButtons, 'anythingElse');
            }
        } else {
            $('.loadingCircles').hide(700);
            $('.ContactInfoSpan').html('<span style="background-color: #5cb85c;">Please use a valid Email Address</span>').fadeIn("fast");
        }
    });
    }
}

function continueChatting(){
    iWantSomeSmalltalk();
}

function iWantSomeSmalltalk(){
    if ( $( ".anythingElse" ).length ) {
        $('.anythingElse').hide('slow', function(){ $('.anythingElse').remove(); });   
    }

    if ( $( ".IntroductionButtons" ).length ) {
        $('.IntroductionButtons').hide('slow', function(){ $('.IntroductionButtons').remove(); });
    }
    
    if ( $( ".iNeedHelpButtons" ).length ) {
        $('.iNeedHelpButtons').hide('slow', function(){ $('.iNeedHelpButtons').remove(); });
    }

    if (howOftenChatted == 0){
        howOftenChatted++;
        appendtext("What’s good, Grobot?");
        setTimeout(timeOne, 1000);
        setTimeout(timeTwo, 2000);
        setTimeout(timeThree, 3000);
        setTimeout(timeFour, 4000);

        function timeOne(){
            appendtext("This NLP integration is good <i class='em em-wink'></i>, I see you’re in the mood for small talk!", 1);
        }
        function timeTwo(){
            appendAniceGif('https://media.giphy.com/media/SEre9eirTBgdO/giphy.gif');
        }

        function timeThree(){
            appendtext("Talk to me as if I was your friend, well, a friend that’s from another planet, trying to learn how to communicate (I’m still learning, just take it easy will you?). If you need assistance, just type 'help'.", 1);
        }

        function timeFour(){
            $("#chatbotInputField").show();
            $("#chatbox").focus();
        }
    } else {
        appendtext("More small talk please!!");
        setTimeout(timeOne, 1000);
        setTimeout(timeTwo, 2000);

        function timeOne(){
            appendtext("No worries <i class='em em-beers'></i>, remember to type help if you need anything.", 1);
        }

        function timeTwo(){
            $("#chatbotInputField").show();
            $("#chatbox").focus();
        }
    }   
}

function contactGronade(){

    if (howOftenTryToContact == 0 && contactButNotSubmitted == 0){
        contactButNotSubmitted++;
        $('.IntroductionButtons').hide('slow', function(){ $('.IntroductionButtons').remove(); });
        appendtext("How do I get in touch with GRONADE?");
        setTimeout(timeOne, 1000);
        //setTimeout(timeTwo, 4000);
        setTimeout(timeThree, 2000);
        setTimeout(timeFour, 3000);

        function timeOne(){
            appendtext("Straight to business, I like that", 1);
        }
        function timeThree(){
            appendtext("Just fill in these few fields and we’ll process it internally", 1);
        }
        function timeFour(){
            appendContactForm();
        }
    } else if (howOftenTryToContact == 0 && contactButNotSubmitted != 0){
        $('.IntroductionButtons').hide('slow', function(){ $('.IntroductionButtons').remove(); });
        $('.iNeedHelpButtons').hide('slow', function(){ $('.iNeedHelpButtons').remove(); });

        appendtext("Contact Gronade");
        setTimeout(timeOne, 1000);
        setTimeout(timeTwo, 2000);
        function timeOne(){
            appendtext("We're happy to get in touch with you soon!", 1);
        }
        function timeTwo(){
            appendContactForm();
        }


    } else {
        $('.IntroductionButtons').hide('slow', function(){ $('.IntroductionButtons').remove(); });
        $('.iNeedHelpButtons').hide('slow', function(){ $('.iNeedHelpButtons').remove(); });
        
        appendtext("Contact again");
        setTimeout(timeOne, 1000);
        setTimeout(timeTwo, 2000);
        function timeOne(){
            appendtext("I knew you’d be back!", 1);
        }
        function timeTwo(){
            appendContactForm();
        }
    }
}

function appendMessageAndButtons(buttonValues, afterClickClass) {
    $('#divFadeout').css( "height", "+=40px" );
    var buttonString = "";
    if (1 == 1) {
        var myVar = setTimeout(myTimer, 500);
        $("#divFadeout").append("<p class='col-lg-12 littleWaitingImage' ><img src='https://saltandlighttv.org/images/loading_dots.gif' height='42' width='42'></p>").show(700);

        function myTimer() {
            $('.littleWaitingImage').hide('slow', function(){ $('.littleWaitingImage').remove(); });
            for (i = 0; i < buttonValues.length; i++) {
                buttonString += '<button type="button" class="col-xs-12 col-sm-6 col-centered btn btn-outline-primary additionalChatbotBtnStyle" class="' + buttonValues[i]['id'] + '" onclick="'+ buttonValues[i]['id'] +'()">' + buttonValues[i]['value'] + '</button>&#09;';
                // console.log(buttonValues[i]['id']);
            }
            $("#divFadeout").append("<p class='col-lg-12 "+ afterClickClass +"'><b>Grobot:</b><br>" + buttonString + "</p>").show(1500);
        }
    } else {
        $("#divFadeout").append("<p class='col-lg-12'><b>Grobot:</b> Something Went Wrong</p>").show(800);
    }
    $('#divFadeout').animate({ "scrollTop": $('#divFadeout')[0].scrollHeight }, "slow");
}

function appendContactForm(){
    firstTimeContact++;
    firstTimeCaseStudy++;
    setTimeout(myTimer, 1000);
    setTimeout(setTwo, 2000);
    $("#divFadeout").append("<p class='col-lg-12 littleWaitingImage'><img src='https://saltandlighttv.org/images/loading_dots.gif' height='42' width='42'></p>").show(700);

    function myTimer() {
        $('.littleWaitingImage').hide('slow', function(){ $('.littleWaitingImage').remove(); });
        $("#divFadeout").append(`<p class="col-lg-12 theContactForm"><b>Grobot: </b> 
            <form class="form-horizontal theContactFormForm" role="form">
                <p>Contact Gronade</p>
                <p class="ContactInfoSpan"></p>
                <div class="form-group">
                    <div class="col-sm-6">
                        <input type="text" id="userFormName" placeholder="Full Name" class="form-control" autofocus>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <input type="text" id="userFormCompany" placeholder="Company" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <input type="email" id="contactFormEmail" placeholder="Email" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <button type="button" class="col-xs-12 col-sm-6 col-centered btn btn-outline-primary additionalChatbotBtnStyle contactSubmitBtN" onclick="sendContacts()"><img class="loadingCircles" src="/assets/images/loadingSpinner.gif" style="height: 20px;width: auto;position: absolute;margin-left: -2em;margin-top: .15em; display:none;">Send</button>
                        <button type="button" class="col-xs-12 col-sm-6 col-centered btn btn-outline-primary additionalChatbotBtnStyle contactSubmitBtN" onclick="exitConversation()">Cancel</button><br>
                    </div>
                </div>
                </form></p>`).show(1000);
    }
    function setTwo(){
        $('#divFadeout').animate({ "scrollTop": $('#divFadeout')[0].scrollHeight }, "slow");
    }
}


function appendAniceGif(gifSource) {
    $('#divFadeout').css( "height", "+=50px" );
    $("#divFadeout").append("<p class='col-lg-12'><b>"+botName+": </b><br><img src='" + gifSource + "' style='width: 100%; max-width: 200px; height: auto;'></p>").show(1500);
    // $('#divFadeout').animate({ "scrollTop": $('#divFadeout')[0].scrollHeight }, "slow");
}

function appendtext(message, Grobot) {
    $('#divFadeout').css( "height", "+=35px" );

    if (Grobot == 1) {
        var myVar = setTimeout(myTimer, 1000);
        $("#divFadeout").append("<p class='col-lg-12 littleWaitingImage'><img src='https://saltandlighttv.org/images/loading_dots.gif' height='42' width='42'></p>").show(700);

        function myTimer() {
            $('.littleWaitingImage').hide('slow', function(){ $('.littleWaitingImage').remove(); });
            $("#divFadeout").append("<p class='col-lg-12'><b>" + botName + ":</b> " + message + "</p>").show(1500);
        }
    } else {
        $("#divFadeout").append("<br><p class='hideAParagraph'>" + message + "</p><br><br>").show(1500);
    }
    $('#divFadeout').animate({ "scrollTop": $('#divFadeout')[0].scrollHeight }, "slow");
}

function sendToSlack(text) {
    var mData = new FormData();
    mData.append('token', 'xoxp-4949104943-4949104961-329685683889-96bb3b328998cc283b0ad8029a7e4225');
    mData.append('channel', 'grobot');
    mData.append('text', text);
    mData.append('as_user', 'true');
    var xhr = new XMLHttpRequest();
    xhr.open('POST','https://slack.com/api/chat.postMessage', true);

    // Set up a handler for when the request finishes.
    xhr.onload = function () {
      if (xhr.status === 200) {
        // File(s) uploaded.
      } else {
        alert('An error occurred!');
      }
    };
    xhr.send(mData);
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
    if ('speechSynthesis' in window && talking) {
        var utterance = new SpeechSynthesisUtterance(say);
        speechSynthesis.speak(utterance);
    }
}

function welcomeFromChatbot(){
        if (endofPage <= 0) {
        endofPage++;
        appendtext("Hi, I'm GroBot! Nice to meet you! <i class='em em-v'></i>", 1);
        setTimeout(timeOne, 1500);
        setTimeout(timeTwo, 2200);
        setTimeout(timeThree, 3000);

        function timeOne() {
            // http://gph.is/2fjPO4r
            appendAniceGif('https://media.giphy.com/media/3oz8xueJ3d3LtamgOk/giphy.gif');
        }

        function timeTwo() {
            appendtext("How can I help?", 1);
        }

        function timeThree() {
            appendMessageAndButtons(introductionButtons, 'IntroductionButtons');
        }
    }
}

//runs the keypress() function when a key is pressed

//if the key pressed is 'enter' runs the function newEntry()
$(".widgetToChatbot").click(function() {
    hideAllButtones();
    endofPage++;
    if(firstTimeContact <= 0){
        firstTimeContact++;
        firstTimeCaseStudy++;
        appendContactForm();
    }
});

$(".CaseStudy").click(function() {
    hideAllButtones();
    endofPage++;
    if(firstTimeCaseStudy <= 0){
        firstTimeCaseStudy++;
        firstTimeContact++;
        iWantToBeCaseStudy();
    }
});

$(window).scroll(function() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
        welcomeFromChatbot();
    }
});
document.onkeypress = keyPress;
function keyPress(e) {
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
        //runs this function when enter is pressed
        if (document.getElementById("chatbox").value != "") {
            //pulls the value from the chatbox ands sets it to lastUserMessage
            lastUserMessage = document.getElementById("chatbox").value;
            //sets the chat box to be clear
            document.getElementById("chatbox").value = "";
            appendtext(lastUserMessage, 2);
            // Api.ai implementation
            $.ajax({
                type: "POST",
                url: baseUrl + "query?v=20150910",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + accessToken
                },
                data: JSON.stringify({ query: lastUserMessage, lang: "en", sessionId: "somerandomthing" }),
                success: function(data) {
                    var franks_message = data.result.fulfillment.speech;
                    if (franks_message == 'help'){
                        $('#chatbotInputField').hide();
                        appendtext("More then happy to, how can I help you?", 1);
                        setTimeout(timeOne, 2000);
                        function timeOne(){
                            appendMessageAndButtons(iNeedHelpButtons, 'iNeedHelpButtons');
                        }
                    } else if (franks_message == '') {
                        appendtext("Sorry, I did not understand. Please type 'help' if you'd like to get back to the guided conversation.", 1);
                    } else {
                        appendtext(franks_message, 1);
                    }                    
                },
                error: function() {
                    appendtext("Internal Server Error", 1);
                }
            });

        }
    }
    if (key == 38) {
        console.log('hi')
        //document.getElementById("chatbox").value = lastUserMessage;
    }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
    document.getElementById("chatbox").placeholder = "";
}