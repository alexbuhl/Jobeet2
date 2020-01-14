<?php

class ProfilController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function edit()
	{
		if(Input::get('img')){
			DB::table('users')->where('email', Input::get('email'))->update(['username' => Input::get('username'), 'image' => Input::get('img'), 'description' => Input::get('description'), 'hobbie' => Input::get('hobbie'), 'company' => Input::get('company'), 'isPremium' => Input::get('isPremium') === 'true', 'off' => Input::get('off') === 'true', 'onsoft' => Input::get('onsoft') === 'true', 'onhard' => Input::get('onhard') === 'true']);	
		} else {
			DB::table('users')->where('email', Input::get('email'))->update(['username' => Input::get('username'), 'description' => Input::get('description'), 'hobbie' => Input::get('hobbie'), 'company' => Input::get('company'), 'isPremium' => Input::get('isPremium') === 'true', 'off' => Input::get('off') === 'true', 'onsoft' => Input::get('onsoft') === 'true', 'onhard' => Input::get('onhard') === 'true']);
		}
		$user = DB::table('users')->where('email', Input::get('email'))->first();
		if(Input::get('skillSelected')){
			foreach (Input::get('skillSelected') as $key) {
				DB::table('userSkills')->insert(['idUser' => $user->id, 'idSkill' => $key]);
			}
		}
		if(Input::get('removeSkillSelected')){
			foreach (Input::get('removeSkillSelected') as $key) {
				DB::table('userSkills')->where(['idUser' => $user->id,'idSkill' => $key])->delete();
			}
		}
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
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
