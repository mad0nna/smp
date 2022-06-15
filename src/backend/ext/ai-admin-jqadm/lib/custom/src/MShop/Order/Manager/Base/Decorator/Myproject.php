<?php

namespace Aimeos\MShop\Order\Manager\Base\Decorator;

class Myproject extends \Aimeos\MShop\Common\Manager\Decorator\Base
{
    private $attr = [
        'last_name' => [
            'code' => 'last_name',
			'internalcode' => 'mordbase."last_name"',
            'label' => 'Last Name',
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