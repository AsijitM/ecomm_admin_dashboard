'use client';

import { FC } from 'react';
import { Copy, Edit, MoreHorizontal } from 'lucide-react';

import { BillboardColumn } from './columns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: FC<CellActionProps> = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="h-8 w-8 p-0">
          {/* sr-only means it will be only visible to the screen-readers */}
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
