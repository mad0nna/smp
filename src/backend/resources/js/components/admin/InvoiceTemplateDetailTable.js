import React from 'react'

const InvoiceTemplateDetailTable = () => {
  return (
    <table className={'table-auto w-full mb-6'}>
      <thead className="bg-whiteTint-500 border-b border-t border-gray-200">
        <tr className="h-11 text-xs text-gray-500 text-shadow-none">
          <th className="w-1/4">Required Fields</th>
          <th className="text-left">Description</th>
        </tr>
      </thead>
      <tbody className="text-left text-xs">
        <tr>
          <td>«Inv.InvoiceNumber»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.InvoiceDate»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Account.Name»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Item.Number»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.Item.ProductName»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.Item.ServiceStartDate»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.Item.Price»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.Item.Quantity»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.Item.AmountWithoutTax»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.AmountWOTax»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.Tax»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Invoice.Total»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Inv.ItemAdjAmount»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td className="font-bold">Invoice Table Syntax</td>
          <td className="font-bold">Invoice Table Syntax</td>
        </tr>
        <tr>
          <td>«Inv.Table.Start»«Inv.Table.End»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>

        <tr>
          <td>«Column.Number.Start»«Column.Number.End»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Column.Name.Start»«Column.Name.End»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>

        <tr>
          <td>«Column.Price.Start»«Column.Price.End»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Column.Quantity.Start»«Column.Quantity.End»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
        <tr>
          <td>«Column.Amount.Start»«Column.Amount.End»</td>
          <td>
            Auto-generated in the system. But must have field in template.
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default InvoiceTemplateDetailTable
