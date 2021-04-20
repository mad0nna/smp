<?php

namespace Tests\Feature;

use Hash;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Exceptions\UserNotFoundException;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class UserCRUDTest extends TestCase
{
    use WithoutMiddleware;

    /** @var array */
    private $data;

    /** @var array */
    private static $ADMIN;

    /** @var string */
    private static $ACCESS_TOKEN;

    /** @var stdClass */
    private static $USER;

    public function setUp(): void
    {
        parent::setUp();

        // set admin details
        self::$ADMIN = [
            'email' => 'admin@tcg.sprobe.ph',
            'password' => 'Password2020!',
        ];

        // Login as Admin once only
        if (!self::$ACCESS_TOKEN) {
            $response = $this->json(
                            'POST',
                            '/' . config('app.api_version') . '/oauth/token',
                            [
                                'client_id' => (integer) config('app.client_id'),
                                'client_secret' => config('app.client_secret'),
                                'grant_type' => 'password',
                                'username' => self::$ADMIN['email'],
                                'password' => self::$ADMIN['password'],
                            ]
                        );
            $result = json_decode((string) $response->getContent());

            // store access token to be used in testing
            self::$ACCESS_TOKEN = $result->access_token;
        }
    }

    /**
     * UserCRUDTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();

        Storage::fake('public');

        // test variables
        $this->data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@tcg.sprobe.ph',
            'password' => '!p4ssW0rd',
        ];
    }

    public function testCreateWithMissingParams()
    {
        $params = $this->data;
        unset($params['first_name']);
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('POST', '/' . config('app.api_version') . '/users', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array('The first name field is required.', $result->error->first_name));
    }

    public function testCreateWithInvalidEmail()
    {
        $params = $this->data;
        $params['email'] = 'notAValidEmail@';
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('POST', '/' . config('app.api_version') . '/users', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array('Invalid email address.', $result->error->email));
    }

    public function testCreateWithExistingEmail()
    {
        $params = $this->data;
        $params['email'] = self::$ADMIN['email'];
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('POST', '/' . config('app.api_version') . '/users', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array('The email has already been taken.', $result->error->email));
    }

    public function testCreateInvalidPasswordFormat()
    {
        $params = $this->data;
        $params['password'] = 'notvalidpassword!';
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('POST', '/' . config('app.api_version') . '/users', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array(
            'Password must contain the following: 1 uppercase, 1 special character and a minimum of 8 characters.',
            $result->error->password
        ));
    }

    public function testCreate()
    {
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('POST', '/' . config('app.api_version') . '/users', $this->data);
        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        self::$USER = $result->data;

        foreach ($this->data as $key => $value) {
            // password is not returned in response
            if ($key === 'password') {
                continue;
            }
            // validate if user data matches the params of the request
            $this->assertEquals(self::$USER->$key, $value);
        }
    }

    public function testReadUserNotFound()
    {
        $response = $this->withHeaders([
                        'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                    ])
                    ->json('GET', '/' . config('app.api_version') . '/users/999999999999');
        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals((new UserNotFoundException)->getMessage(), $result->error);
    }

    public function testRead()
    {
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('GET', '/' . config('app.api_version') . '/users/' . self::$USER->id);
        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $user = $result->data;

        foreach ($this->data as $key => $value) {
            // password is not returned in response
            if ($key === 'password') {
                continue;
            }
            // validate if user data matches the created user
            $this->assertEquals(self::$USER->$key, $value);
        }
    }

    public function testUpdateMissingParams()
    {
        $params = $this->data;
        unset($params['first_name']);
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array('The first name field is required.', $result->error->first_name));
    }

    public function testUpdateInvalidEmail()
    {
        $params = $this->data;
        $params['email'] = 'notAValidEmail@';
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array('Invalid email address.', $result->error->email));
    }

    public function testUpdateExistingUserEmail()
    {
        $params = $this->data;
        $params['email'] = self::$ADMIN['email'];
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array('The email has already been taken.', $result->error->email));
    }

    public function testUpdateInvalidPasswordFormat()
    {
        $params = $this->data;
        $params['password'] = 'notvalidpassword!';
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array(
            'Password must contain the following: 1 uppercase, 1 special character and a minimum of 8 characters.',
            $result->error->password
        ));
    }

    public function testUpdateInvalidAvatarType()
    {
        $params = $this->data;
        $params['avatar'] = UploadedFile::fake()->create('test.pdf');
        $response = $this->withHeaders([
                    'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                ])
                ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array(
            'The avatar must be an image.',
            $result->error->avatar
        ));
        $this->assertTrue(in_array(
            'The avatar must be a file of type: jpeg, png, jpg, gif.',
            $result->error->avatar
        ));
    }

    public function testUpdateInvalidAvatarFileSize()
    {
        $params = $this->data;
        $params['avatar'] = UploadedFile::fake()->create('avatar.jpg')->size(2100); // current limit 2MB testing 2.1 MB
        $response = $this->withHeaders([
                    'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                ])
                ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue(in_array(
            'The avatar may not be greater than 2048 kilobytes.',
            $result->error->avatar
        ));
    }

    public function testUpdate()
    {
        $params = [
            'first_name' => 'Johnny',
            'last_name' => 'Doey',
            'email' => 'johnnyDoey@tcg.sprobe.ph',
            'password' => '!n3wp4ssW0rd',
            'avatar' => UploadedFile::fake()->create('avatar.jpg'),
        ];

        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $updatedUser = $result->data;

        foreach ($params as $key => $value) {
            // password is not returned in response
            if ($key === 'password') {
                continue;
            }

            if ($key === 'avatar') {
                // remove root url
                $file = str_replace(config('app.storage_disk_url'), '', $result->data->avatar);
                $this->assertNotNull($result->data->avatar);

                // Assert the file was stored...
                Storage::disk('public')->assertExists($file);

                continue;
            }

            // validate if user data matches the created user
            $this->assertEquals($updatedUser->$key, $value);
        }

        self::$USER = $updatedUser;
    }

    public function testUpdateWithExistingAvatarbutNoFileUploaded()
    {
        $params = [
            'first_name' => 'Johnny',
            'last_name' => 'Doey',
            'email' => 'johnnyDoey@tcg.sprobe.ph',
            'password' => '!n3wp4ssW0rd',
            'avatar' => null,
        ];

        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $updatedUser = $result->data;

        foreach ($params as $key => $value) {
            // password is not returned in response
            if ($key === 'password') {
                continue;
            }

            if ($key === 'avatar') {
                // verify avatar is retained if user didnt uploaded new image
                $this->assertEquals($result->data->avatar, self::$USER->avatar);

                continue;
            }

            // validate if user data matches the created user
            $this->assertEquals($updatedUser->$key, $value);
        }
    }

    public function testUpdateExcludePassword()
    {
        $params = [
            'first_name' => 'Johnny',
            'last_name' => 'Doey',
            'email' => 'johnnyDoey@tcg.sprobe.ph',
            'password' => null,
            'avatar' => UploadedFile::fake()->create('avatar.jpg'),
        ];

        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $updatedUser = $result->data;

        foreach ($params as $key => $value) {
            // password is not returned in response
            if ($key === 'password' || $key === 'avatar') {
                continue;
            }

            // validate if user data matches the created user
            $this->assertEquals($updatedUser->$key, $value);
        }

        $user = User::find($result->data->id);

        // verify password was not updated
        Hash::check('!n3wp4ssW0rd', $user->password);
    }

    public function testDeleteUserNotFound()
    {
        $response = $this->withHeaders([
                                'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                            ])
                            ->json('DELETE', '/' . config('app.api_version') . '/users/999999999');
        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals((new UserNotFoundException)->getMessage(), $result->error);
    }

    public function testDelete()
    {
        $response = $this->withHeaders([
                            'Authorization' => 'Bearer ' . self::$ACCESS_TOKEN,
                        ])
                        ->json('DELETE', '/' . config('app.api_version') . '/users/' . self::$USER->id);
        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertTrue($result->deleted);
    }
}
