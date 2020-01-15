<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function() {
	return View::make('singlepage');
});

Route::get('/books', array('before' => 'auth', function() {
  return Response::json(array(
    array('title' => 'Great Expectations', 'author' => 'Dickens'),
    array('title' => 'Foundation', 'author' => 'Asimov'),
    array('title' => 'Treasure Island', 'author' => 'Stephenson')
  ));

  // return Response::json(array('flash' => 'Session expired'), 401);
}));

Route::post('/auth/login', array('before' => 'csrf_json', 'uses' => 'AuthController@login'));
Route::get('/auth/logout', 'AuthController@logout');
Route::get('/auth/status', 'AuthController@status');
Route::get('/user/connected','AuthController@getConnected');
Route::post('/profil/edit', 'ProfilController@edit');
Route::get('/skills','SkillController@getSkills');
Route::get('/userSkills','SkillController@getAllUserSkills');



Route::get('/enterprise/', 'EnterpriseController@index');
Route::get('/enterprise/recruiterOffers', 'EnterpriseController@recruiterOffers');
Route::get('/enterprise/otherOffers', 'EnterpriseController@otherOffers');


Route::post('/enterprise/updateOffer', 'EnterpriseController@updateOffer');
Route::post('/enterprise/deleteOffer', 'EnterpriseController@deleteOffer');

Route::post('/enterprise/newOffer', 'EnterpriseNewOfferController@newOffer');

Route::get('/offers', 'OffersController@getAlloffers');
Route::get('/offer/{id}', 'OffersController@getOffer');





