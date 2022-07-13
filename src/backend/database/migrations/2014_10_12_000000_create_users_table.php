<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username')->unique();
            $table->string('account_code')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('contact_num')->nullable();
            $table->string('password')->nullable();
            $table->unsignedBigInteger('user_type_id')->nullable();
            $table->string('title')->nullable();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->string('sso_token')->nullable();
            $table->rememberToken()->nullable();
            $table->unsignedBigInteger('user_status_id')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
            $table->string('temp_pw')->nullable();
            $table->string('invite_token')->nullable();
            

            $table->foreign('user_status_id')
                ->references('id')
                ->on('user_statuses')
                ->onDelete('cascade');

            $table->foreign('user_type_id')
                ->references('id')
                ->on('user_types')
                ->onDelete('cascade');

            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
