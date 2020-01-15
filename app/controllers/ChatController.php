<?php

class ChatController extends BaseController {
	public function getAll(){
		$chat = DB::table('chat')->get();
    	return Response::json(json_encode($chat));
	}

	public function add(){
		DB::table('chat')->insert(['idOffer' => Input::get('idOffer'), 'idApplicant' => Input::get('idApplicant'), 'isFromOffer' => Input::get('isFromOffer') == 'true', 'message' => Input::get('message')]);
	}

	public function applicationAll(){
		$application = DB::table('application')->where('isAccepted', true)->get();
    	return Response::json(json_encode($application));
	}

	public function usersAll(){
		$users = DB::table('users')->get();
    	return Response::json(json_encode($users));
	}
}