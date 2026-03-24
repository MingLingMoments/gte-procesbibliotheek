import { useTheme } from '../context/ThemeContext'

const HEADER_HEIGHT = 32
const STEP_HEIGHT = 48
const STEP_GAP = 50
const DIAMOND_H = 28
const DIAMOND_W = 70
const PADDING_TOP = 50
const PADDING_BOTTOM = 40
const MIN_LANE_WIDTH = 180
const STEP_BOX_WIDTH = 160
const STEP_BOX_HEIGHT = 44

const colorMap = {
  blue:   { bg: '#DBEAFE', border: '#3B82F6', lane: '#EFF6FF', text: '#1E40AF', headerBg: '#DBEAFE' },
  pink:   { bg: '#FCE7F3', border: '#EC4899', lane: '#FDF2F8', text: '#9D174D', headerBg: '#FCE7F3' },
  teal:   { bg: '#CCFBF1', border: '#14B8A6', lane: '#F0FDFA', text: '#115E59', headerBg: '#CCFBF1' },
  amber:  { bg: '#FEF3C7', border: '#F59E0B', lane: '#FFFBEB', text: '#92400E', headerBg: '#FEF3C7' },
  purple: { bg: '#EDE9FE', border: '#8B5CF6', lane: '#F5F3FF', text: '#5B21B6', headerBg: '#EDE9FE' },
}

const darkColorMap = {
  blue:   { bg: '#0C446C', border: '#85B7EB', lane: '#172237', text: '#B5D4F4', headerBg: '#1E3A5F' },
  pink:   { bg: '#72243E', border: '#ED93B1', lane: '#2D1228', text: '#F4C0D1', headerBg: '#4A1942' },
  teal:   { bg: '#085041', border: '#5DCAA5', lane: '#0F2D2B', text: '#9FE1CB', headerBg: '#134E4A' },
  amber:  { bg: '#4A3728', border: '#F59E0B', lane: '#2D2218', text: '#FCD34D', headerBg: '#3D2E1E' },
  purple: { bg: '#3C3489', border: '#AFA9EC', lane: '#251748', text: '#CECBF6', headerBg: '#3B2670' },
}

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    if (current && (current + ' ' + word).length > maxChars) {
      lines.push(current)
      current = word
    } else {
      current = current ? current + ' ' + word : word
    }
  }
  if (current) lines.push(current)
  return lines
}

