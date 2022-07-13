<?php
namespace Aimeos\MShop\Service\Provider\Payment;

class MyproviderTest extends \PHPUnit\Framework\TestCase
{
    private $object;
    private $serviceItem;


    protected function setUp() : void
    {
        // $context = TestHelperMShop::context();

        // $serviceManager = Aimeos\MShop\Factory::createManager( $context, 'service' );
        // $this->serviceItem = $serviceManager->create();

        // $this->object = $this->getMockBuilder( 'Aimeos\MShop\Service\Provider\Payment\Myprovider' )
        //     ->setMethods( ['getOrder', 'getOrderBase', 'saveOrder', 'saveOrderBase', 'myConnection'] )
        //     ->setConstructorArgs( [$context, $this->serviceItem] )
        //     ->getMock();

        
    }

    protected function getOrderItem()
    {
        $manager = \Aimeos\MShop\Factory::createManager( TestHelperMShop::context(), 'order' );

        $search = $manager->filter();
        $search->setConditions( $search->compare( '==', 'order.datepayment', '2022-07-06' ) );

        $result = $manager->search( $search );

        if( ( $item = reset( $result ) ) === false ) {
            throw new Exception( 'No order found' );
        }

        return $item;
    }
}
