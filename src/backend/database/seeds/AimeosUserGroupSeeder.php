<?php

use App\Models\AimeosUserGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AimeosUserGroupSeeder extends Seeder
{
    public function run()
    {
        $dt = new DateTime();
        $rows = [
            [
                'parentid' => 1,
                'siteid' => '1.',
                'key' => 'customer/group|default|2',
                'type' => 'default',
                'domain' => 'customer/group',
                'refid' => '2',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 0,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'parentid' => 2,
                'siteid' => '1.',
                'key' => 'customer/group|default|2',
                'type' => 'default',
                'domain' => 'customer/group',
                'refid' => '2',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 0,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'parentid' => 3,
                'siteid' => '1.',
                'key' => 'customer/group|default|2',
                'type' => 'default',
                'domain' => 'customer/group',
                'refid' => '2',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 0,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
        ];

        DB::table('users')->where('id', 1)->update(['superuser' => 0, 'siteid' => '1.']);
        DB::table('users')->where('id', 2)->update(['superuser' => 0, 'siteid' => '1.']);
        DB::table('users')->where('id', 3)->update(['superuser' => 1]);
           
        foreach ($rows as $row) {
            AimeosUserGroup::create($row);
        }
    }
}
