<?php

class EnterpriseController extends \BaseController {

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index()
  {
    enterprise = DB::table('enterprise')->where('id', Input::get('id'))->first();
    return Response::json(json_encode(enterprise));
  }

  public function myOffers(){
    //$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
    //$output->writeln(Input::get('email'));
    id = DB::table('user')->where('email', Input::get('email'))->first();
    myOffers = DB::table('offer')->where('idRecruiter', id );
    return jsonEncode(myOffers);
  }


  public jsonEncode(obj){
    return Response::json(json_encode(obj));
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
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return Response
   */
  public function edit($id)
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