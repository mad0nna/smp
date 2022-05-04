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
        $convertedValue = $value;

        /**
         * There's an issue if we convert han-kaku characters to "han-kaku" again,
         * It will be converted to zen-kaku. I don't know why.
         * 
         * Zen-kaku (full width) characters are using UTF-8 encoding while
         * han-kaku (half width) characters are using ASCII encoding.
         * 
         */
        if (mb_detect_encoding($value) === 'UTF-8') {
            /**
             * Convert "zen-kaku" alphabets, numbers, spaces, special characters to "han-kaku".
             * 
             * Documentation: https://www.php.net/mb_convert_kana
             */
            $convertedValue = mb_convert_kana($value, $mode = "asnA");
        }
        
        return (bool) preg_match(self::$RULES, $convertedValue);
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
