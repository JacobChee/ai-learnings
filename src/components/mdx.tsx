type SlideProps = {
  number: number
  label?: string
  visual?: string
  children: React.ReactNode
}

export function Slide({ number, label, visual, children }: SlideProps) {
  return (
    <div className="not-prose my-3 flex gap-4 rounded-xl border border-[#e8e3dc] bg-white p-5">
      <div className="shrink-0 flex flex-col items-center gap-1">
        <span className="w-8 h-8 rounded-full bg-[#f97316] text-white text-sm font-bold flex items-center justify-center">
          {number}
        </span>
        {number < 7 && <div className="w-px flex-1 bg-[#e8e3dc] mt-1" />}
      </div>
      <div className="flex-1 min-w-0">
        {label && (
          <span className="text-[10px] uppercase tracking-widest text-[#f97316] font-semibold mb-1.5 block">
            {label}
          </span>
        )}
        <div className="text-sm text-[#1a1a1a] leading-relaxed">{children}</div>
        {visual && (
          <p className="mt-2 text-xs text-[#9ca3af] italic border-t border-[#f0ece6] pt-2">
            🎨 {visual}
          </p>
        )}
      </div>
    </div>
  )
}

export function Hook({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border-l-4 border-[#f97316] bg-[#fff8f3] px-6 py-5">
      <span className="text-[10px] uppercase tracking-widest text-[#f97316] font-semibold mb-3 block">
        LinkedIn Hook (caption)
      </span>
      <div className="text-base text-[#1a1a1a] leading-relaxed font-medium whitespace-pre-line">
        {children}
      </div>
    </div>
  )
}
