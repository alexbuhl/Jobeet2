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
}