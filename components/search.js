import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'

export default function Search({ setSearchBar }) {

    const searchRef = useRef(null)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])

    const searchEndpoint = (query) => `/api/search?q=${query}`

    const onChange = useCallback((event) => {
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            fetch(searchEndpoint(query))
                .then(res => res.json())
                .then(res => {
                    setResults(res.results)
                })
        } else {
            setResults([])
        }
    }, [])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])

    return (
        <div
            className='relative'
            ref={searchRef}
        >
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border">

                <input
                    className="h-full w-full outline-none text-sm text-gray-700 pl-2"
                    type="text"
                    id="search"
                    onChange={onChange}
                    onFocus={onFocus}
                    value={query}
                    placeholder="Find Products" />
                <div onClick={() => setSearchBar(false)} className="grid place-items-center h-full w-12 text-gray-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            {active && results.length > 0 && (
                <ul className='absolute top-full list-none overflow-hidden mx-0 left-0 right-0 border rounded-b-lg'>
                    {results.map(({ id, title, size, slug, type }) => (
                        <li className='p-4 bg-white border-b cursor-pointer hover:bg-gray-50 duration-200' key={id}>
                            <Link href={`/${type}/${slug}`}>
                                <p>{title} - {size}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}