<?php

class UsersTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();

        $users = array(
            array(
                'email'         => 'admin',
                'password'      => Hash::make('admin'),
            )
        );

        DB::table('users')->insert( $users );
    }

}

?>
