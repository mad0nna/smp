<?php

use Illuminate\Database\Seeder;
use App\Models\WidgetSettings;

class widgetSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $widget = new WidgetSettings();
        $widget->coordinates = $widget->getCompanyDefaultCoordinates();
        $widget->user_id = 3;
        $widget->save();
    }
}
