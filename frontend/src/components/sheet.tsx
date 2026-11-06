'use client';

import { useShallow } from 'zustand/shallow';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAppSheetStore } from '@/store/sheet.store';

function AppSheet() {
  const { open, type, size, title, description, content, setSheetOpen } = useAppSheetStore(
    useShallow((state) => ({
      open: state.open,
      type: state.type,
      size: state.size,
      title: state.title,
      description: state.description,
      content: state.content,
      setSheetOpen: state.setSheetOpen,
    })),
  );

  let sheetSizeClasses = 'sm:max-w-sm';

  if (size === 'medium') sheetSizeClasses = 'sm:max-w-lg';
  if (size === 'large') sheetSizeClasses = 'sm:max-w-2xl';
  if (size === 'xlarge') sheetSizeClasses = 'sm:max-w-3xl';

  return (
    <Sheet open={open} onOpenChange={(open) => !open && setSheetOpen(false)}>
      <SheetContent className={sheetSizeClasses}>
        <SheetHeader>
          {title && <SheetTitle>Are you absolutely sure?</SheetTitle>}
          {description && <SheetDescription>This action cannot be undone.</SheetDescription>}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">{content}</div>
        <SheetFooter>
          {type === 'form' && <Button type="submit">Save changes</Button>}
          <SheetClose
            render={
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AppSheet };
