<?php

return array(
  'table' => array(
    'mshop_product' => function ( \Doctrine\DBAL\Schema\Schema $schema ) {
        $table = $schema->getTable( 'mshop_product' );
        $table->addColumn(  'barcode', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'standard1', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'standard2', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'delivery_slip_display', 'integer', ['default' => 0, 'notnull' => false] );
        $table->addColumn(  'inventory_alert_qty', 'integer', ['default' => 0, 'notnull' => false] );
        return $schema;
    },
  ),
);
