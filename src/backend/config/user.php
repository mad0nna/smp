<?php

return [
    'statuses' => [
        'active' => [
            'name' => 'Active',
            'status_alias' => 'アクティブ'
        ],
        'inactive' => [
            'name' => 'Inactive',
            'status_alias' => ''
        ],
        'blocked' => [
            'name' => 'Blocked',
            'status_alias' => ''
        ],
        'archived' => [
            'name' => 'Archived',
            'status_alias' => ''
        ],
        'pending' => [
            'name' => 'Pending',
            'status_alias' => '保留中'
        ],
        'locked' => [
            'name' => 'Locked',
            'status_alias' => ''
        ],
    ],
    'types' => [
            'admin' => [
                'name' => 'Admin',
                'dashboard_url' => '/admin/dashboard',
                'type_alias' => ''
            ],
            'H&T' => [
                'name' => 'H&T',
                'dashboard_url' => '/admin/dashboard',
                'type_alias' => ''
            ],
            'client' => [
                'name' => 'Company Admin',
                'dashboard_url' => '/company/dashboard',
                'type_alias' => '管理者'
            ],
            'subClient' => [
                'name' => 'Sub Company Admin',
                'dashboard_url' => '/company/dashboard',
                'type_alias' => '副管理者'
            ],
            'sales' => [
                'name' => 'Sales Agent',
                'dashboard_url' => '/sales/dashboard',
                'type_alias' => ''
            ],
            'employee' => [
                'name' => 'Employee',
                'dashboard_url' => '/employee/dashboard',
                'type_alias' => ''
            ],
            'logistics' => [
                'name' => 'Logistics Admin',
                'dashboard_url' => '/logistics/dashboard',
                'type_alias' => ''
            ],
    ],
];
