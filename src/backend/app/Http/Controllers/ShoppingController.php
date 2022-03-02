<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\FileService;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\CatalogList;

class ShoppingController extends Controller
{
    public function __construct(FileService $fileService)
    {
        parent::__construct();
        $this->fileService = $fileService;
    }

    public function uploadNewProductInventoryCsv(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:csv,txt'
            ]);
            
            $file = $request->file("file");
            $_csvData = file_get_contents($file);
            $csvData = iconv('SHIFT_JIS', 'UTF-8', $_csvData);
            $rows = array_map("str_getcsv", explode("\n", $csvData));

            $header = array_shift($rows);
            $i = 0;

            foreach ($rows as $row) {
                if (isset($row[0]) && isset($row[8])) {
                    if ($row[0] != "" && $row[8] === "0") {
                        $inv = array(
                            "code" => $row[0],
                            "label" => $row[1],
                            "barcode" => $row[2],
                            "standard1" => $row[3],
                            "standard2" => $row[4],
                            "delivery_slip_display" => $row[6] ?: 0,
                            "inventory_alert_qty" => $row[7] ?: 0,
                            "type" => "default",
                            "siteid" => "1.",
                            "dataset" => "",
                            "config" => "[]",
                            "scale" => 1,
                            "rating" => 1,
                            "ratings" => 1,
                            "status" => 0,
                            "instock" => $row[5] > 0 ? 1 : 0,
                            "mtime" => date('Y-m-d H:i:s'),
                            "ctime" => date('Y-m-d H:i:s'),
                            "editor" => Auth::user()->id,
                            "target" => "",
                        );

                        $checkProduct = Product::where("code", "=", $row[0])->first();
                        

                        if (is_null($checkProduct)) {
                            $product = Product::create($inv);

                            $cat = array(
                                'parentid' => "1",  
                                "siteid" => "1.",
                                'key' => 'product|default|' . $product->id,
                                'type' => 'default',
                                'domain' => 'product',
                                'refid' => $product->id,
                                'config' => "[]",
                                'pos' => 0,
                                'status' => 1,
                                "mtime" => date('Y-m-d H:i:s'),
                                "ctime" => date('Y-m-d H:i:s'),
                                'editor' => Auth::user()->id
                            );
                            $c = CatalogList::create($cat);

                            $stock = ProductStock::where("prodid", "=", $product->id)->first();
                            if (is_null($stock)) {
                                $updateStock = array(
                                    "siteid" => "1.",
                                    "prodid" => $product->id,
                                    "type" => 'default',
                                    "stocklevel" => $row[5],
                                    "backdate" => null,
                                    "timeframe" => "",
                                    "mtime" => date('Y-m-d H:i:s'),
                                    "ctime" => date('Y-m-d H:i:s'),
                                    "editor" => Auth::user()->id,
                                );
                                $stock = ProductStock::create($updateStock);
                            }
                            
                            $i++;                             
                        }
                    }
                }
            }

            if($i > 0) {
                Session::put('aimeos/admin/jqadm/product/notification-status', 'success');
                Session::put('aimeos/admin/jqadm/product/notification-message', $i .'つの新製品の作成に成功しました。');
            }

            
            return back();
            
        } catch (\Exception $e) {
             
            Session::put('aimeos/admin/jqadm/product/notification-status', 'failed');
            Session::put('aimeos/admin/jqadm/product/notification-message', 'アップロードしたCSVが認識されない、もしくはファイルの読み取りが正常に行われませんでした。');
             
            return back()->with([
                    'error' => $e->getMessage(),
                    'code' => 500,
                ]);
        }
 
    }

    public function uploadUpdateStockInventoryCsv(Request $request)
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
                        $product = Product::where("code", "=", $row[0])->first();

                        if (!is_null($product)) {
                            
                            if ($row[5] > 0) {
                                $product->inStock = 1;
                                $product->save();
                            }

                            $item = ProductStock::where("prodid", "=", $product->id)->first();

                            if (!is_null($item)) {
                                $item->stocklevel = $row[5];
                                $result = $item->save();

                                if($result == true) {
                                    $i++;                                
                                }
                            }
                        }
                    }
                }
            }

            if($i > 0) {
                Session::put('aimeos/admin/jqadm/product/notification-status', "success");
                Session::put('aimeos/admin/jqadm/product/notification-message', $i . "株の更新に成功");
            }
             
            return back();
            
        } catch (\Exception $e) {
            Session::put('aimeos/admin/jqadm/product/notification-status', 'failed');
            Session::put('aimeos/admin/jqadm/product/notification-message', 'アップロードしたCSVが認識されない、もしくはファイルの読み取りが正常に行われませんでした。');
             
            return back();
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
