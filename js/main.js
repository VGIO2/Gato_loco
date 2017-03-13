$(document).ready(init);


$('#btn-nombres').on('click', function(){
    
    var player = 1;
    
    $('.square').on('click',function(event){
        
        var squareSelected = $(this);
        if(squareSelected.hasClass('ex')|| squareSelected.hasClass('oh')){
           alert('Este casillero ya esta lleno, escoja otro'); 
        }else{
            if(player===1){
                squareSelected.addClass('ex');
                player = 2;
            }else{
                squareSelected.addClass('oh');
                player = 1;
            }
        }
    })
});


var currentSection = null;

function init()
{
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);

	TweenMax.from($('#saludo h1'), 1, {marginBottom:'0px', ease:Elastic.easeOut});
}
 

function onClickBtnSaludo() {
	gotoSection('nombres');
}

function onClickBtnNombre() {
	gotoSection('juego');
}

function gotoSection(_identificadorDeSeccion)
{
	currentSection.removeClass('visible');
	var nextSection = $('#'+_identificadorDeSeccion);

	nextSection.addClass('visible');

	TweenMax.from(nextSection, 1.5, {scale:0.2, opacity:0, ease:Elastic.easeOut});
	currentSection = nextSection;
}

