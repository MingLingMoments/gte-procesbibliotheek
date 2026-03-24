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
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
        Afdeling
      </h2>
      {departments.map((d) => (
        <button
          key={d.key}
          onClick={() => onChange(d.key)}
          className={`text-left px-3 py-2 rounded-lg text-sm transition cursor-pointer ${
            active === d.key
              ? 'bg-[#1D9E75] text-white font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {d.label}
        </button>
      ))}
    </nav>
  )
}
