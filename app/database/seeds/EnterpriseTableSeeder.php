<?php

class EnterpriseTableSeeder extends Seeder {

    public function run(){
    	DB::table('enterprise')->delete();
    	$enterprises = array(
    		array(
                'id'      		=> 1,
                'name'    		=> 'EPITA',
                'description'   => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor orci ut sapien scelerisque viverra. Sed trist ique justo nec mauris efficitur, ut lacinia elit dapibus. In egestas elit in dap ibus laoreet. Duis magna libero, fermentum ut facilisis id, pulvinar eget tortor. Vestibulum pelle ntesque tincidunt lorem, vitae euismod felis porttitor sed.',
            )
    	);
    	DB::table('enterprise')->insert($enterprises);
    }
}

?>