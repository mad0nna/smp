<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->string('company_code')->nullable();
            $table->string('name');
            $table->string('contact_num')->nullable();
            $table->string('website')->nullable();
            $table->string('industry')->nullable();
            $table->string('billing_street')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_postal_code')->nullable();
            $table->string('billing_country')->nullable();
            $table->string('zen_org_name')->nullable();
            $table->string('kot_billing_start_date')->nullable();
            $cs = $table->string('account_id')->charset('utf8')->collate('utf8_cs')->unique()->nullable();
            $table->string('industry_sub')->nullable();
            $table->string('industry_sub2')->nullable();
            $table->string('card_brand')->nullable();
            $table->string('last_four_digit')->nullable();
            $table->string('expmm')->nullable();
            $table->string('expyr')->nullable();
            $table->string('status')->nullable();
            $table->string('token')->nullable();
            $table->string('kot_trans_type')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('record_type_code')->nullable();
            $table->timestamps();

            $table->unique('company_code');
            $cs->collation = 'utf8_bin';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
