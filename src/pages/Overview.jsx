import { useState, useMemo } from 'react'
import flows from '../data/flows.json'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import FlowCard from '../components/FlowCard'

export default function Overview() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return flows.filter((flow) => {
      if (dept !== 'all' && flow.dept !== dept) return false
      if (!q) return true
      return (
        flow.title.toLowerCase().includes(q) ||
        flow.owner.toLowerCase().includes(q) ||
        flow.category.toLowerCase().includes(q) ||
        flow.tags.some((t) => t.toLowerCase().includes(q)) ||
        flow.lanes.some((l) =>
          l.steps.some((s) => s.label.toLowerCase().includes(q))
        )
      )
    })
  }, [search, dept])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Procesoverzicht</h2>
        <p className="text-gray-500 text-sm">
          Doorzoek en bekijk alle procesflows van Green Teams Europe
        </p>
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-8">
            <FilterPanel active={dept} onChange={setDept} />
          </div>
        </aside>

        {/* Grid */}
        <section className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">Geen processen gevonden</p>
              <p className="text-sm mt-1">Probeer een andere zoekterm of filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((flow) => (
                <FlowCard key={flow.id} flow={flow} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
