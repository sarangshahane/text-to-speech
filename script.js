
(function($){
	
	var load_SpeechRecognition_library = {

		recognition: null,

		init:function(){
			
			window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

			// Create the instance of the SppedRecognitation class/library.
			 recognition = new SpeechRecognition();

			recognition.interimResults = true;
			recognition.lang = "en-IN";

			let p = document.createElement("p");
			const words = document.querySelector(".notepad-page");
			words.appendChild(p);

			recognition.addEventListener("result", (e) => {
			  const transcript = Array.from(e.results)
			    .map((result) => result[0])
			    .map((result) => result.transcript)
			    .join("");

			  p.textContent = transcript;
			  if (e.results[0].isFinal) {
			    p = document.createElement("p");
			    words.appendChild(p);
			  }
			});

			recognition.addEventListener("end", recognition.start);
			recognition.start();
			
		},
		
		start_talking: function(){

			$(document).on( 'click', '.action-buttons .mic-on', function(e) {
				e.preventDefault();
				recognition.start();
				$('.action-buttons .btn-floating.mic-on').hide();
				$('.action-buttons .btn-floating.mic-off').css('display', 'inline-block');
			});
		},

		stop_talking: function(){
			$(document).on( 'click', '.action-buttons .mic-off', function(e) {
				e.preventDefault();
				recognition.abort();
				$('.action-buttons .btn-floating.mic-on').css('display', 'inline-block');
				$('.action-buttons .btn-floating.mic-off').hide();
			});
		},
	}

	



	$(document).ready(function($) {

		load_SpeechRecognition_library.init();
		// load_SpeechRecognition_library.start_talking();
		// load_SpeechRecognition_library.stop_talking();	
	});
	
})(jQuery);
