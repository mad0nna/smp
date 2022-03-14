<?php
namespace App\Services;
class TemplateProcessor {
    private $fileLocation;
    private $htmlString;
    private $invoiceDate = "«Invoice.InvoiceDate»";
    private $invoiceNumber = "«Invoice.InvoiceNumber»";
    private $accountName = "«Account.Name»";
    private $tableStart = "«Invoice.Table.Start»";
    private $tableEnd = "«Invoice.Table.End»";
    private $columnNumberStart = '«Column.Number.Start»';
    private $columnNumberEnd = '«Column.Number.End»';
    private $columnNameStart = '«Column.Name.Start»';
    private $columnNameEnd = '«Column.Name.End»';
    private $columnPriceStart = '«Column.Price.Start»';
    private $columnPriceEnd = '«Column.Price.End»';
    private $columnQuantityStart = '«Column.Quantity.Start»';
    private $columnQuantityEnd = '«Column.Quantity.End»';
    private $columnAmountStart = '«Column.Amount.Start»';
    private $columnAmountEnd = '«Column.Amount.End»';
    private $amountWithoutTax = "«Inv.AmountWOTax»";
    private $tax = "«Inv.Tax»";
    private $total = "«Invoice.Total»";
    private $itemAdjustmentAmount = "«Inv.ItemAdjAmount»";
    private $tableItemTags = [
        'number' => '«Item.Number»',
        'name' => '«Invoice.Item.ProductName»',
        'unitPrice' => '«Invoice.Item.Price»',
        'serviceStartDate' => '«Invoice.Item.ServiceStartDate»',
        'quantity' => '«Invoice.Item.Quantity»',
        'amountWithoutTax' => '«Invoice.Item.AmountWithoutTax»'
    ];
    private $columnNames = [
        'number' => 'No.',
        'name' => '品名',
        'price' => '単価',
        'quantity' => '数量',
        'amountWithoutTax' => '金額(税抜)'
    ];
    public function __construct($fileLocation)
    {
        $this->fileLocation = $fileLocation;
        $this->htmlString = file_get_contents($this->fileLocation);
    }

    public function addData($invoiceData) {
        $this->htmlString = str_replace($this->invoiceDate, $invoiceData['invoice']['invoiceDate'], $this->htmlString);
        $this->htmlString = str_replace($this->invoiceNumber, $invoiceData['invoice']['invoiceNumber'], $this->htmlString);
        $this->htmlString = str_replace($this->accountName, $invoiceData['accountName'], $this->htmlString);
        $this->htmlString = str_replace($this->amountWithoutTax, $invoiceData['invoice']['amountWithoutTax'], $this->htmlString);
        $this->htmlString = str_replace($this->tax, $invoiceData['invoice']['tax'], $this->htmlString);
        $this->htmlString = str_replace($this->total, $invoiceData['invoice']['total'], $this->htmlString);
        $this->htmlString = str_replace($this->itemAdjustmentAmount, $invoiceData['invoice']['invoiceItemAdjustmentAmount'], $this->htmlString);
        $this->addTable($invoiceData);
        
    }

    private function addTable($invoiceData) {
        $tableString = '<div>
        <table style="position: absolute;top: 395px;left: 64px; border: 1px solid black; border-collapse: collapse;">
            <thead>
                (headers)
            </thead>
            <tbody>
                (tabledata)
            </tbody>
        </table>
        </div>';
        $tableHtml = $this->getTableHtml();
        $columns = $this->getTableHeaderArrangement($tableHtml);

        $tableHeaders = $this->prepareTableHeaders($columns);
        $tableString = str_replace("(headers)", $tableHeaders, $tableString);
        $tableData = $this->prepareTableData($invoiceData['items'], $columns);
        $tableString = str_replace("(tabledata)", $tableData, $tableString);
        $newHtml = str_replace($tableHtml, $tableString, $this->htmlString);
        echo $newHtml;
    }

    private function prepareTableData($items, $columns) {
        $tableRow = '';
        for ($x = 0; $x < count($items); $x++) {
            $dataString = "<tr style='text-align:center;
            border: 1px solid black;
            border-collapse: collapse; '>";
            for ($i=0; $i < count($columns); $i++) {
                if ($columns[$i] === 'number') {
                    $tags = $this->getTagsInsideColumn($this->columnNumberStart, $this->columnNumberEnd);
                    $dataString .= $this->changeTagsToData($tags, $items[$x]);
                }
                if ($columns[$i] === 'name') {
                    $tags = $this->getTagsInsideColumn($this->columnNameStart, $this->columnNameEnd);
                    $dataString .= $this->changeTagsToData($tags, $items[$x]);
                }
                if ($columns[$i] === 'price') {
                    $tags = $this->getTagsInsideColumn($this->columnPriceStart, $this->columnPriceEnd);
                    $dataString .= $this->changeTagsToData($tags, $items[$x]);
                }
                if ($columns[$i] === 'quantity') {
                    $tags = $this->getTagsInsideColumn($this->columnQuantityStart, $this->columnQuantityEnd);
                    $dataString .= $this->changeTagsToData($tags, $items[$x]);
                }
                if ($columns[$i] === 'amountWithoutTax') {
                    $tags = $this->getTagsInsideColumn($this->columnAmountStart, $this->columnAmountEnd);
                    $dataString .= $this->changeTagsToData($tags, $items[$x]);
                }
            }
            $dataString .= '</tr>';
            $tableRow .= $dataString;
        }
        return $tableRow;
    }

    private function changeTagsToData($tags, $data) {
        $tableRow = '<td style="
        border: 1px solid black;
        border-collapse: collapse;">';
        foreach ($this->tableItemTags as $key => $tag) {
            if(strpos($tags, $tag) !== false){
                $tableRow .= $data[$key] . ' ';
            }
        }
        return $tableRow .= '</td>';
    }

    private function getTagsInsideColumn($columnStart, $columnEnd) {
        $start = explode($columnStart, $this->htmlString);
        $end = explode($columnEnd, $start[1]);
        return $end[0];
    }

    private function prepareTableHeaders($columns) {
        $headers = '<tr>';
        for ($i=0; $i < count($columns); $i++) { 
            $headers .= '<th style="width:150px">' . $this->columnNames[$columns[$i]] . '</th>';
        }
        $headers .= ' </tr>';
        return $headers;
    }

    private function getTableHeaderArrangement($tableHtml) {
        $columns = [
        'name' => strpos($tableHtml, $this->columnNameStart),
        'amountWithoutTax' => strpos($tableHtml, $this->columnAmountStart),
        'price' => strpos($tableHtml, $this->columnPriceStart),
        'quantity' => strpos($tableHtml, $this->columnQuantityStart),
        'number' => strpos($tableHtml, $this->columnNumberStart)
        ];
        asort($columns);
        return array_keys($columns);
    }

    private function getTableHtml() {
        $exploded = explode('«Invoice.Table.Start»', $this->htmlString);
        $reversed = strrev($exploded[0]);
        $firstP = strpos($reversed, 'p<') +2;
        $tableStartIndex = strpos($this->htmlString, $this->tableStart) - $firstP;
        $tableEndIndex = strpos($this->htmlString, $this->tableEnd) + (strlen($this->tableEnd) + 4);
        $tableHtml = '';
        for ($i=$tableStartIndex; $i < $tableEndIndex; $i++) { 
            $tableHtml .= $this->htmlString[$i];
        }
        return $tableHtml;
    }
}
?>