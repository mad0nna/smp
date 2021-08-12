<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class addCompaniesColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('account_id')->nullable()->nullable()->after('zen_org_name');
            $table->string('industry_sub')->nullable();
            $table->string('industry_sub2')->nullable();
            $table->string('paymentMethod')->nullable();
            $table->string('status')->nullable();
            $table->string('token')->nullable();
            $table->string('kot_trans_type')->nullable();
            $table->string('payment_method')->nullable();
            $table->json('sf_records')->nullable();

            $table->unique('company_code');
            $table->unique('account_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('account_id');
            $table->dropColumn('industry_sub');
            $table->dropColumn('industry_sub2');
            $table->dropColumn('paymentMethod');
            $table->dropColumn('status');
            $table->dropColumn('token');
            $table->dropColumn('kot_trans_type');
            $table->dropColumn('payment_method');
            $table->dropColumn('sf_records');

            $table->dropUnique('company_code');
            $table->dropUnique('account_id');
            $table->unique('contact_num');
        });
    }
}
