<?php

namespace App\Repositories;

use Hash;
use Exception;
use App\Models\User;
use App\Models\UserStatus;
use Illuminate\Http\Request;
use App\Exceptions\UserLockedException;
use App\Exceptions\UserPendingException;
use App\Exceptions\AuthModelNotSetException;
use App\Exceptions\UserStatusNotFoundException;
use App\Exceptions\InvalidUserPasswordException;
use App\Exceptions\InvalidUserCredentialsException;
use Laravel\Passport\Bridge\User as PassportUser;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Repositories\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    /** @var Illuminate\Http\Request */
    protected $request;

    /** @var array */
    private $statusError;

    /**
     * UserRepository constructor.
     *
     * @param Illuminate\Http\Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;

        $this->statusError = [
            config('user.statuses.pending') => new UserPendingException,
            config('user.statuses.locked') => new UserLockedException,
        ];
    }

    /**
     * Overrides the default Laravel Passport
     * authentication to verify also the Device Id
     *
     * @param string $username
     * @param string $password
     * @param string $grantType
     * @param ClientEntityInterface $clientEntity
     * @return Laravel\Passport\Bridge\User
     */
    public function getUserEntityByUserCredentials($username, $password, $grantType, ClientEntityInterface $clientEntity)
    {
        try {
            // set the api provider
            $provider = config('auth.guards.api.provider');

            // retrive the model for authentication
            $model = config("auth.providers.{$provider}.model");

            // verify if model is provided
            if (!($model)) {
                throw new AuthModelNotSetException;
            }

            // checks if user exist
            $user = (new $model)->with('status')
                        ->where('email', $username)
                        ->first();

            // if user not found
            if (!($user)) {
                throw new InvalidUserCredentialsException;
            }

            if (array_key_exists($user->status->name, $this->statusError)) {
                throw $this->statusError[$user->status->name];
            }

            // verify password
            if (Hash::check($password, $user->password) === false) {
                $this->updateLoginAttempts($user);

                throw new InvalidUserPasswordException;
            }

            // reset number of attempts if password is correct
            $user->login_attempts = 0;
            $user->save();
        } catch (Exception $e) {
            // Throw the custom OAuthServerException
            throw new OAuthServerException($e->getMessage(), 401, $e->errorType, 401);
        }

        return new PassportUser($user->getAuthIdentifier());
    }

    /**
     * Will update Login attempts.
     * @param App/Models/User $user
     * @return void
     */
    public function updateLoginAttempts(User $user)
    {
        if ($user->login_attempts >= config('auth.max_login_attempts')) {
            // get account status
            $user_status = UserStatus::where('name', config('user.statuses.locked'))->first();

            if (!($user_status instanceof UserStatus)) {
                throw new UserStatusNotFoundException;
            }

            // update user status
            $user->update(['user_status_id' => $user_status->id]);

            throw new UserLockedException;
        }

        $user->login_attempts += 1;
        $user->save();
    }
}
