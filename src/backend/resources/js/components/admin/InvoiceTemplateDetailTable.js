import React from 'react'

const InvoiceTemplateDetailTable = () => {
  return (
    <table className={'table-auto w-full mb-6'}>
      <thead className="bg-gray-50 border-b border-t border-gray-200">
        <tr className="h-11 text-xs text-gray-500 text-shadow-none">
          <th className="w-1/4">Required Fields</th>
          <th className="text-left">Description</th>
        </tr>
      </thead>
      <tbody className="text-left text-xs">
        <tr>
          <td>[INVOICE_NUMBER]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[INVOICE_DATE]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[DUE_DATE]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td className="font-bold">H&T Details</td>
          <td className="font-bold">H&T Details</td>
        </tr>
        <tr>
          <td>[COMPANY_CONTACT_NUMBER]</td>
          <td>
            Must Add the updated contact number field to reflect in invoice
            template.
          </td>
        </tr>
        <tr>
          <td>[COMPANY_EMAIL_ADDRESS]</td>
          <td>
            Must Add the updated company email address field to reflect in
            invoice template.
          </td>
        </tr>
        <tr>
          <td className="font-bold">Account Details</td>
          <td className="font-bold">Account Details</td>
        </tr>
        <tr>
          <td>[CUSTOMER_NAME]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[CUSTOMER_ADDRESS]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[CUSTOMER_CONTACT_NUMBER]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[CUSTOMER_EMAIL_ADDRESS]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td className="font-bold">Table Details</td>
          <td className="font-bold">Table Details</td>
        </tr>
        <tr>
          <td>[ITEM_NUMBER]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[INVOICE_ITEM_PRODUCT_NAME]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[INVOICE_SERVICE_START DATE]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[INVOICE_ITEM_UNIT]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[INVOICE_ITEM_QUANTITY]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[INVOICE_ITEM_AMOUNT]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[TOTAL_AMOUNT_DUE]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[TOTAL_AMOUNT_WITHOUT_TAX]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>[TOTAL_WITH_TAX]</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default InvoiceTemplateDetailTable
