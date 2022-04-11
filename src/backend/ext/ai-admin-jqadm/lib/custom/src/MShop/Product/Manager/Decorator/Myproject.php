<?php

namespace Aimeos\MShop\Product\Manager\Decorator;

class Myproject extends \Aimeos\MShop\Common\Manager\Decorator\Base
{
    private $attr = [
        'barcode' => [
            'code' => 'barcode',
            'internalcode' => 'mpro."barcode"',
            'label' => 'Barcode',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
        ],
        'standard1' => [
            'code' => 'standard1',
            'internalcode' => 'mpro."standard1"',
            'label' => 'Standard 1',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
        ],
        'standard2' => [
            'code' => 'standard2',
            'internalcode' => 'mpro."standard2"',
            'label' => 'Barcode',
            'type' => 'string',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_STR,
        ],
        'delivery_slip_display' => [
            'code' => 'delivery_slip_display',
            'internalcode' => 'mpro."delivery_slip_display"',
            'label' => 'Delivery Slip Display',
            'type' => 'integer',
            'internaltype' => \Aimeos\MW\DB\Statement\Base::PARAM_INT,
        ],
        'inventory_alert_qty' => [
            'code' => 'inventory_alert_qty',
            'internalcode' => 'mpro."inventory_alert_qty"',
            'label' => 'Inventory Alert Qty',
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