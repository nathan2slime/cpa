'use client';
import { Button } from '@/components/ui/button';
import { CirclePlus, StretchHorizontal } from 'lucide-react';
import React from 'react';

interface OptionNewFormProps {
  onClick?: () => void;
}

export const MenuOptionNewForm: React.FC<OptionNewFormProps> = ({
  onClick,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 mt-2 flex items-center gap-4 bg-white w-min m-auto rounded-full p-1">
      <Button
        className="rounded-full"
        variant="ghost"
        size="icon"
        onClick={onClick}
        disabled
      >
        <StretchHorizontal size={20} />
      </Button>

      <Button
        className="rounded-full"
        variant="ghost"
        size="icon"
        onClick={onClick}
      >
        <CirclePlus size={20} />
      </Button>
    </div>
  );
};
