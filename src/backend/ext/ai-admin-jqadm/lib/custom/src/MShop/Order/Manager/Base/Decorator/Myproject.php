<?php

namespace Aimeos\MShop\Order\Manager\Base\Decorator;

class Myproject extends \Aimeos\MShop\Common\Manager\Decorator\Base
{
    private $attr = [
        'last_name' => [
            'code' => 'last_name',
			'internalcode' => 'mordba."last_name"',
            'label' => 'Last Name',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
        ],
        'first_name' => [
            'code' => 'first_name',
			'internalcode' => 'mordba."first_name"',
            'label' => 'First Name',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
        ],
        'company_id' => [
            'code' => 'company_id',
			'internalcode' => 'mordba."company_id"',
            'label' => 'Company ID',
            'type' => 'integer',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_INT,
        ],
        'company_name' => [
            'code' => 'company_name',
			'internalcode' => 'mordba."company_name"',
            'label' => 'Company Name',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
        ],
        'email' => [
            'code' => 'email',
			'internalcode' => 'mordba."email"',
            'label' => 'Email',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
        ],
        'contact_num' => [
            'code' => 'contact_num',
			'internalcode' => 'mordba."contact_num"',
            'label' => 'Contact Number',
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