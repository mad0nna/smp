<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Password implements Rule
{
    /**
     * Rules
     *  - 8 Characters
     *  - 1 Uppercase
     *  - 1 Special Character
     *
     * @var string
     */
    private static $RULES = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/';

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return (bool) preg_match(self::$RULES, $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'パスワードは以下の内容を有する必要があります。　1文字以上の大文字、1文字以上の特殊記号を含む最低8桁以上の英数字';
    }
}
