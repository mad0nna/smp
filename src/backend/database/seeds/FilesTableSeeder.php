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
            'file_path' => "BillingCSVs/0010l00001IFH5GAAX/INV00042551", // File path to S3 or public
            'invoice_number' => "INV00042551",
            'company_id' => 3,
        ]);
    }
}
