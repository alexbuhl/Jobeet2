<?php

class OffersTableSeeder extends Seeder {

    public function run(){
    	DB::table('offer')->delete();
    	$offers = array(
    		array(
                'name'          => 'offer1',
                'description'   => 'best offer ever',
                'idRecruiter'   => 1,
                'identerprise'  => 1,
            ),
            array(
                'name'          => 'offer2',
                'description'   => 'cool offer',
                'idRecruiter'   => 2,
                'identerprise'  => 1,
            )
    	);
    	DB::table('offer')->insert($offers);
    }
}

?>