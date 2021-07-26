<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TempInvoiceFile extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'TempInvoiceFile:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        array_map('unlink', glob(public_path('/temp/INVOICE - *.pdf')));
        echo "The temporary files was cleared!";
    }
}
