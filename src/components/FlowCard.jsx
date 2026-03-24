import { Link } from 'react-router-dom'

const categoryColors = {
  Verkoop: 'bg-[#F6DD00]/15 text-[#B8A400] dark:text-[#F6DD00]',
  Service: 'bg-[#5BB446]/15 text-[#3D8C30] dark:text-[#5BB446]',
  Project: 'bg-[#008948]/15 text-[#006B38] dark:text-[#5BB446]',
}

export default function FlowCard({ flow }) {
  return (
    <Link
      to={`/flow/${flow.id}`}
      className="block bg-white dark:bg-[#2D2D2D] rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-[#5BB446]/40 transition group no-underline"
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            categoryColors[flow.category] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {flow.category}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{flow.updated}</span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#008948] dark:group-hover:text-[#5BB446] transition">
        {flow.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Eigenaar: {flow.owner}</p>
      <div className="flex flex-wrap gap-1.5">
        {flow.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
        </svg>
        {flow.lanes.length} swimlanes · {flow.lanes.reduce((sum, l) => sum + l.steps.length, 0)} stappen
      </div>
    </Link>
  )
}
