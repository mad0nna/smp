<?php
    use \TonchikTm\PdfToHtml\Pdf;
    $pdf = new Pdf('test2.pdf', [
        'pdftohtml_path' => '/usr/bin/pdftohtml',
        'pdfinfo_path' => '/usr/bin/pdfinfo',
        'outputDir' => '/var/www/backend/public/temp/'
    ]);
    $pdfInfo = $pdf->getInfo();
    $countPages = $pdf->countPages();
    // dd($pdf->getHtml()->getPage(1));
    echo $pdf->getHtml()->getPage(1);
?>