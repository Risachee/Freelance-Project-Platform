import React from 'react';
import  SearchInput  from '../ui/SearchInput'

interface SectionHeaderProps {
  title: string;
  searchPlaceholder: string;
  search: string;
  setSearch: (value: string) => void;
  action: React.ReactNode;
  className?: string; 
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  searchPlaceholder,
  search,
  setSearch,
  action,
  className = ''
}) => (
  <>
    <h1 className={`text-4xl font-bold text-black mb-4 ${className}`}>
      {title}
    </h1>
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between gap-4">
        <SearchInput
          search={search}
          setSearch={setSearch}
          placeholder={searchPlaceholder}
        />
        {action}
      </div>
    </div>
  </>
);

export default SectionHeader;