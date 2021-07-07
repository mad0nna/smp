<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\SalesforceRepository;
use App\Services\ContractService;
use App\Http\Requests\ContractsRequest;
use Illuminate\Support\Facades\Session;

class ContractController extends Controller
{
    /**
     * ContractController constructor.
     *
     */
    public function __construct(ContractService $contractService)
    {
        parent::__construct();
        $this->salesForce = new SalesforceRepository();
        $this->contractService = $contractService;
    }

    /**
     * Retrieve Contracts list.
     *
     */
    public function index(ContractsRequest $request)
    {
        $request->validated();
        try{
            $conditions = [
                'page' => $request->getPage(),
                'limit' => $request->getLimit(),
            ];
            $allresults = $this->salesForce->getContracts(Session::get('salesforceCompanyID'),0,200);
            $total = count($allresults);

            $results = $this->contractService->search($conditions);
            $this->response = [
                'success' => true,
                'data'    =>  $results,
                'pageCount' => $total,
                'lastPage' =>(int)ceil($total / $request->getLimit()),
                'code'    => 200,
            ];
        }catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }
        return response()->json($this->response, $this->response['code']);

        }
    }
