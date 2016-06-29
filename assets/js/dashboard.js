$(document).ready(
		function() {

			$('.set-numeric').maskMoney({
				thousands : '.',
				decimal : ','
			});
			$('.set-peso').maskMoney({
				thousands : '.',
				decimal : ',',
				precision : 3
			});
			$('.set-integer').maskMoney({
				thousands : '',
				decimal : ''
			});

			// Pesquisa na tabela de dados
			$(function() {
				$(".input-search").keyup(
						function() {
							// pega o css da tabela
							var tabela = $(this).attr('alt');
							if ($(this).val() != "") {
								$("." + tabela + " tbody>tr").hide();
								$(
										"." + tabela + " td:contains-ci('"
												+ $(this).val() + "')").parent(
										"tr").show();
							} else {
								$("." + tabela + " tbody>tr").show();
							}
						});
			});
			$.extend($.expr[":"], {
				"contains-ci" : function(elem, i, match, array) {
					return (elem.textContent || elem.innerText
							|| $(elem).text() || "").toLowerCase().indexOf(
							(match[3] || "").toLowerCase()) >= 0;
				}
			});

			// DEFINE AS CLASSES SELECT2 PARA O PLUGIN
			$('.select2').select2();

			$('.set-date').mask('99/99/9999');
			$('.set-date').datepicker({
				format : 'dd/mm/yyyy'
			})

			function getSiteURL() {
				"use strict";
				return $('#siteURL').val();
			}

			$('.addpeople', '.business', 'undorg').hide();

			// When the Image is hovered upon, show the hidden div using
			// Mouseover
			$('#addpeople').hover(function() {
				$('.addpeople').show();
			}, function() {
				$('.addpeople').hide();
			});

			$('#business').hover(function() {
				$('.business').show();
			}, function() {
				$('.business').hide();
			});

			$('#undorg').hover(function() {
				$('.undorg').show();
			}, function() {
				$('.undorg').hide();
			});

		});