<?php

namespace App\Services;

use App\Exceptions\ContractsNotFoundException;
use App\Services\API\Salesforce\Model\Opportunity;
use Illuminate\Support\Facades\Session;

class ContractService
{
    /**
     * ContractService constructor.
     */
    public function __construct()
    {
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
            $results = (new Opportunity)->findByAccountID(Session::get('salesforceCompanyID'), $skip, $limit);

            return $results;
        } catch (ContractsNotFoundException $e) {
            throw new ContractsNotFoundException;
        }
    }
}
