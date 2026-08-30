import React from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Button from './Button';

const StepFooter = ({ onBack, onNext, backLabel = 'Back', nextLabel = 'Next' }) => (
  <div className="flex flex-row w-full justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
    {onBack && (
      <Button type="button" variant="secondary" icon={LuArrowLeft} iconPosition="left" onClick={onBack}>
        {backLabel}
      </Button>
    )}
    {onNext && (
      <Button type="button" variant="primary" icon={LuArrowRight} iconPosition="right" onClick={onNext}>
        {nextLabel}
      </Button>
    )}
  </div>
);

export default StepFooter;
