<?php

return array(
  'table' => array(
    'mshop_price' => function ( \Doctrine\DBAL\Schema\Schema $schema ) {
        $table = $schema->getTable( 'mshop_price' );
        $table->addColumn(  'unit_price', 'float', [ 'default' => 0.0, 'notnull' => false ] );
        $table->addColumn(  'min_qty', 'integer', [ 'default' => 0, 'notnull' => false ] );
        return $schema;
    },
  ),
);
