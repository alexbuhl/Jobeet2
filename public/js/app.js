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
      },
      allUserSkill : function(ProfilService) {
        return ProfilService.getAll();
      }
    }
  });

  $routeProvider.when('/chat', {
    templateUrl: 'templates/chat.html',
    controller: 'ChatController',
    resolve: {
      chats : function(ChatService){
        return ChatService.getAll();
      },
      offers : function(OfferShowService){
        return OfferShowService.offers();
      },
      users : function(ChatService){
        return ChatService.users();
      }
    }
  });

  $routeProvider.when('/offers', {
    templateUrl: 'templates/offers.html',
    controller: 'OffersController',
    resolve: {
      offers : function(OffersService){
        return OffersService.offers();
      }
    }
  });

  $routeProvider.when('/offers/:id', {
    templateUrl: 'templates/offersShow.html',
    controller: 'OfferShowController',
    resolve : {
      offers : function(OfferShowService){
        return OfferShowService.offers();
      },
      skills : function(OfferShowService){
        return OfferShowService.skills();
      },
      offersSkills : function(OfferShowService){
        return OfferShowService.offersSkills();
      }
    }
  });

  $routeProvider.when('/enterprise/updateOffer/:id',{
    templateUrl: 'templates/enterpriseUpdateOffer.html',
    controller: 'UpdateOfferController',
    resolve : {
      offers : function(OffersService){
        return OffersService.offers();
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

  $routeProvider.when('/enterprise/updateEnterprise', {
    templateUrl : 'templates/enterpriseUpdate.html',
    controller : 'UpdateEnterpriseController',
    resolve :{
      enterprise : function(EnterpriseService){
        return EnterpriseService.get();
      }
    }
  });

   $routeProvider.when('/enterprise/newOffer', {
    templateUrl: 'templates/enterpriseNewOffer.html',
    controller: 'EnterpriseNewOfferController'
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
        sessionStorage.setItem('id', $user.id);
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


app.controller("HomeController", function($scope, $location, AuthenticationService) {

  $scope.logout = function() {
    AuthenticationService.logout().success(function() {
      $location.path('/login');
    });
  };
});

app.factory("ChatService", function($http) {
  return {
    getAll: function() {
      tb = [];
      $.get("/chat/all").done(function(res){
        tmp = JSON.parse(res);
        for(elt in tmp){
          tb.push(tmp[elt]);
       }
     });
     return tb;
    },
    users: function() {
      tab = [];
      $.get("/users/all").done(function(res){
        tmp = JSON.parse(res);
        for(elt in tmp){
          tab.push(tmp[elt]);
       }
     });
     return tab;
    }
  };
});

app.controller("ChatController", function($scope, chats, offers, users) {
  mychats = [];
  for(elt in chats){
    if(sessionStorage.getItem('role') == 2){
      if(chats[elt].idApplicant == sessionStorage.getItem('id')){
        mychats.push(chats[elt]);
      }
    } else {
      if(chats[elt].idOffer == sessionStorage.getItem('connectedOffer')){
        mychats.push(chats[elt]);
      }
    }
  }
  offers = JSON.parse(offers);
  availablechats = [];
  var me = {};
  var you = {};
  if(sessionStorage.getItem('role') == 2){
    for(elt in mychats){
      for(val in offers){
        if(mychats[elt].idOffer == offers[val].id){
          if(availablechats.indexOf(offers[val]) == -1){
            availablechats.push(offers[val]);
            break;
          }
        }
      }
    }
    me.avatar = "https://photos.cri.epita.fr/assistant.test";  
    you.avatar = sessionStorage.getItem('image');
  } else {
    tmp = []
    for(elt in mychats){
      if(tmp.indexOf(mychats[elt].idApplicant) == -1){
        tmp.push(mychats[elt].idApplicant);
      }
    }
    for(elt in tmp){
      for(val in users){
        if(tmp[elt] == users[val].id){
          availablechats.push({id: users[val].id, name: users[val].username})
        }
      }
    }
    you.avatar = "https://photos.cri.epita.fr/assistant.test";  
  }
  $scope.availablechats = availablechats;
  function insertChat(who, text){
      var control = "";
      var w1 = "100";
      var w2 = "100";
      if(sessionStorage.getItem('role') == 1){
        w2 = "60";
      } else {
        w1 = "60";
      }
      if (who == "me"){
          control = '<li style="width:100%;">' +
                          '<div class="msj macro">' +
                          '<div class="avatar"><img class="img-circle" style="width:' + w1 + '%;" src="'+ me.avatar +'" /></div>' +
                              '<div class="text text-l">' +
                                  '<p>'+ text +'</p>' +
                                  '<p><small></small></p>' +
                              '</div>' +
                          '</div>' +
                      '</li>';                    
      }else{
          control = '<li style="width:100%;">' +
                          '<div class="msj-rta macro">' +
                              '<div class="text text-r">' +
                                  '<p>'+text+'</p>' +
                                  '<p><small></small></p>' +
                              '</div>' +
                          '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:' + w2 + '%;" src="'+you.avatar+'" /></div>' +                                
                    '</li>';
      }
      $("#myul").append(control).scrollTop($("#myul").prop('scrollHeight'));
  }

  function resetChat(){
      $("#myul").empty();
  }

  $(".mytext").on("keydown", function(e){
      if (e.which == 13){
          var text = $(this).val();
          if (text !== ""){
              insertChat("you", text);              
              $(this).val('');
              if(sessionStorage.getItem('role') == 2){
                $.post('/chat/add', {idOffer: sessionStorage.getItem('chatOffer'), idApplicant: sessionStorage.getItem('id'), isFromOffer: false, message: text});
              } else {
                $.post('/chat/add', {idOffer: sessionStorage.getItem('connectedOffer'), idApplicant: sessionStorage.getItem('chatApplicant'), isFromOffer: true, message: text});
              }
          }
      }
  });

  $('body > div > div > div:nth-child(2) > span').click(function(){
      $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
  })

  $scope.show = function(id) {
    resetChat();
    if(sessionStorage.getItem('role') == 2){
      sessionStorage.setItem('chatOffer', id);
      for(elt in mychats){
        if(mychats[elt].idOffer == parseInt(id, 10)) {
          if(mychats[elt].isFromOffer){
            insertChat("me", mychats[elt].message);  
          } else {
            insertChat("you", mychats[elt].message);  
          }
        }
      }
    } else {
      sessionStorage.setItem('chatApplicant', id);
      for(elt in users){
        if(users[elt].id == id){
          me.avatar = users[elt].image;
        }
      }
      for(elt in mychats){
        if(mychats[elt].idApplicant == parseInt(id, 10)) {
          console.log(mychats[elt]);
          if(mychats[elt].isFromOffer){
            insertChat("you", mychats[elt].message);  
          } else {
            insertChat("me", mychats[elt].message);  
          }
        }
      }
    }
  };

  resetChat();
});

app.factory("ProfilService", function($http) {
  return {
    get: function() {
      tab = [];
      $.get("/skills").done(function(res){
        skills = JSON.parse(res);
        for(elt in skills){
          tab.push(skills[elt]);
       }
     });
     return tab;
    },
    getAll: function() {
      tb = [];
      $.get("/userSkills").done(function(res){
        tmp = JSON.parse(res);
        for(elt in tmp){
          tb.push(tmp[elt]);
       }
     });
     return tb;
    }
  };
});

app.controller("ProfilController", function($scope, skill, allUserSkill) {
    var toAdd = [];
    for(elt in allUserSkill){
      if(allUserSkill[elt].idUser == sessionStorage.getItem('id')){
        for(val in skill){
          if(skill[val].id == allUserSkill[elt].idSkill){
            toAdd.push(skill[val].name);
          }
        }
      }
    }
    skilltab = [];
    for(elt in skill){
      skilltab.push(skill[elt].name);
    }
    $scope.toAdd = toAdd;
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
      skilltab.forEach((element, index) => {
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
        document.location.reload(true);
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

app.factory('OfferShowService', function($http){
  return {
    offers : function() {
      return $.get('/offers/');
    },
    offersSkills : function(){
      return $.get('offersSkills');
    },
    skills: function() {
      tab = [];
      $.get("/skills").done(function(res){
        skills = JSON.parse(res);
        for(elt in skills){
          tab.push(skills[elt]);
       }
     });
     return tab;
    },
  };
});

app.controller('OfferShowController', function($scope, $routeParams, $http, offers, offersSkills, skills){
  $idOffer = $routeParams.id

  $offers = JSON.parse(offers);
  for (var i = $offers.length - 1; i >= 0; i--) {
    if ($offers[i].id == $idOffer){
      $scope.offer = $offers[i];
    }
  }

  $offersSkills = JSON.parse(offersSkills);
  var arraySkills = [];
  for (var i = $offersSkills.length - 1; i >= 0; i--) {
    if ($offersSkills[i].idOffer == $idOffer){
      arraySkills.push($offersSkills[i])
    }
  }
  

  var toAdd = [];
  for (var i = skills.length - 1; i >= 0; i--) {
    for (var j = arraySkills.length - 1; j >= 0; j--) {
      if (skills[i].id == arraySkills[j].idSkill){
        toAdd.push(skills[i]);
      }
    }
  }
  $scope.skills = toAdd;


});


app.factory("OffersService", function($http){
  return {
    offers : function() {
      return $.get('/offers');
    }
  };
});


app.controller("OffersController", function($http, $scope, offers){
  $scope.offers = JSON.parse(offers);
});


app.controller('UpdateOfferController', function($scope, $routeParams, offers){
  $offerId = $routeParams.id
  $scope.updateOffer = function(){
    $.post("enterprise/updateOffer", {
      id : $offerId,
      description : document.getElementById("description").value
    });
  };

  $offers = JSON.parse(offers);
  for (var i = $offers.length - 1; i >= 0; i--) {
    if ($offers[i].id == $offerId){
      $scope.offer = $offers[i];
    }
  }
});

app.controller('UpdateEnterpriseController', function($scope, $http, enterprise){

  $scope.enterprise = JSON.parse(enterprise);
  $scope.updateEnterprise = function(){
    $.post("enterprise/updateEnterprise", {
      id : sessionStorage.getItem('identerprise'),
      description: document.getElementById("description").value
    }).done(function(res){
      document.location.reload(true);
    });
  };
});

app.controller("EnterpriseNewOfferController", function($scope){
  $scope.createNewOffer = function() {
      $.post("/enterprise/newOffer", {
        title : document.getElementById("title").value,
        description : document.getElementById("description").value,
        idEnterprise : sessionStorage.getItem('identerprise'),
        email : sessionStorage.getItem('email')
      }).done(function(res){
        document.location.reload(true);
      });
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

  $scope.deleteOffer = function(id){
    console.log(id);
    $.post('enterprise/deleteOffer', {id: id}).done(function(res){
      document.location.reload(true);
    });
  }

});
