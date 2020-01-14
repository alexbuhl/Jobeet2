<?php

class SkillController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function getSkills()
	{

		/*Mail::send('emails.acceptUser', array(), function($message)
		{
		    $message->to('julien.gantzer@epita.fr', '')->subject('Jobeet c\'est de l\'eau !');
		});*/
    	$skills = DB::table('skills')->get();
    	return Response::json(json_encode($skills));
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function getAllUserSkills()
	{
		$res = DB::table('userSkills')->get();
		return Response::json(json_encode($res));
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


}
