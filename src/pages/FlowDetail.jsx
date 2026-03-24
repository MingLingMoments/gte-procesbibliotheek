import { useParams, Link } from 'react-router-dom'
import flows from '../data/flows.json'
import SwimlaneDiagram from '../components/SwimlaneDiagram'

export default function FlowDetail() {
  const { id } = useParams()
  const flow = flows.find((f) => f.id === id)

  if (!flow) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Proces niet gevonden</h2>
        <Link to="/" className="text-[#1D9E75] hover:underline">
          Terug naar overzicht
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="text-[#1D9E75] hover:underline">
          Overzicht
        </Link>
        <span>/</span>
        <span className="text-gray-700">{flow.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{flow.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>Categorie: <strong className="text-gray-700">{flow.category}</strong></span>
              <span className="text-gray-300">|</span>
              <span>Eigenaar: <strong className="text-gray-700">{flow.owner}</strong></span>
              <span className="text-gray-300">|</span>
              <span>Bijgewerkt: {flow.updated}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {flow.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#1D9E75]/10 text-[#1D9E75] px-2.5 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Swimlane Diagram */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Procesflow</h2>
        <SwimlaneDiagram lanes={flow.lanes} />
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Legenda</h3>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 rounded-full bg-gray-400" />
            <span>Startpunt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 rounded border-2 border-dashed border-gray-400" />
            <span>Beslissing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 rounded-md border-2 border-gray-400" />
            <span>Actie</span>
          </div>
        </div>
      </div>
    </main>
  )
}
