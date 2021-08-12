<?php

namespace App\Services;

use App\Repositories\SalesforceRepository;
use App\Exceptions\ContractsNotFoundException;
use Illuminate\Support\Facades\Session;

class ContractService
{
    /**
     * ContractService constructor.
     */
    public function __construct()
    {
        $this->salesForce = new SalesforceRepository();
    }

    /**
     * Retrieves list of Contracts
     */
    public function search($conditions)
    {
        try {
            $page = 1;
            $limit = config('search.results_per_page');

            if (array_key_exists('page', $conditions) === true) {
                $page = $conditions['page'];
            }

            if (array_key_exists('limit', $conditions) === true) {
                $limit = $conditions['limit'];
            }

            $skip = ($page > 1) ? ($page * $limit - $limit) : 0;

            $results = $this->salesForce->getContracts(Session::get('salesforceCompanyID'), $skip, $limit);

            return $results;
        } catch (ContractsNotFoundException $e) {
            throw new ContractsNotFoundException;
        }
    }
}
