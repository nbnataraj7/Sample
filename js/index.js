$(document).ready(function(){
	setTimeout(function(){
		services.getDogBreeds(function(breeds){
			if(!breeds){return;}
			var cards = [];
			for(var i=0; i<breeds.length; i++){
				cards.push(getNewDogCard(breeds[i]));
			}
			$(".dogs-breed-list").children().remove();
			$(".dogs-breed-list").append(cards);
			setTimeout(fetchDefaultDogImages());
			setTimeout(setCardListeners(), 50);
		});
	}, 0);
	
	//misc
	//back press handling
	window.location.href.replace("#images", "");
	window.onhashchange = function(){
		if(!window.location.href.split("#")[1]){
			returnHome();
		}
	}
});



var services = {
	
	baseURL : "https://dog.ceo/",
	
	getDogBreeds: function(callback){
		var self = this;
		var url = self.baseURL + "api/breeds/list";
		$.ajax({
			method: "GET",
			url: url
		}).then(function(data){
			callback.call(self, data?data.message:null);
		}, function(){
			console.log("OHHH NOOOO!!!");
		});
	},
	
	
	getDogBreedPictures: function(breed, callback){
		var self = this;
		var url = self.baseURL + "api/breed/{0}/images";
		url = url.replace("{0}", breed);
		$.ajax({
			method: "GET",
			url: url
		}).then(function(data){
			callback.call(self, data?data.message:null);
		}, function(){
			
		});
	},
	
	getRandomBreedImage: function(breed, callback){
		var self = this;
		var url = self.baseURL + "api/breed/{0}/images/random";
		url = url.replace("{0}", breed);
		$.ajax({
			method: "GET",
			url: url
		}).then(function(data){
			callback.call(self, data?data.message:null);
		}, function(){
			
		});
	}
	
}


function getNewDogCard(name){
	return "<div class='w3-card-2 w3-round dog-card w3-row w3-mobile w3-col m4 l3 w3-animate-left'>"+
				"<div class='w3-container'>"+
					"<img class='dog-image' src='img/pup.png'/>"+
				"</div>"+
				"<div class='w3-bar card-footer'>"+
					"<p class='breed-name text-center'>"+name+"</p>"+
				"</div>"+
		   "</div>";
}


function setCardListeners(){
	$(".card-footer").on("click", function(){
		window.location.href += "#images";
		var breed = $(this).find(".breed-name").html();
		breed = breed?breed.trim():"";
		$(".home").hide();
		$(".dog-image-cards").children().remove();
		$(".dog-image-cards").show();
		services.getDogBreedPictures(breed, function(pictures){
			if(!pictures){return;}
			var cards = [];
			for(var i=0; i<pictures.length; i++){
				cards.push(getNewDogImageCard(pictures[i]));
			}
			$(".dog-image-cards").append(cards);
		});
	});
}

function returnHome(){
	$(".home").show();
	$(".dog-image-cards").hide();
}

function getNewDogImageCard(url){
	return "<div class='w3-card-2 w3-round dog-card w3-row w3-mobile w3-col m4 l3'>"+
				"<div class='w3-container'>"+
					"<img class='dog-image w3-padding-large' alt='img/pup.png' src='"+url+"'/>"+
				"</div>"+
		   "</div>";
}

function fetchDefaultDogImages(){
	$.each($(".dog-card"), function(i,j){
		var breed = $(this).find(".card-footer .breed-name").html().trim();
		var dogImageHolder = $(this).find("img.dog-image");
		services.getRandomBreedImage(breed, function(imgSource){
			if(!imgSource){return;}
			dogImageHolder.attr("src", imgSource);
		});
	});
}



//Registering service workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }