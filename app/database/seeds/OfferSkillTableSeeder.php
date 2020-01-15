<?php

class OfferSkillTableSeeder extends Seeder {

    public function run(){
    	DB::table('offerSkill')->delete();
    	$offerSkills = array(
    		array(
                'idOffer'   => 1,
                'idSkill'          => 4,
            )
    	);
    	DB::table('offerSkill')->insert($offerSkills);
    }
}

?>