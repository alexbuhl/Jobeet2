<?php

class OffersController extends BaseController {
	public function getAllOffers(){
		$offers = DB::table('offer')->get();
    	return Response::json(json_encode($offers));
	}

	public function getOffer($id){
		$offer = DB::table('offer')->where('id', $id)->first();
		return Response::json(json_encode($offer));
	}

	public function acceptUser(){
		Mail::send('emails.acceptUser', array(), function($message)
		{
		    $message->to(DB::table('users')->where('id', Input::get('idUser'))->first()->email, '')->subject(DB::table('offer')->where('id', Input::get('idOffer'))->first()->name);
		});
		DB::table('application')->where(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer')])->update(['isAccepted' => true]);
	}

	public function acceptNewUser(){
		Mail::send('emails.acceptUser', array(), function($message)
		{
		    $message->to(DB::table('users')->where('id', Input::get('idUser'))->first()->email, '')->subject(DB::table('offer')->where('id', Input::get('idOffer'))->first()->name);
		});
		DB::table('application')->insert(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer'), 'isAccepted' => true]);
	}

	public function deleteUser(){
		Mail::send('emails.userRejected', array(), function($message)
		{
		    $message->to(DB::table('users')->where('id', Input::get('idUser'))->first()->email, '')->subject(DB::table('offer')->where('id', Input::get('idOffer'))->first()->name);
		});
		DB::table('application')->where(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer')])->delete();
	}

	public function apply(){
		DB::table('application')->insert(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer'), 'isAccepted' => false ]);
	}

	public function unsuscribe(){
		DB::table('application')->where(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer')])->delete();
	}
}