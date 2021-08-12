<?php

namespace App\Http\Controllers;

use Auth;
use App\Repositories\SalesforceRepository;
use App\Services\ContractService;
use App\Http\Requests\ContractsRequest;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class ContractController extends Controller
{
    /**
     * ContractController constructor.
     */
    public function __construct(ContractService $contractService)
    {
        parent::__construct();
        $this->salesForce = new SalesforceRepository();
        $this->contractService = $contractService;
    }

    public function list()
    {
        $user = User::with(['company'])->find(Auth::user()->id);
        $user_data['companyName'] = $user['company'] ?  $user['company']['name'] : '';

        return view('contracts', ['user_data' => $user_data]);
    }

    /**
     * Retrieve Contracts list.
     */
    public function index(ContractsRequest $request)
    {
        $request->validated();

        try {
            $conditions = [
                'page' => $request->getPage(),
                'limit' => $request->getLimit(),
            ];
            $allresults = $this->salesForce->getContracts(Session::get('salesforceCompanyID'), 0, 200);
            $total = count($allresults);

            $results = $this->contractService->search($conditions);
            $this->response = [
                'success' => true,
                'data' => $results,
                'pageCount' => $total,
                'lastPage' => (int) ceil($total / $request->getLimit()),
                'code' => 200,
            ];
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }
}
