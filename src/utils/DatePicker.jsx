import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { LuCalendar, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const CustomInput = forwardRef(({ value, onClick, onFocus, placeholder, id, disabled }, ref) => (
  <button
    type="button"
    id={id}
    ref={ref}
    onClick={onClick}
    onFocus={onFocus}
    disabled={disabled}
    className="w-full flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-left focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span className={value ? "text-gray-900" : "text-gray-400 font-normal"}>
      {value || placeholder}
    </span>
    <LuCalendar className="text-gray-400 text-base shrink-0" />
  </button>
));

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="flex items-center justify-between px-2 pt-1 pb-2">
    <button
      type="button"
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="h-7 w-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <LuChevronLeft className="text-base" />
    </button>
    <span className="text-sm font-semibold text-gray-900">
      {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
    </span>
    <button
      type="button"
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="h-7 w-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <LuChevronRight className="text-base" />
    </button>
  </div>
);

// A shadcn-styled wrapper around react-datepicker: a bordered trigger button
// instead of a bare text input, and a restyled popover calendar (see datepicker.css).
const DatePicker = ({ dateFormat = 'd MMMM yyyy', ...props }) => (
  <ReactDatePicker
    customInput={<CustomInput />}
    renderCustomHeader={CustomHeader}
    calendarClassName="sc-datepicker"
    popperClassName="sc-datepicker-popper"
    wrapperClassName="w-full block"
    showPopperArrow={false}
    dateFormat={dateFormat}
    {...props}
  />
);

export default DatePicker;
