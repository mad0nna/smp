<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Opportunities extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('opportunities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('opportunity_code')->unique();
            $table->string('negotiate_code')->unique();
            $table->unsignedBigInteger('company_id')->index();
            $table->string('record_type_code');
            $table->float('amount')->nullable();
            $table->string('type');
            $table->string('name');
            $table->string('stage');
            $table->string('zen_negotiate_owner')->nullable();
            $table->timestamp('sf_created_date');
            $table->timestamps();

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
        Schema::dropIfExists('opportunities');
    }
}
