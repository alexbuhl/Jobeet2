<?php

class ChatTableSeeder extends Seeder {

    public function run(){
    	DB::table('chat')->delete();
    	$chat = array(
    		array(
                'idOffer'          => 1,
                'idApplicant'   => 1,
                'isFromOffer'   => true,
                'message'  => "Hello toto",
            ),
            array(
                'idOffer'          => 2,
                'idApplicant'   => 1,
                'isFromOffer'   => true,
                'message'  => "Hello toaasato",
            ),
            array(
                'idOffer'          => 1,
                'idApplicant'   => 1,
                'isFromOffer'   => false,
                'message'  => "Hey !",
            ),
            array(
                'idOffer'          => 1,
                'idApplicant'   => 1,
                'isFromOffer'   => false,
                'message'  => "What's up ?",
            ),
    	);
    	DB::table('chat')->insert($chat);
    }
}

?>