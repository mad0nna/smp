<?php

namespace Tests\Unit;

use Hash;
use Tests\TestCase;
use App\Models\User;
use App\Models\PasswordReset;
use App\Services\UserService;
use App\Services\PasswordService;

class PasswordServiceTest extends TestCase
{
    /** @var App\Services\PasswordService */
    protected $passwordService;

    /** @var string */
    protected static $TOKEN;

    /** @var App\Models\User */
    protected static $USER;

    /** @var string */
    protected static $PASSWORD = 'n3wp@ssw0rd';

    /** @var array */
    protected static $DATA = [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john@test.com',
        'password' => '!p4ssW0rd',
    ];

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();
        // create the user temporarily
        self::$USER = (new UserService(new User))->create(self::$DATA);
    }

    /**
     * PasswordServiceTest constructor.
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();

        $this->passwordService = new PasswordService(
                                    new PasswordReset,
                                    new UserService(new User)
                                );
    }

    public function testforgotWithInvalidEmail()
    {
        $this->expectException('InvalidArgumentException');
        $this->expectExceptionMessage('Invalid email address.');

        $this->passwordService->forgot('notAnEmail');
    }

    public function testforgotWithNonExistingUser()
    {
        $this->expectException('App\Exceptions\UserNotFoundException');
        $this->expectExceptionMessage('Unable to retrieve user.');

        $this->passwordService->forgot('me@test.com');
    }

    public function testForgotPassword()
    {
        $passwordReset = $this->passwordService->forgot(self::$DATA['email']);
        $this->assertTrue(($passwordReset instanceof PasswordReset));
        // get the reset token
        self::$TOKEN = $passwordReset->token;
    }

    public function testResetInvalidDataPassed()
    {
        $this->expectException('TypeError');

        $this->passwordService->reset('string');
    }

    public function testResetMissingTokenParam()
    {
        $this->expectException('InvalidArgumentException');
        $this->expectExceptionMessage('Missing required token field.');

        $this->passwordService->reset(['password' => 'a']);
    }

    public function testResetMissingPasswordParam()
    {
        $this->expectException('InvalidArgumentException');
        $this->expectExceptionMessage('Missing required password field.');

        $this->passwordService->reset(['token' => 'a']);
    }

    public function testResetInvalidExpiredToken()
    {
        $this->expectException('App\Exceptions\InvalidPasswordResetTokenException');
        $this->expectExceptionMessage('Invalid/Expired Password Reset Token.');

        $this->passwordService->reset([
            'token' => '12345adsfr1234',
            'password' => 'p@ssw0rd',
        ]);
    }

    public function testReset()
    {
        $user = $this->passwordService
                    ->reset([
                        'token' => self::$TOKEN,
                        'password' => self::$PASSWORD,
                    ]);

        $this->assertTrue($user instanceof User);

        // verify password is updated
        $this->assertTrue(Hash::check(self::$PASSWORD, $user->password));

        // delete user after test
        self::$USER->delete();
    }
}
