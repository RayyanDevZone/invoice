import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Invoice from '../Invoice/Invoice';
import { FiDownload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceContext } from '../../InvoiceContext'; // Assuming you have this context set up

const InvoiceContainer = () => {
  const componentRef = useRef();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext); // Ensure you have access to invoiceData
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    const element = componentRef.current;
    const invoiceName = invoiceData.invoiceName || 'invoice'; // Use the invoice name or default to 'invoice'

    try {
      // Generate canvas
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      // Initialize jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Calculate dimensions to fit A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF with the given invoice name
      pdf.save(`${invoiceName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleNewInvoice = () => {
    // Clear the invoice data
    setInvoiceData({
      sender: {},
      receiver: {},
      items: [],
      paymentInfo: {},
      additionalNotes: '',
      paymentTerms: ''
    });

    // Navigate to the personal info page
    navigate('/personal-info');
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <div ref={componentRef}>
        <Invoice />
      </div>
      <div className='h-[200px] w-[500px] bg-[#020817] flex flex-row items-center justify-around rounded-xl mt-5 border-[#1E293B] border font-lexend'>
        <button 
          className='bg-[#020817] text-white border border-[#1E293B] px-2 py-1 w-[180px] rounded-md flex flex-row items-center justify-evenly'
          onClick={handleNewInvoice}
        >
          NEW INVOICE <FaPlus />
        </button>
        <button 
          className='bg-white text-[#020817] px-2 py-1 w-[180px] rounded-md flex flex-row items-center justify-evenly'
          onClick={handleDownloadPDF}
        >
          DOWNLOAD <FiDownload className='text-md font-bold' />
        </button>
      </div>
    </div>
  );
};

export default InvoiceContainer;
