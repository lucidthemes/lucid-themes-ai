import { useState, useEffect } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DocumentationIngestJobParseUploadDocumentFormFieldPages({
  setPages,
}: {
  setPages: Dispatch<SetStateAction<number>>;
}) {
  const [pagesOption, setPagesOption] = useState('all');
  const [pageRangeFrom, setPageRangeFrom] = useState(1);
  const [pageRangeTo, setPageRangeTo] = useState(1);
  const [pageRangeUpdated, setPageRangeUpdated] = useState(false);

  const handlePageRangeUpdate = ({
    e,
    option,
  }: {
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>;
    option: 'from' | 'to';
  }) => {
    const rangeValue = e.target.valueAsNumber;

    if (!rangeValue) return;

    setPageRangeUpdated(true);

    if (option === 'from') {
      if (rangeValue <= pageRangeTo) {
        setPageRangeFrom(rangeValue);
      } else {
        setPageRangeFrom(rangeValue);
        setPageRangeTo(rangeValue);
      }
    }

    if (option === 'to') {
      if (rangeValue >= pageRangeFrom) {
        setPageRangeTo(rangeValue);
      } else {
        setPageRangeTo(rangeValue);
        setPageRangeFrom(rangeValue);
      }
    }
  };

  useEffect(() => {
    if (!pageRangeUpdated) return;

    const rangeTotal = pageRangeTo - pageRangeFrom;

    const updateRangeTotal = () => {
      setPages(rangeTotal);
    };

    if (rangeTotal) updateRangeTotal();
  }, [setPages, pageRangeFrom, pageRangeTo, pageRangeUpdated]);

  const pagesOptions = [
    { label: 'All pages', value: 'all' },
    { label: 'Page range', value: 'range' },
  ];

  return (
    <div className="flex gap-5">
      <Select items={pagesOptions} defaultValue="all">
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pages</SelectLabel>
            {pagesOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="cursor-pointer"
                onClick={() => setPagesOption(option.value)}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {pagesOption === 'range' && (
        <div className="flex basis-1/2 items-center gap-2.5">
          <Input
            type="number"
            min={1}
            value={pageRangeFrom}
            onChange={(e) => handlePageRangeUpdate({ e, option: 'from' })}
          />
          <span>to</span>
          <Input
            type="number"
            min={1}
            value={pageRangeTo}
            onChange={(e) => handlePageRangeUpdate({ e, option: 'to' })}
          />
        </div>
      )}
    </div>
  );
}
