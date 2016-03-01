var formCtrl = angular.module('formCtrl',['ngAnimate']);


formCtrl.controller('CheckoutCtrl', function($rootScope, $scope, $http){

	//Set up all the sections hide them, then show the first
	$scope.sections = ["aboutyou", "shipto", "billto","paywith"];
	$scope.currentSection = 0;
	$scope.elements = {};
	$scope.sections.forEach(function(entry) {
	    $scope.elements[entry] = false;
	});
	$scope.elements.aboutyou= true;

	//Setup temporary inputs that need to hide
	$scope.temp = {
		"autocomplete" : true
	};

	//Setup the forms and listeners for changes
	$scope.forms = ["checkoutForm"];
	$scope.temps = ["addressEnter"];
	$scope.forms.forEach(function(entry){
		//These are listeners on temp elements
		$scope.temps.forEach(function(elem){
			$scope.$watch(entry+'.'+elem+'.$invalid', function(newVal){
				console.log(entry+'.'+elem+'.$invalid is '+ newVal);
			});
		});

	});

	//user data
	$scope.user = {
		fullName : "",
		age : "",
		email : "",
		street : "",
		apt : "",
		city : "",
		state : "",
		zip : "",
		bAddress : false,
		bName : "",
		bStreet : "",
		bApt : "",
		bCity : "",
		bState : "",
		bZip : "",
		cardNum : "",
		cardExp : "",
		cvv : ""
	};
	//Regex to check first and last name
	$scope.nameRegex = /^(?:[\u00c0-\u01ffa-zA-Z'-]){2,}(?:\s[\u00c0-\u01ffa-zA-Z'-]{2,})+$/i;
	//Regex to validate street name
	$scope.streetRegex = /^\s*\S+(?:\s+\S+){2}/;
	//Show or hide sections based on checked variables
	$scope.setSections = function(){

		if($scope.user.bAddress){
			$scope.sections = ["aboutyou", "shipto", "billto","paywith"];	
		}else if(!$scope.user.bAddress){
			$scope.sections = ["aboutyou", "shipto", "paywith"];
		}

		$scope.sections.forEach(function(entry) {
		    $scope.elements[entry] = false;
		});

		$scope.elements[$scope.sections[$scope.currentSection]]= true;

	}


	$scope.nextSection = function(){
		if($scope.currentSection<$scope.sections.length-1){
			$scope.currentSection++;
			var i = $scope.currentSection;
			var set = $scope.sections[i];
			var last = $scope.sections[i-1];
			$scope.elements[last] = false;
			$scope.elements[set] = true;
		}
	};

	$scope.lastSection = function(){
		if($scope.currentSection>0){
			$scope.currentSection--;
			var i = $scope.currentSection;
			var set = $scope.sections[i];
			var last = $scope.sections[i+1];
			$scope.elements[last] = false;
			$scope.elements[set] = true;
		}
	};

	$scope.toggleTemp = function(input){

		if($scope.temp[input] === true){
			$scope.temp[input] = false
		}else if($scope.temp[input] === false){
			$scope.temp[input] = true
		}if($scope.temp[input] === undefined){
			console.log("No such temp input named " + input);
		}

	}

	$scope.setSections();


});
