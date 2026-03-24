const departments = [
  { key: 'all', label: 'Alle afdelingen' },
  { key: 'tech', label: 'Technisch AM' },
  { key: 'service', label: 'Service' },
  { key: 'project', label: 'Project' },
  { key: 'commercieel', label: 'Commercieel' },
]

export default function FilterPanel({ active, onChange }) {
  return (
    <nav className="flex flex-col gap-1">
      <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
        Afdeling
      </h2>
      {departments.map((d) => (
        <button
          key={d.key}
          onClick={() => onChange(d.key)}
          className={`text-left px-3 py-2 rounded-lg text-sm transition cursor-pointer ${
            active === d.key
              ? 'bg-[#008948] text-white font-medium'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {d.label}
        </button>
      ))}
    </nav>
  )
}
