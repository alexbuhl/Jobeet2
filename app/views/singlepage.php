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
  <div id="flash" class="alert-box alert" ng-show="flash">
    {{ flash }}
  </div>
  <div id="view" ng-view></div>
</body>
</html>
