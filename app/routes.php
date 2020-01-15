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

Route::post('/auth/login', array('before' => 'csrf_json', 'uses' => 'AuthController@login'));
Route::get('/auth/logout', 'AuthController@logout');
Route::get('/auth/status', 'AuthController@status');
Route::get('/user/connected', 'AuthController@getConnected');
Route::post('/profil/edit', 'ProfilController@edit');
Route::get('/skills','SkillController@getSkills');
Route::get('/userSkills','SkillController@getAllUserSkills');
Route::get('/chat/all', 'ChatController@getAll');
Route::post('/chat/add', 'ChatController@add');
Route::get('/application/all', 'ChatController@applicationAll');
Route::get('/users/all', 'ChatController@usersAll');



Route::get('/enterprise/', 'EnterpriseController@index');
Route::get('/enterprise/recruiterOffers', 'EnterpriseController@recruiterOffers');
Route::get('/enterprise/otherOffers', 'EnterpriseController@otherOffers');
Route::post('/enterprise/updateEnterprise', 'EnterpriseController@updateEnterprise');


Route::post('/enterprise/updateOffer', 'EnterpriseController@updateOffer');
Route::post('/enterprise/deleteOffer', 'EnterpriseController@deleteOffer');

Route::post('/enterprise/newOffer', 'EnterpriseNewOfferController@newOffer');

Route::get('/offers', 'OffersController@getAlloffers');
Route::get('/offer/{id}', 'OffersController@getOffer');
Route::get('/offersSkills', 'SkillController@getOffersSkills');