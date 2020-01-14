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
    	$skills = DB::table('skills')->select('name')->get();
    	return Response::json(json_encode($skills));
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function getSkillsByUser($id)
	{
		$skillsId = DB::table('userSkills')->where('idUser', $id)->get();
		$res = array();
		$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
		foreach ($skillsId as $elt) {
			$output->writeln($elt->idSkill);
			$res[] = DB::table('skills')->select('name')->where('id', $elt->idSkill)->first()->name;
		}
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
