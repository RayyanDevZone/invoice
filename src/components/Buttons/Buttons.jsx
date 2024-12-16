import React from 'react'
import { useNavigate } from 'react-router-dom'

const Buttons = () => {
    const navigate = useNavigate()
    const buttons=[
        {
            id: 1,
            name: "From & To",
            route: "personal-info"
        },
        {
            id: 2,
            name: "Invoice Details", 
            route: "invoice-details"
        },
        {
            id: 3,
            name: "Items Details", 
            route: "itemsLine"
        },
        {
            id: 4,
            name: "Payment Info", 
            route: "paymentInfo"
        },
        {
            id: 5,
            name: "Summary", 
            route: "summary"
        },
        {
          id: 6,
          name: "Invoice", 
          route: "invoice"
      }
    ]
  return (
    <div className='h-[70px] w-full rounded-xl mb-3 bg-[#020817] border text-white border-[#1E293B] box-border  px-4 py-2 flex items-center'> 
    <div className='flex gap-4'>
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => navigate(`/${button.route}`)}
          className={`px-4 py-2 border border-[#1E293B] font-semibold rounded-md font-lexend ${
            window.location.pathname === '/' + button.route 
              ? 'bg-white text-[#020817]'
              : 'bg-[#020817] text-white hover:bg-zinc-500'
          }`}
        >
          {button.name}
        </button>
      ))}
    </div>
   
    </div>
  )
}

export default Buttons
