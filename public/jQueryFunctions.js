$(document).ready(function(){

    $('#screen, #credits').on('click', function(){
        $('.hamburger').click();
    });

    $('.hamburger').on('click', function(){         
        $top = $(this).children('.top-line');
        $middle = $(this).children('.middle-line');
        $bottom = $(this).children('.bottom-line');

        if($middle.css('opacity')!=0){
            $top.css('top','16px').css( {"transform" : "rotate(45deg)"} );
            $middle.css('width',0).css( "opacity", 0 );
            $bottom.css('top','16px').css( {"transform" : "rotate(-45deg)"} );
            $(this).css( {"transform" : "rotate(180deg)"} );
            $('#screen').fadeIn('slow');
            $('#credits').slideDown('slow'); 
        }else{ 
            $top.css('top','10px').css( {"transform" : "rotate(0deg)"} );
            $middle.css('width','20px').css( "opacity", 1 );
            $bottom.css('top','22px').css( {"transform" : "rotate(0deg)"} );
            $(this).css( {"transform" : "rotate(0deg)"} );
            $('#screen').fadeOut('slow');
            $('#credits').slideUp('slow'); 
        }
    });

})