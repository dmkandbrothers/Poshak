var $ = jQuery;

jQuery(document).ready(function($) {  

    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });

});

// Setting up Video

var $ = jQuery;
var vidWidth = $(window).width(), vidHeight = $(window).height();

$("#video-wrap").css({
    
    'height': vidHeight
});

$('#video').videoBG({
    mp4:'assets/bg.mp4',
    ogv:'assets/bg.ogv',
    webm:'assets/bg.webm',
    poster:'assets/poster.jpg',
    scale:true,
    zIndex:0,
    height: vidHeight
});

// Navbar fixing

$("#nav-menu").stick_in_parent()


// Calling Wow

new WOW().init();


// Count Down Timer

$('.countdown').final_countdown({
    start : 1360000000, //Here use Milisecond. To convert your time you can go to this(https://currentmillis.com/) website. 
    end   : 1390000000,
    now : 1385000000,
seconds: {
borderColor: '#5677fc',
borderWidth: '3'
},
minutes: {
    borderColor: '#7e57c2',
    borderWidth: '3'
},
hours: {
    borderColor: '#4db6ac',
    borderWidth: '3'
},
days: {
    borderColor: '#d81b60',
    borderWidth: '3'
}}, function() {
});


// rotating text

(function() {
    const quotes = $(".quotes");
    let quoteIndex = -1;

    function showNextQuote() {
        console.log("showNextQuote called. Current quote index:", quoteIndex);
        
        // Hide all quotes first
        quotes.fadeOut(1000, function() {
            console.log("All quotes are hidden.");
        });

        // Update the index for the next quote
        quoteIndex = (quoteIndex + 1) % quotes.length;
        console.log("Next quote index:", quoteIndex);

        // Show the next quote
        quotes.eq(quoteIndex).fadeIn(1000, function() {
            console.log("Next quote is shown:", quotes.eq(quoteIndex).text());

            // After showing the quote, wait for 1 second before fading it out
            setTimeout(function() {
                console.log("Fading out quote:", quotes.eq(quoteIndex).text());
                quotes.eq(quoteIndex).fadeOut(1000, showNextQuote);
            }, 1000);
        });
    }

    // Ensure that quotes are visible after countdown removal
    quotes.show();  // Add this line to ensure quotes are displayed

    // Start the quote animation
    showNextQuote();
})();




// smooth mouse wheel
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


/*------------------------------------------
 Subscribe form ajax
 ------------------------------------------*/


$('#subscribe-form').submit(function(e) {

    e.preventDefault();
    var $form           = $('#subscribe-form');
    var submit          = $('#subscribe-button');
    var ajaxResponse    = $('#subscription-response');
    var email           = $('#subscriber-email').val();

    $.ajax({
        type: 'POST',
        url: 'php/subscribe.php',
        dataType: 'json',
        data: {
            email: email
        },
        cache: false,
        beforeSend: function(result) {
            submit.val("Joining...");
        },
        success: function(result) {
            if(result.sendstatus == 1) {
                ajaxResponse.html(result.message);
                $form.fadeOut(500);
            } else {
                ajaxResponse.html(result.message);
                submit.val("Join");
            }
        }
    });

});