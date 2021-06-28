<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NotificationTarget extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_target', function (Blueprint $table) {
            $table->unsignedBigInteger("user_id");
            $table->string("notification_type");
            $table->integer('notification_id')->nullable();
            $table->timestamp('notification_seen_timestamp')->nullable();
            $table->string('article_id')->nullable();
            $table->timestamp('article_seen_timestamp')->nullable();


            $table->foreign('user_id')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('notification_target');
    }
}
