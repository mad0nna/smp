<?php

return [
    'statuses' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
        'blocked' => 'Blocked',
        'archived' => 'Archived',
        'pending' => 'Pending',
        'locked' => 'Locked',
    ],
    'types' => [
            'admin' => [
                'name' => 'Admin',
                'dashboard_url' => '/admin/dashboard',
            ],
            'H&T' => [
                'name' => 'H&T',
                'dashboard_url' => '/admin/dashboard',
            ],
            'client' => [
                'name' => 'Company Admin',
                'dashboard_url' => '/company/dashboard',
            ],
            'subClient' => [
                'name' => 'Sub Company Admin',
                'dashboard_url' => '/company/dashboard',
            ],
            'sales' => [
                'name' => 'Sales Agent',
                'dashboard_url' => '/sales/dashboard',
            ],
            'employee' => [
                'name' => 'Employee',
                'dashboard_url' => '/employee/dashboard',
            ],
    ],
];
