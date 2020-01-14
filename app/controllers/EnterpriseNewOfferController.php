<?php

class EnterpriseNewOfferController extends BaseController {
   
  public function newOffer(){
  	$id = DB::table('users')->where('email', Input::get('email'))->first()->id;
    DB::insert('insert into offer (name, description, idEnterprise, idRecruiter)  values (?, ?, ?, ?)', [
    	Input::get('title'),
    	Input::get('description'),
    	Input::get('idEnterprise'),
    	$id 
    ]);
  }
  
}
