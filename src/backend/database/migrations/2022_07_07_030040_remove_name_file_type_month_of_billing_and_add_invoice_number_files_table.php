<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveNameFileTypeMonthOfBillingAndAddInvoiceNumberFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn(['name', 'file_type', 'month_of_billing']);
            $table->string('invoice_number')->nullable()->after('file_path');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->string('name')->nullable()->after('file_path');
            $table->string('file_type')->after('name');
            $table->date('month_of_billing')->nullable()->after('file_type');
            $table->dropColumn('invoice_number');
        });
    }
}
