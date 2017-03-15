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
                if(whoWin('ex')){
                    alert('Felicidades'+player+'gano');
                }else{
                    player = 2;
                }
                
            }else{
                squareSelected.addClass('oh');
                if(whoWin('oh')){
                    alert('Felicidades'+player+'gano');
                }else{
                    player = 1;
                }
            }
        }
    });
});

function whoWin(symbol){
    if ($('.sq1').hasClass(symbol) && $('.sq2').hasClass(symbol) && $('.sq3').hasClass(symbol)){
     return true;   
    }else if($('.sq4').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq6').hasClass(symbol)){
        return true;
    } else if ($('.sq7').hasClass(symbol) && $('.sq8').hasClass(symbol) && $('.sq9').hasClass(symbol)){
        return true;
    }else if ($('.sq1').hasClass(symbol) && $('.sq4').hasClass(symbol) && $('.sq7').hasClass(symbol)){
     return true;   
    }else if($('.sq2').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq8').hasClass(symbol)){
        return true;
    } else if ($('.sq3').hasClass(symbol) && $('.sq6').hasClass(symbol) && $('.sq9').hasClass(symbol)){
        return true;
    }else if ($('.sq1').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq9').hasClass(symbol)){
        return true;
    }else if ($('.sq3').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq7').hasClass(symbol)){
        return true;
    }else{
        return false;
    }
}






var currentSection = null;
var currentGameID;

function init() {
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
	$('#btn-historial').click(onClickBtnHistorial);
	$('#btn-comentar').click(onClickBtnComentar);

	$('#lista-juegos').on('click', 'button', onClickBtnItemJuego);


	TweenMax.from($('#saludo h1'), 1, {marginBottom: '0px', ease: Elastic.easeOut});
}

function onClickBtnItemJuego(){
	var idGame = $(this).parent().data('idgame');
	console.log(idGame);
	gotoSection('historial-detalle');
	getComentarios(idGame);
	currentGameID = idGame;
	//getSingleGame(idGame);
}

function onClickBtnSaludo() {
	gotoSection('nombres');
}

function onClickBtnNombre() {
	gotoSection('juego');
}

function onClickBtnHistorial(evt) {
	evt.preventDefault();
	gotoSection('historial');
	getHistorial();
}
function onClickBtnComentar(){
	enviarComentario(currentGameID, $('#name').val(), $('#content').val());
}




function enviarComentario(_idGame, _name, _content){
	$.ajax({
		url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'POST',
		data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).success(function(_data){
		console.log(_data);
		getComentarios(_idGame);
	});
}

function gotoSection(_identificadorDeSeccion) {
	currentSection.removeClass('visible');
	var nextSection = $('#' + _identificadorDeSeccion);

	nextSection.addClass('visible');

	TweenMax.from(nextSection, 1.5, {scale: 0.2, opacity: 0, ease: Elastic.easeOut});
	currentSection = nextSection;
}

function getHistorial() {
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games'
	}).success(function (_data) {
		dibujarHistorial(_data);
	});
}

function getSingleGame(_idGame){
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/' + _idGame,
		type:'GET'
	}).success(function(_data){
		console.log(_data);
	});
}

function getComentarios(_idGame){
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'GET'
	}).success(function(_data){
		console.log(_data);
		dibujarComentarios(_data);
	});
}

function dibujarComentarios(_datos){
	var lista = $('#lista-comentarios');
	lista.empty();
	for(var i in _datos)
	{
		var html = '<li class="list-group-item">'+_datos[i].name+' dice: <p>'+ _datos[i].content +'</p></li>';
		lista.append(html);
	}
}

/*function dibujarHistorial(_datos) {
	//console.log(_datos);
	var lista = $('#lista-juegos');

	for (var i in _datos) {
		console.log(_datos[i].winner_player);

		var html = '<li data-idgame="'+ _datos[i].id +'" class="list-group-item">' + _datos[i].winner_player + ' le gano a '+ _datos[i].loser_player +' en ' + _datos[i].number_of_turns_to_win + ' movimientos <button class="btn">Comentar</button></li>';
		lista.append(html);
	}
}*/






















