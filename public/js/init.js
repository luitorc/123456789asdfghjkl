$(document).ready(function() {
	var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    $("#menu1 a").removeClass('active');
    $("#menu1 a[href='"+value+"']").addClass('active');		
});
// function lt_option_select(){
	
// }