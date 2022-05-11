<?php

namespace App\Http\Controllers;

use App\Http\Requests\TemplateRequest;
use App\Models\Template;
use App\Models\TemplateTarget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use \TonchikTm\PdfToHtml\Pdf;
use Illuminate\Support\Facades\DB;
use App\Services\TemplateProcessor;
use Illuminate\Database\Eloquent\Collection;

class TemplateController extends Controller
{

    public function uploadNewTemplate(Request $request) {
        $data = json_decode($request->get('data'), true);
        $templateName = $data['fileName'];
        $templateName = explode('.', $templateName)[0];
        if(Storage::exists("template/html/{$templateName}.html")) {
            Throw new RuntimeException('Template is already exists.');
        }
        $request->file('pdf')->storeAs('temp/template', "$templateName.pdf", 'template');
        $pdf = new Pdf("temp/template/$templateName.pdf", [
            'pdftohtml_path' => '/usr/bin/pdftohtml',
            'pdfinfo_path' => '/usr/bin/pdfinfo',
            'inlineCss' => true, // replaces css classes to inline css rules
            'inlineImages' => true,
            'onlyContent' => true,
            'clearAfter' => true,
            'removeOutputDir' => true
        ]);
        $html = $pdf->getHtml()->getPage(1);
        $myfile = fopen(storage_path("app/template/html/$templateName.html"), "w");
        fwrite($myfile, $html);
        fclose($myfile);

        $templateID = $this->addTemplate($templateName);

        $rightList = json_decode(json_encode($data['rightList']), true);
        $leftList = json_decode(json_encode($data['leftList']), true);
        $toBeRemoved = $this->getOnlyId($leftList);
        $toBeAdded = $this->getOnlyId($rightList);
        $this->addTemplateUser($templateID, $toBeAdded);
        $this->removeTemplateUser($templateID, $toBeRemoved);
        return ["status" => "success"];
    }
    public function updateTemplate(Request $request) {
        $data = json_decode($request->get('data'), true);
        $templateName = $data['fileName'];
        $templateName = explode('.', $templateName)[0];
        $templateID = $data['templateID'];
        $oldTemplateName = $data['oldTemplateName'];
        if (empty($templateID)) {
            Throw new RuntimeException("Template id does not exist.");
        }
        if(!Storage::exists("template/html/{$oldTemplateName}.html")) {
            Throw new RuntimeException("Template does not exist.");
        } else {
            Storage::delete("template/html/{$oldTemplateName}.html");
        }
        if ($data['changeFile']) {
            $request->file('pdf')->storeAs('temp/template', "$templateName.pdf", 'template');
        }
        $pdf = new Pdf("temp/template/$templateName.pdf", [
            'pdftohtml_path' => '/usr/bin/pdftohtml',
            'pdfinfo_path' => '/usr/bin/pdfinfo',
            'inlineCss' => true, // replaces css classes to inline css rules
            'inlineImages' => true,
            'onlyContent' => true
        ]);
        $html = $pdf->getHtml()->getPage(1);
        $myfile = fopen(storage_path("app/template/html/$templateName.html"), "w");
        fwrite($myfile, $html);
        fclose($myfile);

        Template::where('id', $templateID)
                    ->where('template_name', $oldTemplateName)
                    ->update(['template_name' => $templateName]);
        TemplateTarget::where('template_id', '=', $templateID)->delete();

        $rightList = json_decode(json_encode($data['rightList']), true);
        $leftList = json_decode(json_encode($data['leftList']), true);
        $toBeRemoved = $this->getOnlyId($leftList);
        $toBeAdded = $this->getOnlyId($rightList);

        $this->addTemplateUser($templateID, $toBeAdded);
        $this->removeTemplateUser($templateID, $toBeRemoved);
        return ["status" => "success"];
    }

    private function addTemplateUser($templateID, array $IDs) {
        for ($i=0; $i < count($IDs); $i++) { 
            TemplateTarget::insert(['company_id' => $IDs[$i], 'template_id' => $templateID]);
        }
    }

    private function removeTemplateUser($templateID, array $IDs) {
        TemplateTarget::where('template_id', $templateID)->whereIn('company_id', $IDs)->delete();
    }

    private function addTemplate($templateName, $s3Link='') {
        $template = new Template();
        $isExist = $template->where("template_name", $templateName)->get()->toArray();
        if (empty($isExist)) {
            $template->template_name = $templateName;
            $template->aws_s3_link = $s3Link;
            $template->save();
            return $template->id;
        }
        throw new RuntimeException("The template name is already added in the database");
    }

    private function getOnlyId(array $list) {
        $newList = [];
        foreach($list as $index => $company) {
            array_push($newList, $company["id"]);
        }
        return $newList;
    }

    public function getListOfTemplate(TemplateRequest $request) {
        $conditions = [
            'keyword' => $request->getKeyword(),
            'page' => $request->getPage(),
            'limit' => $request->getLimit(),
        ];
        $page = 1;
        $limit = config('search.results_per_page');
        if (array_key_exists('page', $conditions) === true) {
            $page = $conditions['page'];
        }
        if (array_key_exists('limit', $conditions) === true) {
            $limit = $conditions['limit'];
        }
        $skip = ($page > 1) ? ($page * $limit - $limit) : 0;
        $templates = Template::
        where('template_name', 'LIKE', "%$conditions[keyword]%")
        ->withCount(['targets'])
        ->skip($skip)
        ->orderBy('id', 'DESC')
        ->paginate($limit)
        ->withPath('/admin/templateList?' . http_build_query([
            'keyword' => $conditions['keyword'],
            'limit' => $limit,
        ]));

        $this->response = [
            'success' => true,
            'data' => $templates->items(),
            'pageCount' => $templates->total(),
            'lastPage' => $templates->lastPage(),
            'message' => 'Invoice templates retrieved successfully.',
            'code' => 200,
        ];
        return response()->json($this->response, $this->response['code']);
    }

    public function getTemplateDetail(Request $req) {
        $request = $req->all();
        $templateName = Template::select('template_name')->where('id', $request['templateID'])->get()->toArray();
        $templateUser = DB::table('invoice_templates_target as target')
                        ->leftJoin('companies', 'companies.id', '=', 'target.company_id')
                        ->select(['target.company_id as id', 'companies.name'])
                        ->where('target.template_id', '=', $request['templateID'])
                        ->get()
                        ->toArray();
        return [
            'rightList' => $templateUser,
            'templateName' => reset($templateName)['template_name']
        ];
    }

    public function fillData(Request $request) {
        $data = [
            'invoice' => [
                'invoiceDate' => '10/03/2022',
                'invoiceNumber' => 123456789,
                'amountWithoutTax' => '5000',
                'tax' => '200',
                'total' => '5200',
                'invoiceItemAdjustmentAmount' => '5200'
            ],
            'items' => [
                [
                'number' => 1,
                'name' => 'product1',
                'serviceStartDate' => '10/03/2022',
                'unitPrice' => '2500',
                'quantity' => '1',
                'amountWithoutTax' => '2500'
                ],
                [
                'number' => 1,
                'name' => 'product2',
                'serviceStartDate' => '10/03/2022',
                'unitPrice' => '5000',
                'quantity' => '2',
                'amountWithoutTax' => '5000'
                ],
            ],
            'accountName' => 'Demo Account'
        ];
        $tp = new TemplateProcessor(storage_path("app/template/html/{$request->get('templateName')}.html"));
        $tp->addData($data);
    }
}
