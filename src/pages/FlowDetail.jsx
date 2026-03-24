import { useParams, Link } from 'react-router-dom'
import flows from '../data/flows.json'
import SwimlaneDiagram from '../components/SwimlaneDiagram'

export default function FlowDetail() {
  const { id } = useParams()
  const flow = flows.find((f) => f.id === id)

  if (!flow) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Proces niet gevonden</h2>
        <Link to="/" className="text-[#008948] dark:text-[#5BB446] hover:underline">
          Terug naar overzicht
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <Link to="/" className="text-[#008948] dark:text-[#5BB446] hover:underline">
          Overzicht
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">{flow.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white dark:bg-[#2D2D2D] rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{flow.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>Categorie: <strong className="text-gray-700 dark:text-gray-200">{flow.category}</strong></span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span>Eigenaar: <strong className="text-gray-700 dark:text-gray-200">{flow.owner}</strong></span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span>Bijgewerkt: {flow.updated}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {flow.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#008948]/10 text-[#008948] dark:bg-[#5BB446]/15 dark:text-[#5BB446] px-2.5 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Swimlane Diagram */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Procesflow</h2>
        <SwimlaneDiagram lanes={flow.lanes} />
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-[#2D2D2D] rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Legenda</h3>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 rounded-full bg-gray-500 dark:bg-[#444441]" />
            <span>Startpunt</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="32" height="20" viewBox="0 0 32 20">
              <polygon points="16,0 32,10 16,20 0,10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span>Beslispunt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 rounded-md border border-[#5BB446]" />
            <span>Actie</span>
          </div>
        </div>
      </div>
    </main>
  )
}
