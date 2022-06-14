<?php

return array(
  'table' => array(
    'mshop_order_base' => function ( \Doctrine\DBAL\Schema\Schema $schema ) {
        $table = $schema->getTable( 'mshop_order_base' );
        $table->addColumn(  'last_name', 'string', [ 'length' => 255, 'notnull' => false ] );
        return $schema;
    },
  ),
);
