<?php

return array(
  'table' => array(
    'mshop_order' => function ( \Doctrine\DBAL\Schema\Schema $schema ) {
        $table = $schema->getTable( 'mshop_order' );
        $table->addColumn(  'payment_type', 'string', [ 'length' => 255, 'notnull' => false ] );
        return $schema;
    },
    'mshop_order_base' => function ( \Doctrine\DBAL\Schema\Schema $schema ) {
        $table = $schema->getTable( 'mshop_order_base' );
        $table->addColumn(  'last_name', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'first_name', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'company_id', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'company_name', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'email', 'string', [ 'length' => 255, 'notnull' => false ] );
        $table->addColumn(  'contact_num', 'string', [ 'length' => 255, 'notnull' => false ] );
        return $schema;
    },
  ),
);
