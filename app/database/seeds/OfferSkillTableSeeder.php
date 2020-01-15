<?php

class OfferSkillTableSeeder extends Seeder {

    public function run(){
    	DB::table('offerSkill')->delete();
    	$offerSkills = array(
    		array(
                'idOffer'   => 1,
                'idSkill'   => 4,
            ),
            array(
                'idOffer'   => 1,
                'idSkill'   => 5,
            ),
            array(
                'idOffer'   => 1,
                'idSkill'   => 6,
            ),
            array(
                'idOffer'   => 2,
                'idSkill'   => 1,
            ),
            array(
                'idOffer'   => 2,
                'idSkill'   => 2,
            ),
            array(
                'idOffer'   => 2,
                'idSkill'   => 3,
            ),
            array(
                'idOffer'   => 2,
                'idSkill'   => 4,
            ),
            array(
                'idOffer'   => 2,
                'idSkill'   => 5,
            ),


    	);
    	DB::table('offerSkill')->insert($offerSkills);
    }
}

?>