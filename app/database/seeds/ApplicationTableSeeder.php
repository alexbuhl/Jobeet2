<?php

class ApplicationTableSeeder extends Seeder {

    public function run(){
    	DB::table('application')->delete();
    	$application = array(
    		array(
                'idUser'   => 1,
                'idOffer'  => 1,
                'isAccepted' => true,
            ),
            array(
                'idUser'   => 1,
                'idOffer'  => 2,
                'isAccepted' => true,
            ),
            array(
                'idUser'   => 1,
                'idOffer'  => 3,
                'isAccepted' => false,
            )
    	);
    	DB::table('application')->insert($application);
    }
}

?>