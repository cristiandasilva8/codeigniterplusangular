$(document).ready(function() {

	$('.mask-cpf').mask('999.999.999-99');
	$('.mask-cnpj').mask('99.999.999/9999-99');
	$('.mask-cep').mask('99999-999');
	$('.mask-tel').mask('(99) 9999-9999');
	$('.mask-data').mask('99/99/9999');
	$('.mask-semestre').mask('9999-9');
	$('.mask-altura').mask('9.99');

	// $('.set-date').mask('99/99/9999');
	/*
	 * $('.set-date').datepicker({ format : 'dd/mm/yyyy' })
	 */
});

$( ".aviso" ).click(function() {
	$(".aviso").hide(1000);
});

var baseurl_on = "http://glifetool.ideiasprogramadas.com.br/index.php/painel/";
var baseurl_off = "http://localhost/glifetool/index.php/painel/";
$(function() {
	$(".salvarobs").click(function(event) {			
		var id = $(this).closest('div.modal').attr("id");
		var observacao = $(this).closest('div.modal').find(".observacao").val();
		var assinatura = document.getElementById('#sig_'+id).value;
		if(observacao===""){
			observacao = "Não há nenhuma observação";
		}
		var formData = {idpresenca: id, observacao:observacao, assinatura:assinatura};
		$.ajax({
			async: true,
			type : "POST",
			data : formData,
			url : baseurl_off  + "presenca/lancarobservacao/",
			success: function(data){ 
                console.log(data);
            }
			
		});
		//location.reload();
	});
});

$( ".finalizar" ).click(function() {
	var id = {idgl_cronograma: document.getElementById('idgl_cronograma').value};
	$.ajax({
		async: true,
		type : "POST",
		data: id,
		url : baseurl_off  + "presenca/salvar/"
	});
	window.location.reload(true);
});


$(function() {
	$("input[name='presenca']").change(function() {
		var id = {presenca: $(this).closest('tr').find(".presenca").val()};
		url = baseurl_off+"presenca/lancar/";
		$.ajax({
			async: true,
			type : "POST",
			data : id,
			url : url,
		});
	});
});

$(function() {
	$(".excluir-cronograma").click(function(event) {	  
	  var commentContainer = $(this).parent().parent().parent().parent();	  
	 
	  var id = $(this).parent().parent().parent().attr("id");	  
	  
	  commentContainer.slideUp('slow', function() {$(this).remove();});
      
		$.ajax({
			async: true,
			type : "POST",
			url : "gl_cronograma/excluir/" + id,
		});	      
	});
});

// Trigger Points

$(document).ready(function() {
	
	var idpessoa = $('#idpessoa').val();
	var idavaliacao = $('#idavaliacao').val();
	
	var posicoes = new Array();
	var json = "";
	
	base = "http://localhost/glifetool/"
	url = base  + "assets/img/circle.png";
	dataForm = {idpessoa : idpessoa, idavaliacao : idavaliacao}
	if(idpessoa && idavaliacao){
		$.ajax({
			data: dataForm,
			type: "POST",
			url: baseurl_off+ 'avaliacao_trigger_points/getTP/',
	        success: function(Json){ 

	        	$.each(Json, function(idx, obj) {
	        		posicoes.push({"id":obj.left, "left":obj.left, "top":obj.top});
	        		$("<img id='"+ obj.left +"' oncontextmenu='return false' onselectstart='return false'" +
	        		"  style='display:block; position:absolute; left:"+ (obj.left-8) +"px; top:"+(obj.top-8)+"px;' " +
	        		" class='circle'  src = 'http://localhost/glifetool/assets/img/circle.png' >").appendTo($('.imagem'));
	        	});
	        				
	        }
		});	
		
	}

	
    $('#imagem').click(function(e) {

	    var offset = $(this).offset();
	  
	    var posicaoX = e.pageX - offset.left;
	    var posicaoY = e.pageY - offset.top;
	    
	    posicoes.push({"id":posicaoX, "left":posicaoX, "top":posicaoY});
	    console.log(posicoes);
		json = JSON.stringify(posicoes);

		$("<img id='"+ posicaoX +"' oncontextmenu='return false' onselectstart='return false'" +
		"  style='display:block; position:absolute; left:"+ (posicaoX-8) +"px; top:"+(posicaoY-8)+"px;' " +
		" class='circle'  src = 'http://localhost/glifetool/assets/img/circle.png' >").appendTo($('.imagem'));
    });


if (document.addEventListener) {
document.addEventListener('contextmenu', function(e) {
if (e.srcElement.className == 'circle') {
	index = e.srcElement.id;
	
	for (var i = 0; i < posicoes.length; i++){
		if (posicoes[i].id == index) { 
			posicoes.splice(i, 1);
			json = JSON.stringify(posicoes);
			break;
		}
	}
	
	$( e.srcElement ).remove();
	e.preventDefault();
}
}, false);
}

$('#salvarTP').click(function(){
	
	var idpessoa = $('#idpessoa').val();
	var idavaliacao = $('#idavaliacao').val();
	
	dataForm = {json: json, idpessoa : idpessoa, idavaliacao : idavaliacao}
	
	var url = baseurl_off  + "avaliacao_trigger_points/setAvaliacao/";
	$.ajax({
		async: true,
		type : "POST",
		data: dataForm,
		url : url,
		
	});
	console.log(url);
	alert('Trigger Points Salvo com Sucesso');
	location.reload();
	/*
	 * ou pode ser usado para voltar a página anterior
	 * window.history.back(); 
	 */
});

});


















