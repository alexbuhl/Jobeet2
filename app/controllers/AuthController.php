<?php

class AuthController extends BaseController {

  public function status() {
    return Response::json(Auth::check());
  }

  public function login()
  {
    $output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
    $output->writeln(Input::json('email'));
    if(Auth::attempt(array('email' => Input::json('email'), 'password' => Input::json('password'))))
    {
      return Response::json(Auth::user());
    } else {
      return Response::json(array('flash' => 'Invalid username or password'), 500);
    }
  }

  public function getConnected()
  {
    $user = DB::table('users')->where('email', Input::get('email'))->first();
    return Response::json(json_encode($user));
  }

  public function logout()
  {
    Auth::logout();
    return Response::json(array('flash' => 'Logged Out!'));
  }

}
