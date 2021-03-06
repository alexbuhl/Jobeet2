<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UsersTableSeeder');
		$this->call('EnterpriseTableSeeder');
		$this->call('OffersTableSeeder');
		$this->call('SkillTableSeeder');
		$this->call('UserSkillTableSeeder');
		$this->call('OfferSkillTableSeeder');							
		$this->call('ChatTableSeeder');
		$this->call('ApplicationTableSeeder');
	}

}
