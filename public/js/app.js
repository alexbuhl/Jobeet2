var app = angular.module("app", ['ngSanitize']);

app.config(function($httpProvider) {

  var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
    var success = function(response) {
      return response;
    };

    var error = function(response) {
      if(response.status === 401) {
        SessionService.unset('authenticated');
        $location.path('/login');
        FlashService.show(response.data.flash);
      }
      return $q.reject(response);
    };

    return function(promise) {
      return promise.then(success, error);
    };
  };

  $httpProvider.responseInterceptors.push(logsOutUserOn401);

});

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/profil', {
    templateUrl: 'templates/profil.html',
    controller: 'ProfilController',
    resolve: {
      skill : function(ProfilService) {
        return ProfilService.get();
      }
    }
  });

  $routeProvider.when('/enterprise', {
    templateUrl: 'templates/enterprise.html',
    controller: 'EnterpriseController',
    resolve: {
      enterprise : function(EnterpriseService){
        return EnterpriseService.get();
      },
      recruiterOffers : function(EnterpriseService){
        return EnterpriseService.recruiterOffers();
      },
      otherOffers : function(EnterpriseService){
        return EnterpriseService.otherOffers();
      }
    }
  });

  $routeProvider.when('/books', {
    templateUrl: 'templates/books.html',
    controller: 'BooksController',
    resolve: {
      books : function(BookService) {
        return BookService.get();
      }
    }
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

});

app.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/home'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
  });
});

app.factory("BookService", function($http) {
  return {
    get: function() {
      return $http.get('/books');
    }
  };
});


app.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

app.factory("SessionService", function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  }
});

app.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService, CSRF_TOKEN) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };
    
    var jsonCredentials = function(credentials) {
    return {
      email: credentials.email,
      password: credentials.password,
    };
  };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function() {
      $.get("/user/connected",  jsonCredentials($scope.credentials)).done(function(res){
        $user = JSON.parse(res);
        sessionStorage.setItem('username', $user.username);
        sessionStorage.setItem('email', $user.email);
        sessionStorage.setItem('description', $user.description);
        sessionStorage.setItem('role', $user.role);
        sessionStorage.setItem('hobbie', $user.hobbie);
        sessionStorage.setItem('company', $user.company);
        sessionStorage.setItem('identerprise', $user.identerprise);
        sessionStorage.setItem('image', $user.image);
        sessionStorage.setItem('isPremium', $user.isPremium);
        sessionStorage.setItem('off', $user.off);
        sessionStorage.setItem('onsoft', $user.onsoft);
        sessionStorage.setItem('onhard', $user.onhard);

      });


      $location.path('/home');
    });
  };
});

app.controller("BooksController", function($scope, books) {
  $scope.books = books.data;
});

app.controller("HomeController", function($scope, $location, AuthenticationService) {

  $scope.logout = function() {
    AuthenticationService.logout().success(function() {
      $location.path('/login');
    });
  };
});


app.factory("ProfilService", function($http) {
  return {
    get: function() {
      $tab = [];
      $.get("/skills").done(function(res){
        $skills = JSON.parse(res);
        for(elt in $skills){
          $tab.push($skills[elt].name);
       }
     });
     return $tab;
    }
  };
});

