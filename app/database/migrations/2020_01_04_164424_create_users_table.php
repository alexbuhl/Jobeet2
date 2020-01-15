<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function($t)
		{
			$t->increments('id');
			$t->text('username');
			$t->text('email');
			$t->text('password');
			$t->integer('role');
			$t->text('description');
			$t->text('hobbie');
			$t->text('company');
			$t->integer('identerprise');
			$t->longText('image');
			$t->boolean('isPremium');
			$t->boolean('off');
			$t->boolean('onsoft');
			$t->boolean('onhard');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
