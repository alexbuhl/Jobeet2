<?php

class OffersTableSeeder extends Seeder {

    public function run(){
    	DB::table('offer')->delete();
    	$offers = array(
    		array(
                'id'      		=> 1,
                'name'          => 'offer1',
                'description'   => 'best offer ever',
                'idRecruiter'   => 1,
                'idEntreprise'  => 1,
            )
    	);
    	DB::table('offer')->insert($offers);
    }
}

?>