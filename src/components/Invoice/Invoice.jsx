import React, { useContext } from "react";
import { InvoiceContext } from "../../InvoiceContext";
import num2words from 'num2words';

const Invoice = () => {
  const { invoiceData } = useContext(InvoiceContext);
  const qrCode = localStorage.getItem('qrCode') || '';
  const logo = localStorage.getItem('logo') || ''; // Fetch logo from local storage

  const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((total, item) => total + Number(item.total || 0), 0);
  };

  const calculateTotal = () => {
    let subtotal = calculateSubtotal();
    let discountAmount = (invoiceData.discount || 0) * subtotal / 100;
    let discountedTotal = subtotal - discountAmount;
    let taxAmount = (invoiceData.tax || 0) * discountedTotal / 100;
    let total = discountedTotal + taxAmount + (invoiceData.shipping || 0);
    return total.toFixed(2);
  };

  const totalInWords = (num) => {
    const parts = num.split(".");
    const integerPart = num2words(parts[0], { lang: 'en' });
    const decimalPart = parts[1] ? num2words(parts[1], { lang: 'en' }) : '';
    return decimalPart ? `${integerPart} point ${decimalPart}` : integerPart;
  };

  const invoiceGeneratedTime = new Date();

  const shouldDisplayHSN = invoiceData.items.some(item => item.hsn);
  const shouldDisplayDiscount = invoiceData.items.some(item => invoiceData.discount || item.discount);
  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div className="relative sm:h-[1200px] sm:w-[800px] h-[1200px] w-[400px] bg-white rounded-md text-black box-border overflow-hidden font-google-sans">
      <div className="h-2 w-full bg-brand" />
      <div className="logoAndAddress w-full h-[250px] flex flex-row items-center justify-between px-6 pt-4">
        <div className='h-full w-[50%] flex flex-col items-left justify-around'>
          <div className="logo h-[150px] flex overflow-hidden object-cover bg-center justify-center items-start flex-col">
            {logo && <img src={logo} alt="Logo" />}
          </div>
          <h1 className="text-xl z-10 h-auto font-bold text-gray-900">{invoiceData.sender.name || "Company Name"}</h1>
        </div>
        <div className="address w-[50%] h-[100%] flex items-end justify-evenly flex-col">
          <div className="invoiceAndNumber flex flex-col items-end justify-center">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Invoice</h1>
            <h1 className="text-xl text-gray-500 font-semibold">#{invoiceData.invoiceNumber}</h1>
          </div>
          <div className="address flex flex-col items-end text-gray-600 text-[16px] font-semibold justify-center">
            <p>{invoiceData.sender.address}</p>
            <p>{invoiceData.sender.city}{invoiceData.sender.city && invoiceData.sender.zip ? ', ' : ''}{invoiceData.sender.zip}</p>
            <p>{invoiceData.sender.country}</p>
            {invoiceData.sender.gstReg && <p className="text-gray-800">GSTIN: {invoiceData.sender.gstReg}</p>}
          </div>
        </div>
      </div>
      <div className="RecieverAddressDate w-full h-[200px] flex flex-row items-start justify-between px-6">
        <div className="BillTo w-[50%] h-full">
          <h1 className="text-lg font-bold text-gray-500 tracking-wide uppercase">Bill to</h1>
          <p className="text-xl font-bold text-gray-800 mt-1">{invoiceData.receiver.name}</p>
          {invoiceData.receiver.gstReg && <p className="text-sm font-semibold text-gray-500">GSTIN: {invoiceData.receiver.gstReg}</p>}
          <p className="text-gray-600 font-semibold mt-1">{invoiceData.receiver.address}</p>
          <p className="text-gray-600 font-semibold">{invoiceData.receiver.city}{invoiceData.receiver.city && invoiceData.receiver.zip ? ', ' : ''}{invoiceData.receiver.zip}</p>
          <p className="text-gray-600 font-semibold">{invoiceData.receiver.country}</p>
        </div>
        <div className="invoiceDate w-[50%] h-full flex flex-col justify-start items-end gap-2 pt-1">
          <div className="flex flex-row w-auto justify-between gap-3 min-w-[220px]">
            <h1 className="text-sm font-bold text-gray-500">Invoice Date</h1>
            <p className="text-gray-800 font-semibold">{formatDate(invoiceData.issueDate)}</p>
          </div>
          <div className="flex flex-row w-auto justify-between gap-3 min-w-[220px]">
            <h1 className="text-sm font-bold text-gray-500">Due Date</h1>
            <p className="text-gray-800 font-semibold">{formatDate(invoiceData.dueDate)}</p>
          </div>
          <div className="flex flex-row w-auto justify-between gap-3 min-w-[220px]">
            <h1 className="text-sm font-bold text-gray-500">Generated</h1>
            <p className="text-gray-800 font-semibold">{formatTime(invoiceGeneratedTime)}</p>
          </div>
        </div>
      </div>
      <div className="itemsTable w-[calc(100%-3rem)] mx-6 h-auto min-h-16 flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse text-gray-800 font-semibold">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-gray-500 font-bold p-2 text-left text-sm uppercase tracking-wide">Item</th>
              {shouldDisplayHSN && <th className="text-gray-500 font-bold p-2 text-center text-sm uppercase tracking-wide">HSN</th>}
              <th className="text-gray-500 font-bold p-2 text-center text-sm uppercase tracking-wide">Rate</th>
              <th className="text-gray-500 font-bold p-2 text-center text-sm uppercase tracking-wide">Qty</th>
              {shouldDisplayDiscount && <th className="text-gray-500 font-bold p-2 text-center text-sm uppercase tracking-wide">Discount</th>}
              <th className="text-gray-500 font-bold p-2 text-right text-sm uppercase tracking-wide">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="p-2 text-left">
                  {item.itemName}
                  {item.description && (
                    <p className="text-xs font-normal text-gray-400 mt-0.5">{item.description}</p>
                  )}
                </td>
                {shouldDisplayHSN && <td className="p-2 text-center">{item.hsn}</td>}
                <td className="p-2 text-center">{Number(item.rate || 0).toFixed(2)} {invoiceData.currency}</td>
                <td className="p-2 text-center">{item.quantity} {item.unit}</td>
                {shouldDisplayDiscount && <td className="p-2 text-center">{invoiceData.discount || 0}%</td>}
                <td className="p-2 text-right">{Number(item.total || 0).toFixed(2)} {invoiceData.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="totals w-[calc(100%-3rem)] mx-6 mt-4 flex justify-end">
        <div className="w-64 flex flex-col gap-1.5 text-gray-700">
          <div className="flex justify-between text-sm font-semibold">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} {invoiceData.currency}</span>
          </div>
          {Boolean(invoiceData.discount) && (
            <div className="flex justify-between text-sm font-semibold">
              <span>Discount ({invoiceData.discount}%)</span>
              <span>-{(subtotal * invoiceData.discount / 100).toFixed(2)} {invoiceData.currency}</span>
            </div>
          )}
          {Boolean(invoiceData.tax) && (
            <div className="flex justify-between text-sm font-semibold">
              <span>Tax ({invoiceData.tax}%)</span>
              <span>+{((subtotal - (subtotal * (invoiceData.discount || 0) / 100)) * invoiceData.tax / 100).toFixed(2)} {invoiceData.currency}</span>
            </div>
          )}
          {Boolean(invoiceData.shipping) && (
            <div className="flex justify-between text-sm font-semibold">
              <span>Shipping</span>
              <span>+{Number(invoiceData.shipping).toFixed(2)} {invoiceData.currency}</span>
            </div>
          )}
          <div className="flex justify-between items-center bg-brand/20 rounded-lg px-3 py-2 mt-1">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900 text-lg">{total} {invoiceData.currency}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right leading-snug">
            {totalInWords(total)} {invoiceData.currency}
          </p>
        </div>
      </div>
      {invoiceData.additionalNotes && (
        <div className="additionalNotes w-full mt-4 px-6">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide text-gray-500">Additional Notes</h2>
          <p className="mt-1 text-gray-700">{invoiceData.additionalNotes}</p>
        </div>
      )}
      {invoiceData.paymentTerms && (
        <div className="paymentTerms w-full mt-3 px-6">
          <h2 className="font-bold text-sm uppercase tracking-wide text-gray-500">Payment Terms</h2>
          <p className="mt-1 text-gray-700">{invoiceData.paymentTerms}</p>
        </div>
      )}
      <div className="accountDetails flex flex-row items-center justify-between h-36 w-full px-6 mt-4">
        {invoiceData.paymentInfo?.bankName ||
        invoiceData.paymentInfo?.accountName ||
        invoiceData.paymentInfo?.accountNumber ||
        invoiceData.paymentInfo?.ifscCode ||
        invoiceData.paymentInfo?.bankAddress ? (
          <div className='flex flex-col'>
            <p className="font-bold text-gray-800 text-sm uppercase tracking-wide text-gray-500 mb-1">Payment details</p>
            {invoiceData.paymentInfo?.bankName && (
              <p className="font-semibold text-sm text-gray-700">Bank Name: {invoiceData.paymentInfo.bankName}</p>
            )}
            {invoiceData.paymentInfo?.accountName && (
              <p className="font-semibold text-sm text-gray-700">Account Name: {invoiceData.paymentInfo.accountName}</p>
            )}
            {invoiceData.paymentInfo?.accountNumber && (
              <p className="font-semibold text-sm text-gray-700">Account Number: {invoiceData.paymentInfo.accountNumber}</p>
            )}
            {invoiceData.paymentInfo?.ifscCode && (
              <p className="font-semibold text-sm text-gray-700">IFSC Code: {invoiceData.paymentInfo.ifscCode}</p>
            )}
            {invoiceData.paymentInfo?.bankAddress && (
              <p className="font-semibold text-sm text-gray-700">Bank Address: {invoiceData.paymentInfo.bankAddress}</p>
            )}
          </div>
        ) : <div />}

        <div className="h-full mb-2 w-[140px]">
          {qrCode && (
            <div className="qr-code h-[90%] w-full flex flex-col items-center">
              <img src={qrCode} alt="QR Code" className="w-full h-full object-contain" />
              <p className="text-xs text-gray-500 mt-1">Scan to pay</p>
            </div>
          )}
        </div>
      </div>

      <div className="contactDetails flex flex-row items-end justify-between h-[130px] w-full px-6 border-t border-gray-100 pt-4">
        <div>
          <p className="text-gray-500 text-sm">Questions about this invoice? Contact:</p>
          <p className="text-gray-700 text-sm font-semibold">{invoiceData.sender.phone}</p>
          <p className="text-gray-700 text-sm font-semibold">{invoiceData.sender.email}</p>
        </div>

        <div className="signatory h-full w-[40%] flex flex-col text-center justify-end">
          <div className="border-t border-gray-300 pt-1">
            <p className="text-xs text-gray-500">Authorised Signatory for {invoiceData.sender.name}</p>
          </div>
        </div>
      </div>
      <div className="h-auto w-full px-6 flex justify-end absolute bottom-3">
        <p className="text-gray-300 text-xs">Made using BillEase</p>
      </div>
    </div>
  );
};

export default Invoice;
