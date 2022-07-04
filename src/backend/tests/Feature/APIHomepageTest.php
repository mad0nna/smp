<?php

namespace Tests\Feature;

use Tests\TestCase;

class APIHomepageTest extends TestCase
{
    public function setUp(): void
    {
        $this->markTestSkipped('all tests in this file are invactive for this server configuration!');

        parent::setUp();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testHomepageResponse()
    {
        $response = $this->json('GET', '/' . config('app.api_version'));
        $response->assertStatus(200);
    }
}
