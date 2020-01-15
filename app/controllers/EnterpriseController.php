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
    DB::table('offer')->where('id', Input::get('id'))->update(['description' => Input::get('description')]);
    if(Input::get('skillSelected')){
      foreach (Input::get('skillSelected') as $key) {
        DB::table('offerSkill')->insert(['idOffer' => Input::get('id'), 'idSkill' => $key]);
      }
    }
    if(Input::get('removeSkillSelected')){
      foreach (Input::get('removeSkillSelected') as $key) {
        DB::table('offerSkill')->where(['idOffer' => Input::get('id'),'idSkill' => $key])->delete();
      }
    }
  }

  public function deleteOffer(){
    DB::table('offer')->where('id', Input::get('id'))->delete();
  }

  public function updateEnterprise(){
    $output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
    $output->writeln(Input::get('description'));
    DB::table('enterprise')->where('id', Input::get('id'))->update(['description' => Input::get('description')]);
  }
}

