<?php

use App\Models\File;
use Illuminate\Database\Seeder;

class FilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(File::class)->create([
            'file_path' => "BillingCSVs/sample_csv_file.csv", // File path to S3 or public
            'file_type' => "csv",
            'name' => "sample_csv_file.csv",
            'company_id' => 3,
        ]);
    }
}
