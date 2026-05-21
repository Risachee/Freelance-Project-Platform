import { type InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string
    search: string
    setSearch: any
}

const SearchInput = ({
    placeholder = "Поиск...",
    search,
    setSearch,
}: SearchInputProps) => {
  
    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    )
}
export default SearchInput