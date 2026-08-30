import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuDownload, LuPlus } from "react-icons/lu";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Invoice from '../Invoice/Invoice';
import { InvoiceContext } from '../../InvoiceContext';
import Card from '../ui/Card';
import StepHeader from '../ui/StepHeader';
import Button from '../ui/Button';

const InvoiceContainer = () => {
  const componentRef = useRef();
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    const element = componentRef.current;
    const invoiceName = invoiceData.invoiceName || 'invoice';

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoiceName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleNewInvoice = () => {
    setInvoiceData({
      ...invoiceData,
      receiver: {},
      items: [],
      additionalNotes: '',
      paymentTerms: ''
    });

    navigate('/personal-info');
  };

  return (
    <div className='w-full max-w-5xl flex flex-col items-center'>
      <StepHeader
        eyebrow="Step 6 of 6"
        title="Your invoice is ready"
        description="Review the preview below, then download it as a PDF or start a new invoice."
      />
      <Card className="p-4 sm:p-8 flex justify-center overflow-x-auto">
        <div ref={componentRef}>
          <Invoice />
        </div>
      </Card>
      <div className='w-full sm:w-auto flex sm:flex-row flex-col items-center justify-center gap-3 mt-6'>
        <Button variant="secondary" icon={LuPlus} iconPosition="left" onClick={handleNewInvoice}>
          New invoice
        </Button>
        <Button variant="primary" icon={LuDownload} iconPosition="right" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default InvoiceContainer;
