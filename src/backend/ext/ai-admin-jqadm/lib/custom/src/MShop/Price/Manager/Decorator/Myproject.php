<?php

namespace Aimeos\MShop\Price\Manager\Decorator;

class Myproject extends \Aimeos\MShop\Common\Manager\Decorator\Base
{
    private $attr = [
        'unit_price' => [
            'code' => 'unit_price',
            'internalcode' => 'mpri."unit_price"',
            'label' => 'Unit Price',
            'type' => 'float',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_FLOAT,
        ],
        'min_qty' => [
            'code' => 'min_qty',
            'internalcode' => 'mpri."min_qty"',
            'label' => 'Min. Qty',
            'type' => 'integer',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_INT,
        ],
    ];

    public function getSaveAttributes() : array
    {
        return parent::getSaveAttributes() + $this->createAttributes( $this->attr );
    }

    public function getSearchAttributes( bool $sub = true ) : array
    {
        return parent::getSearchAttributes( $sub ) + $this->createAttributes( $this->attr );
    }
}