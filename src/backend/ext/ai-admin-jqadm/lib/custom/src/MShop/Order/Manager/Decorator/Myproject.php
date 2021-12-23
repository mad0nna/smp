<?php

namespace Aimeos\MShop\Order\Manager\Decorator;

class Myproject extends \Aimeos\MShop\Common\Manager\Decorator\Base
{
    private $attr = [
        'company_name' => [
            'code' => 'company_name',
            'internalcode' => 'mordba."company_name"',
            'label' => 'Company Name',
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