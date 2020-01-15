<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChatTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('chat', function($t)
		{
			$t->increments('id');
			$t->integer('idOffer');			
			$t->integer('idApplicant');
			$t->boolean('isFromOffer');
			$t->text('message');
		});	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('chat');
	}

}
