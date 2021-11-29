<?php

namespace App\Http\Controllers;


use App\Services\FileService;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductStock;

class ShoppingController extends Controller
{
    /**
     * FileController constructor.
     */
    public function __construct(FileService $fileService)
    {
        parent::__construct();
        $this->fileService = $fileService;
    }

    public function upload_new_product_inventory_csv(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:csv,txt'
            ]);

            $file = $request->file("file");
            $csvData = file_get_contents($file);

            $rows = array_map("str_getcsv", explode("\n", $csvData));
            $header = array_shift($rows);
            $i = 0;

            foreach ($rows as $row) {
                if (isset($row[0])) {
                    if ($row[0] != "") {                        
                        $inv = array(
                            "code" => $row[0],
                            "label" => $row[1],
                            "barcode" => $row[2],
                            "standard1" => $row[3],
                            "standard2" => $row[4],
                            "delivery_slip_display" => $row[6] ?: 0,
                            "inventory_alert_qty" => $row[7] ?: 0,
                            "type" => $row[8],
                            "siteid" => "1.",
                            "dataset" => "",
                            "config" => "[]",
                            "scale" => 1,
                            "rating" => 1,
                            "ratings" => 1,
                            "status" => 1,
                            "instock" => $row[5] > 0 ? 1 : 0,
                            "mtime" => date('Y-m-d H:i:s'),
                            "ctime" => date('Y-m-d H:i:s'),
                            "editor" => "core:setup",
                            "target" => "",
                        );
                        $checkProduct = Product::where("code", "=", $row[0])->first();
                        $stock = ProductStock::where("prodid", "=", $row[0])->first();

                        if (is_null($checkProduct) && is_null($stock)) {
                            $product = Product::create($inv);

                            $updateStock = array(
                                "siteid" => "1.",
                                "prodid" => $row[0],
                                "type" => $row[8],
                                "stocklevel" => $row[5],
                                "backdate" => null,
                                "timeframe" => "",
                                "mtime" => date('Y-m-d H:i:s'),
                                "ctime" => date('Y-m-d H:i:s'),
                                "editor" => "core:setup"
                            );

                            $stock = ProductStock::create($updateStock);

                            if(!is_null($product) && !is_null($stock)) {
                                $i++;
                            }
                        }
                    }
                }
            }

            if($i > 0) {
                Session::put('aimeos/admin/jqadm/product/notification-status', 'success');
                Session::put('aimeos/admin/jqadm/product/notification-message', $i .'つの新製品の作成に成功しました。');
            }

            
            return back()->with($data["status"], $data["message"]);
            
        } catch (\Exception $e) {
            return back()->with([
                    'error' => $e->getMessage(),
                    'code' => 500,
                ]);
        }
 
    }

    public function upload_update_stock_inventory_csv(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:csv,txt'
            ]);

            $file = $request->file("file");
            $csvData = file_get_contents($file);

            $rows = array_map("str_getcsv", explode("\n", $csvData));
            $header = array_shift($rows);
            $i = 0;

            foreach ($rows as $row) {
                if (isset($row[0])) {
                    if ($row[0] != "") {                        
                        $item = ProductStock::where("prodid", "=", $row[0])->first();

                        if (!is_null($item)) {
                            $item->stocklevel = $item->stocklevel + $row[5];
                            $result = $item->save();

                            if($result == true) {
                                $i++;                                
                            }
                        }
                    }
                }
            }

            if($i > 0) {
                Session::put('aimeos/admin/jqadm/product/notification-status', "success");
                Session::put('aimeos/admin/jqadm/product/notification-message', $i . "株の更新に成功");
            }
             
            return back()->with($data["status"], $data["message"]);
            
        } catch (\Exception $e) {
            return back()->with([
                    'error' => $e->getMessage(),
                    'code' => 500,
                ]);
        }
    }

    public function shop()
    {
        return view('companyShop');
    }

    public function productDetail() {
        return view('companyProductDetail');
    }
}
