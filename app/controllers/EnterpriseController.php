<?php

class EnterpriseController extends BaseController {

  public function index()
  {
    $enterprise = DB::table('enterprise')->where('id', Input::get('id'))->first();
    return Response::json(json_encode($enterprise));
  }

    //$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
    //$output->writeln(Input::get('email'));


  public function recruiterOffers()
  {    
    $id = DB::table('users')->where('email', Input::get('email'))->first()->id;
    $myOffers = DB::table('offer')->where('idRecruiter', $id )->where('identerprise', Input::get('idEnterprise'))->get();
    
    return Response::json(json_encode($myOffers));
  }

  public function otherOffers()
  {
    $id = DB::table('users')->where('email', Input::get('email'))->first()->id;
    $otherOffers = DB::table('offer')->where('idRecruiter', '<>' , $id )->where('identerprise', Input::get('idEnterprise'))->get();
    
    return Response::json(json_encode($otherOffers));
  }
  

  public function updateOffer(){
    $offer = DB::table('offer')->where('id', Input::get('id'))->update(['description' => Input::get('description')]);
  }
}

