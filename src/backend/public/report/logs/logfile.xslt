<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/testsuites">
        <!-- <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html></xsl:text> -->
        <html class="no-js" lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>PHPUnit Test Results</title>
            <meta name="description" content="" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" />
            <script src="//code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
            <script src="//cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
            <script src="//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        </head>
        <body>
            <div class="container">
                <header class="page-header my-4">
                    <xsl:apply-templates select="revision" />
                    <xsl:apply-templates select="testsuite" />
                </header>
            </div>

            <!-- toggle icons for accordion -->
            <script>
                function toggleChevron(e) {
                    $(e.target)
                        .prev('div')
                        .find("i.fas")
                        .toggleClass('fa-chevron-up');
                }
                $('#accordion').on('hidden.bs.collapse', toggleChevron);
                $('#accordion').on('shown.bs.collapse', toggleChevron);
            </script>

        </body>
        </html>
    </xsl:template>

    <xsl:template match="revision">
        <div class="alert-info p-2 mb-4">
            <span class="d-block">Revision: <xsl:value-of select="@hash" /></span>
            <span class="d-block">Author: <xsl:value-of select="@name" /> (<xsl:value-of select="@email" />)</span>
            <span>Date: <xsl:value-of select="@date" /></span>
        </div>
    </xsl:template>

    <xsl:template match="testsuite">
        <h2>Testsuite: <xsl:value-of select="@name" /></h2>
        <div class="total">
            <xsl:text>Tests run: </xsl:text>
            <xsl:value-of select="@tests" />
            <xsl:text>, </xsl:text>

            <span class="total-failures">
                <xsl:text>Failures: </xsl:text>
                <xsl:value-of select="@failures" />
            </span>
            <xsl:text>, </xsl:text>

            <span class="total-errors">
                <xsl:text>Errors: </xsl:text>
                <xsl:value-of select="@errors" />
            </span>
            <xsl:text>, </xsl:text>

            <xsl:text>Time elapsed: </xsl:text>
            <xsl:value-of select="@time" />
            <xsl:text> sec</xsl:text>
        </div>
        <xsl:apply-templates select="system-out" />
        <xsl:apply-templates select="system-err" />

        <div class="accordion mt-4" id="accordion">
            <xsl:apply-templates select="/testsuites/testsuite/testsuite/testsuite" />
        </div>
    </xsl:template>

    <xsl:template match="/testsuites/testsuite/testsuite/testsuite">
        <div class="card">
            <div class="card-header font-weight-bold">
                <div data-toggle="collapse" data-parent="#accordion">
                    <xsl:attribute name="data-target">
                        .<xsl:value-of select="translate(@name, '\','')" />
                    </xsl:attribute>

                    Class: <span><xsl:value-of select="@name" /></span>

                    <span class="total-failures text-danger">
                        <xsl:text> Failures: </xsl:text>
                        <xsl:value-of select="@failures" />
                    </span>
                    <xsl:text>, </xsl:text>

                    <span class="total-errors text-warning">
                        <xsl:text> Errors: </xsl:text>
                        <xsl:value-of select="@errors" />
                    </span>

                    <i class="fas fa-chevron-down float-right"></i>
                </div>
            </div>

            <div class="card-body">
                <xsl:attribute name="class">
                    <xsl:value-of select="translate(@name, '\','')" /> collapse
                </xsl:attribute>

                <div class="px-4 py-2">
                    <xsl:apply-templates select="testcase" />
                </div>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="testcase">
        <div>
            <span class="mr-2">
                <strong><xsl:value-of select="@name" /></strong>
            </span>

            
            <xsl:value-of select="@assertions" />
            <xsl:text> assertions </xsl:text>

            (<xsl:value-of select="@time" /> sec)
        </div>
        <xsl:apply-templates select="failure" />
        <xsl:apply-templates select="error" />
    </xsl:template>

    <xsl:template match="failure">
        <div class="failure">
            <span style="color: #ff4136;">
                <xsl:text>
                    Failure:
                </xsl:text>
                <xsl:value-of select="@type" />
            </span>
            <pre>
                <xsl:value-of select="." />
            </pre>
        </div>
    </xsl:template>

    <xsl:template match="error">
        <div class="error">
            <span style="color: #F00;">
                <xsl:text>
                    Error:
                </xsl:text>
                <xsl:value-of select="@type" />
            </span>
            <pre>
                <xsl:value-of select="." />
            </pre>
        </div>
    </xsl:template>

    <xsl:template match="system-out">
        <div>
            <xsl:text>
            ------ Standard output ------
            </xsl:text>
            <pre>
                <xsl:value-of select="." />
            </pre>
        </div>
    </xsl:template>

    <xsl:template match="system-err">
        <div>
            <xsl:text>
            ------ Error output ------
            </xsl:text>
            <pre>
                <xsl:value-of select="." />
            </pre>
        </div>
    </xsl:template>

</xsl:stylesheet>
