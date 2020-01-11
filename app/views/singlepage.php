<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="UTF-8">
  <title>NLPF 2</title>
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/foundation.min.css">
  <link rel="stylesheet" href="/css/style.css">
  <script src="/js/angular.js"></script>
  <script src="/js/angular-sanitize.js"></script>
  <script src="/js/underscore.js"></script>
  <script src="/js/app.js"></script>
  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
</head>
<body>

<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

<div class="navbar navbar-dark" style="width: 100%; background-color: #383838;">
        <div class="container-fluid">
          <div class="navbar-header">
             <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapibleMenu">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            <a href="/#/home" class="navbar-brand" style="color: white;">Jobeet 2</a>
          </div>
          <div class="collapse navbar-collapse" id="collapibleMenu">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/#/offer" style="color: white;">Offers</a></li>
                <li><a href="/#/profil" style="color: white;">Profil</a></li>
                <li><a onclick="logout()" style="color: white;">Logout</a></li>
                <li><a href='/#/enterprise' style="color: white;">Enterprise</a></li>
            </ul>
          </div>
        </div>
      </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.8.1/css/bootstrap-select.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.8.1/js/bootstrap-select.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

  <div id="flash" class="alert-box alert" ng-show="flash">
    {{ flash }}
  </div>
  <div id="view" ng-view></div>
</body>
</html>

<script type="text/javascript">
  function logout() {
      var logout = $.get("/auth/logout");
      sessionStorage.removeItem('authenticated');
      window.location.href="/#/login";
    }
</script>