<?php

namespace Aimeos\MShop\Order\Manager\Decorator;

class Myproject extends \Aimeos\MShop\Common\Manager\Decorator\Base
{
    private $attr = [
        'payment_type' => [
            'code' => 'payment_type',
			'internalcode' => 'mord."payment_type"',
            'label' => 'Payment Type',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
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