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
		DB::table('application')->where(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer')])->update(['isAccepted' => true]);
	}

	public function deleteUser(){
		DB::table('application')->where(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer')])->delete();

	public function apply(){
		DB::table('application')->insert(['idUser' => Input::get('idUser'), 'idOffer' => Input::get('idOffer'), 'isAccepted' => false ]);
	}
}