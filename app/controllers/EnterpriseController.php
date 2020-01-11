<?php

class EnterpriseController extends BaseController {

  public function get()
  {
    $enterprise = DB::table('enterprise')->where('id', Input::get('id'))->first();
    return Response::json(json_encode($enterprise));
  }

    //$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
    //$output->writeln(Input::get('email'));

/*
  public function myOffers(){
    //$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
    //$output->writeln(Input::get('email'));
    id = DB::table('user')->where('email', Input::get('email'))->first();
    myOffers = DB::table('offer')->where('idRecruiter', id );
    return jsonEncode(myOffers);
  }
  */
  
}