export default function SwimlaneDiagram({ lanes }) {
  const { dark } = useTheme()
  const palette = dark ? darkColorMap : colorMap
  const arrowColor = dark ? '#9C9A92' : '#94A3B8'
  const laneStroke = dark ? 'rgba(222,220,209,0.15)' : '#E2E8F0'
  const bgColor = dark ? '#141413' : '#F8FAFC'

  const maxSteps = Math.max(...lanes.map((l) => l.steps.length))
  const totalRows = maxSteps

  const laneCount = lanes.length
  const laneWidth = Math.max(MIN_LANE_WIDTH, 200)
  const svgWidth = laneCount * laneWidth
  const svgHeight = PADDING_TOP + totalRows * (STEP_HEIGHT + STEP_GAP) + PADDING_BOTTOM

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141413]">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
        height={svgHeight}
        className="min-w-full"
        style={{ minWidth: svgWidth }}
      >
        <defs>
          <marker
            id="arrowDown"
            viewBox="0 0 10 10"
            refX="5"
            refY="8"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M2 1L5 8L8 1"
              fill="none"
              stroke={arrowColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={svgWidth} height={svgHeight} fill={bgColor} />

        {/* Lane columns */}
        {lanes.map((lane, laneIdx) => {
          const colors = palette[lane.color] || palette.teal
          const x = laneIdx * laneWidth

          return (
            <g key={`lane-${laneIdx}`}>
              {/* Lane background */}
              <rect
                x={x}
                y={0}
                width={laneWidth}
                height={svgHeight}
                fill={colors.lane}
                opacity={laneIdx === 0 ? 0.8 : 0.4}
              />
              {/* Lane separator */}
              {laneIdx > 0 && (
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={svgHeight}
                  stroke={laneStroke}
                  strokeWidth={1}
                />
              )}
              {/* Lane header label */}
              <text
                x={x + laneWidth / 2}
                y={16}
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.text}
                fontSize={11}
                fontWeight={600}
                letterSpacing="0.5"
                style={{ textTransform: 'uppercase' }}
              >
                {lane.role.toUpperCase()}
              </text>
            </g>
          )
        })}

        {/* Header separator line */}
        <line
          x1={0}
          y1={HEADER_HEIGHT}
          x2={svgWidth}
          y2={HEADER_HEIGHT}
          stroke={laneStroke}
          strokeWidth={1}
        />

        {/* Steps per lane */}
        {lanes.map((lane, laneIdx) => {
          const colors = palette[lane.color] || palette.teal
          const cx = laneIdx * laneWidth + laneWidth / 2

          return (
            <g key={`steps-${laneIdx}`}>
              {lane.steps.map((step, stepIdx) => {
                const cy = PADDING_TOP + stepIdx * (STEP_HEIGHT + STEP_GAP) + STEP_HEIGHT / 2
                const lines = wrapText(step.label, 20)

                return (
                  <g key={stepIdx}>
                    {/* Vertical connector arrow from previous step */}
                    {stepIdx > 0 && (
                      <line
                        x1={cx}
                        y1={cy - STEP_HEIGHT / 2 - STEP_GAP + STEP_HEIGHT / 2 + (lane.steps[stepIdx - 1].type === 'decision' ? DIAMOND_H / 2 : STEP_BOX_HEIGHT / 2)}
                        x2={cx}
                        y2={cy - (step.type === 'decision' ? DIAMOND_H / 2 : STEP_BOX_HEIGHT / 2)}
                        stroke={arrowColor}
                        strokeWidth={1.5}
                        markerEnd="url(#arrowDown)"
                      />
                    )}

                    {step.type === 'start' ? (
                      <>
                        <rect
                          x={cx - STEP_BOX_WIDTH / 2}
                          y={cy - 18}
                          width={STEP_BOX_WIDTH}
                          height={36}
                          rx={18}
                          fill={dark ? '#444441' : colors.border}
                          stroke={dark ? '#B4B2A9' : colors.border}
                          strokeWidth={0.5}
                        />
                        {lines.map((line, i) => (
                          <text
                            key={i}
                            x={cx}
                            y={cy + (i - (lines.length - 1) / 2) * 13}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fill={dark ? '#B4B2A9' : 'white'}
                            fontWeight={500}
                          >
                            {line}
                          </text>
                        ))}
                      </>
                    ) : step.type === 'decision' ? (
                      <>
                        <polygon
                          points={`${cx},${cy - DIAMOND_H} ${cx + DIAMOND_W},${cy} ${cx},${cy + DIAMOND_H} ${cx - DIAMOND_W},${cy}`}
                          fill={dark ? '#30302E' : '#fff'}
                          stroke={colors.border}
                          strokeWidth={0.5}
                        />
                        {lines.map((line, i) => (
                          <text
                            key={i}
                            x={cx}
                            y={cy + (i - (lines.length - 1) / 2) * 13}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={11}
                            fill={dark ? '#C2C0B6' : colors.text}
                            fontWeight={400}
                          >
                            {line}
                          </text>
                        ))}
                      </>
                    ) : (
                      <>
                        <rect
                          x={cx - STEP_BOX_WIDTH / 2}
                          y={cy - STEP_BOX_HEIGHT / 2}
                          width={STEP_BOX_WIDTH}
                          height={STEP_BOX_HEIGHT}
                          rx={8}
                          fill={colors.bg}
                          stroke={colors.border}
                          strokeWidth={0.5}
                        />
                        {lines.map((line, i) => (
                          <text
                            key={i}
                            x={cx}
                            y={cy + (i - (lines.length - 1) / 2) * 14}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fill={colors.text}
                            fontWeight={500}
                          >
                            {line}
                          </text>
                        ))}
                      </>
                    )}
                  </g>
                )
              })}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
