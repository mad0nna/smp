<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function($table)
        {
            $table->string('title', 64)->nullable(false)->default('')->change();
        });
    }

    public function down()
    {
    }
}
