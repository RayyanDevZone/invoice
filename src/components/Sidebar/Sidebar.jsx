import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuUsers, LuFileText, LuList, LuWallet, LuClipboardList, LuReceipt, LuCheck } from 'react-icons/lu';
import { InvoiceContext } from '../../InvoiceContext';

const links = [
  { id: 1, name: "From & To", route: "personal-info", icon: LuUsers },
  { id: 2, name: "Invoice Details", route: "invoice-details", icon: LuFileText },
  { id: 3, name: "Items Details", route: "itemsLine", icon: LuList },
  { id: 4, name: "Payment Info", route: "paymentInfo", icon: LuWallet },
  { id: 5, name: "Summary", route: "summary", icon: LuClipboardList },
  { id: 6, name: "Invoice", route: "invoice", icon: LuReceipt },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { invoiceData } = useContext(InvoiceContext);

  const isStepComplete = (id) => {
    switch (id) {
      case 1:
        return Boolean(invoiceData.sender?.name && invoiceData.receiver?.name);
      case 2:
        return Boolean(invoiceData.invoiceNumber && invoiceData.issueDate && invoiceData.dueDate);
      case 3:
        return invoiceData.items?.length > 0;
      case 4:
        return Boolean(invoiceData.paymentInfo?.bankName || invoiceData.paymentInfo?.accountNumber);
      case 5:
        return Boolean(invoiceData.invoiceName);
      default:
        return false;
    }
  };

  // Highest step reached with every prior step complete, so the timeline only
  // colors a contiguous run from the top (rather than isolated finished steps).
  let progressIndex = -1;
  while (progressIndex + 1 < links.length && isStepComplete(links[progressIndex + 1].id)) {
    progressIndex += 1;
  }

  return (
    <aside className='hidden md:flex w-64 shrink-0 bg-gray-50 border-r border-gray-200 py-8 px-4 flex-col font-google-sans'>
      <p className='text-xs font-bold text-gray-400 tracking-wider uppercase px-3 mb-3'>Invoice Steps</p>
      <div className='relative flex flex-col gap-1'>
        <div className='absolute left-4 top-5 bottom-5 w-px bg-gray-200 -translate-x-1/2' />
        {progressIndex >= 0 && (
          <div
            className='absolute left-4 top-5 w-px bg-brand-dark/40 -translate-x-1/2'
            style={{ height: `${progressIndex * 2.75}rem` }}
          />
        )}
        {links.map((link, idx) => {
          const isActive = location.pathname === `/${link.route}`;
          const complete = isStepComplete(link.id);
          const Icon = link.icon;
          return (
            <div key={link.id} className='relative z-10 flex flex-row items-center'>
              <div className='w-8 h-8 shrink-0 flex items-center justify-center'>
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-brand text-gray-900'
                      : complete
                        ? 'bg-brand-dark/10 text-brand-dark'
                        : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {complete && !isActive ? <LuCheck className='text-sm' /> : link.id}
                </div>
              </div>
              <button
                onClick={() => navigate(`/${link.route}`)}
                className={`flex-1 flex items-center gap-2.5 text-left px-3 py-2.5 text-sm rounded-xl transition-colors ${
                  isActive
                    ? 'bg-white text-gray-900 font-bold shadow-sm'
                    : 'text-gray-500 font-semibold hover:bg-gray-100'
                }`}
              >
                <Icon className={`text-base shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                {link.name}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