app.controller("ProfilController", function($scope, skill) {
    var toAdd = [];
    $.get("/user/skills/1").done(function(res){
          $ymp= JSON.parse(res);
          $ymp.forEach((element, index) => {
            toAdd.push(element);
          });
         }
       );
    $scope.username = sessionStorage.getItem('username');
    $scope.email = sessionStorage.getItem('email');
    $scope.description = sessionStorage.getItem('description');
    $scope.hobbie = sessionStorage.getItem('hobbie');
    $scope.company = sessionStorage.getItem('company');
    $scope.image = sessionStorage.getItem('image');
    $scope.isPremium = sessionStorage.getItem('isPremium');
    $scope.off = sessionStorage.getItem('off');
    $scope.onsoft = sessionStorage.getItem('onsoft');
    $scope.onhard = sessionStorage.getItem('onhard');

    $scope.profil = function() {
      console.log("called");
      document.getElementById("edit").style.display = "none";    
      document.getElementById("profil").style.display = "block";
      document.getElementById("tab2").classList.remove('active');
      document.getElementById("tab1").classList.add('active');
    };
    $scope.edit = function() {
      skill.forEach((element, index) => {
      if(jQuery.inArray(element, toAdd) == -1){
          let option_elem = document.createElement('option');
          option_elem.value = index + 1;
          option_elem.textContent = element;
          $('#skillSelected').append(option_elem);
        } else{
          let option_elem = document.createElement('option');
          option_elem.value = index + 1;
          option_elem.textContent = element;
          $('#removeSkillSelected').append(option_elem);
        }
      });
      document.getElementById("edit").style.display = "block";    
      document.getElementById("profil").style.display = "none";
      document.getElementById("tab1").classList.remove('active');
      document.getElementById("tab2").classList.add('active');
      $('select').selectpicker();    
    };

    $scope.send = function() {
      var $self = $(this);
      var brands = document.getElementById("skillSelected");
      var selected = [];
      $(brands).each(function(index, brand){
        selected.push($(this).val());
      });
      selected = selected[0];
      if(selected){
        selected = selected.map(function (x) { 
          return parseInt(x, 10); 
        });
      }
      var tab = document.getElementById("removeSkillSelected");
      var removeSelected = [];
      $(tab).each(function(index, tmp){
        removeSelected.push($(this).val());
      });
      removeSelected = removeSelected[0];
      if(removeSelected){
        removeSelected = removeSelected.map(function (x) { 
          return parseInt(x, 10); 
        });
      }
      var myFile = $('#myFile').prop('files');
      var reader = new FileReader();
      if(myFile.length > 0){
        reader.readAsDataURL(myFile[0]);
        reader.onload = function () {
          console.log("image");
          $.post("/profil/edit", {
            img : reader.result, 
            email: sessionStorage.getItem('email'), 
            username: document.getElementById("name").value,
            description: document.getElementById("description").value,
            company: document.getElementById("company").value,
            hobbie: document.getElementById("hobbies").value,
            skillSelected: selected,
            removeSkillSelected: removeSelected,
            isPremium: document.getElementById("isPremium").checked,
            off: document.getElementById("off").checked,
            onsoft: document.getElementById("on-soft").checked,
            onhard: document.getElementById("on-hard").checked
          });
        }
      } else {
      $.post("/profil/edit", {
          img : null, 
          email: sessionStorage.getItem('email'), 
          username: document.getElementById("name").value,
          description: document.getElementById("description").value,
          company: document.getElementById("company").value,
          hobbie: document.getElementById("hobbies").value,
          skillSelected: selected,
          removeSkillSelected: removeSelected,
          isPremium: document.getElementById("isPremium").checked,
          off: document.getElementById("off").checked,
          onsoft: document.getElementById("on-soft").checked,
          onhard: document.getElementById("on-hard").checked
        });
      }
      $.get("/user/connected",  {email: sessionStorage.getItem('email')}).done(function(res){
        $user = JSON.parse(res);
        sessionStorage.setItem('username', $user.username);
        sessionStorage.setItem('email', $user.email);
        sessionStorage.setItem('description', $user.description);
        sessionStorage.setItem('role', $user.role);
        sessionStorage.setItem('hobbie', $user.hobbie);
        sessionStorage.setItem('company', $user.company);
        sessionStorage.setItem('idEntreprise', $user.idEntreprise);
        sessionStorage.setItem('image', $user.image);
        sessionStorage.setItem('isPremium', $user.isPremium);
        sessionStorage.setItem('off', $user.off);
        sessionStorage.setItem('onsoft', $user.onsoft);
        sessionStorage.setItem('onhard', $user.onhard);
        $scope.username = sessionStorage.getItem('username');
        $scope.email = sessionStorage.getItem('email');
        $scope.description = sessionStorage.getItem('description');
        $scope.hobbie = sessionStorage.getItem('hobbie');
        $scope.company = sessionStorage.getItem('company');
        $scope.image = sessionStorage.getItem('image');
        $scope.isPremium = sessionStorage.getItem('isPremium');
        $scope.off = sessionStorage.getItem('off');
        $scope.onsoft = sessionStorage.getItem('onsoft');
        $scope.onhard = sessionStorage.getItem('onhard');
        document.getElementById("edit").style.display = "none";    
        document.getElementById("profil").style.display = "block";
        document.getElementById("tab2").classList.remove('active');
        document.getElementById("tab1").classList.add('active');
        document.location.reload(true);
        });
      };
});


app.directive("showsMessageWhenHovered", function() {
  return {
    restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
    link: function(scope, element, attributes) {
      var originalMessage = scope.message;
      element.bind("mouseenter", function() {
        scope.message = attributes.message;
        scope.$apply();
      });
      element.bind("mouseleave", function() {
        scope.message = originalMessage;
        scope.$apply();
      });
    }
  };
});

app.factory("EnterpriseService", function($http) {
  return {
    get: function() {
      return $.get("/enterprise", {id: sessionStorage.getItem("identerprise")});
    },
    recruiterOffers : function(){
      return $.get("/enterprise/recruiterOffers", {email: sessionStorage.getItem("email"), idEnterprise: sessionStorage.getItem("identerprise")});
    },
    otherOffers : function(){
      return $.get("enterprise/otherOffers", {email: sessionStorage.getItem("email"), idEnterprise: sessionStorage.getItem("identerprise")});
    }
  };
});


app.controller("EnterpriseController", function($scope, enterprise, recruiterOffers, otherOffers){
  
  $scope.recruiterOffers = JSON.parse(recruiterOffers);
  $scope.otherOffers = JSON.parse(otherOffers);

  $enterprise = JSON.parse(enterprise);
  $scope.enterpriseName = $enterprise.name;
  $scope.enterpriseDescription = $enterprise.description;
});
