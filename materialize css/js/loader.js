$(document).ready(function () {
	$('.modal').modal();
	$('.parallax').parallax();
	$('.sidenav').sidenav();
	$('.slider').slider({ full_width: true });
	$('.parallax').parallax();
	$('.myreviews').carousel({ numVisible: 5, shift: 55, padding: 55 });
});

function toggleModal() {
	var instance = M.Modal.getInstance($('#modal3'));
	instance.open();
}
