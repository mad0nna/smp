<?php

return [
    'customer' => [
        'manager' => [
            'decorators' => [
                'local' => ['Myproject']
            ]
        ]
    ],
    'product' => [
        'manager' => [
            'decorators' => [
                'local' => ['Myproject']
            ]
        ]
    ],
    'price' => [
        'manager' => [
            'decorators' => [
                'local' => ['Myproject']
            ]
        ],
        'taxflag' => 0

    ],
    'order' => [
        'manager' => [
            'base' => [                 
                'decorators' => [
                    'local' => ['Myproject']
                ]               
            ],
            'decorators' => [
                'local' => ['Myproject']
            ]
        ]
    ],
];
