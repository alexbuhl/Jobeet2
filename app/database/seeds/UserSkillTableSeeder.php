<?php

class UserSkillTableSeeder extends Seeder {

    public function run(){
    	DB::table('userSkills')->delete();
    	$userSkills = array(
    		array(
                'idUser'   => 1,
                'idSkill'          => 4,
            ),
            array(
                'idUser'   => 2,
                'idSkill'  => 2,
            )
    	);
    	DB::table('userSkills')->insert($userSkills);
    }
}

?>