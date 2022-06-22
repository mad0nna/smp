<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Http\Resources\UserResource;

class HelperTest extends TestCase
{
    public function setUp(): void
    {
        $this->markTestSkipped('all tests in this file are invactive for this server configuration!');

        parent::setUp();
    }
    
    public function testPaginatedInvalidResultsType()
    {
        $this->expectException('Exception');
        $this->expectExceptionMessage('Parameter results must be from an eloquent paginate query.');

        paginated([], UserResource::class, 1, []);
    }

    public function testPaginated()
    {
        $result = paginated(User::paginate(10), UserResource::class, 1, ['limit' => 10, 'keyword' => 'a']);

        $this->assertTrue(is_array($result));
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('meta', $result);
        $this->assertArrayHasKey('total', $result['meta']);
        $this->assertArrayHasKey('currentPage', $result['meta']);
        $this->assertArrayHasKey('lastPage', $result['meta']);
        $this->assertArrayHasKey('perPage', $result['meta']);
        $this->assertArrayHasKey('previousPageUrl', $result['meta']);
        $this->assertArrayHasKey('nextPageUrl', $result['meta']);
        $this->assertArrayHasKey('url', $result['meta']);
    }

    public function testGetInitials()
    {
        $this->assertEquals('JD', get_initials('John Doe'));
    }
}
