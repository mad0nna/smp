<?php

return array(
  'table' => array(
    'mshop_order' => function ( \Doctrine\DBAL\Schema\Schema $schema ) {
        $table = $schema->getTable( 'mshop_order' );
        $table->addColumn(  'payment_type', 'string', [ 'length' => 255, 'notnull' => false ] );
        return $schema;
    },
  ),
);
