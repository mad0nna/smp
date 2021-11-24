<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProductTable extends Migration
{
    public function up()
    {
        Schema::table('mshop_product', function (Blueprint $table) {            
            $table->string('barcode')->nullable()->after('url');
            $table->string('standard1')->nullable()->after('barcode');
            $table->string('standard2')->nullable()->after('standard1');
            $table->string('delivery_slip_display')->default(0)->after('standard2');
            $table->integer('inventory_alert_qty')->default(0)->after('delivery_slip_display');
        });
    }

    public function down()
    {
        Schema::table('mshop_product', function (Blueprint $table) {
            $table->dropColumn('barcode');
            $table->dropColumn('standard1');
            $table->dropColumn('standard2');
            $table->dropColumn('delivery_slip_display');
            $table->dropColumn('inventory_alert_qty');
        });
    }
}
