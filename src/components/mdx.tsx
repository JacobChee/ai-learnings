type SlideProps = {
  number: number
  label?: string
  children: React.ReactNode
}

export function Slide({ number, label, children }: SlideProps) {
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
          <span className="text-[10px] uppercase tracking-widest text-[#f97316] font-semibold mb-1 block">
            {label}
          </span>
        )}
        <div className="text-sm text-[#1a1a1a] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export function Hook({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border-l-4 border-[#f97316] bg-[#fff8f3] px-6 py-5">
      <span className="text-[10px] uppercase tracking-widest text-[#f97316] font-semibold mb-3 block">
        LinkedIn Hook
      </span>
      <div className="text-base text-[#1a1a1a] leading-relaxed font-medium whitespace-pre-line">
        {children}
      </div>
    </div>
  )
}

export function GPTPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-[#e8e3dc] bg-[#fafaf9]">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-[#e8e3dc]">
        <span className="text-[10px] uppercase tracking-widest text-[#6b7280] font-semibold">
          GPT Image Generation Prompt
        </span>
        <span className="ml-auto text-xs text-[#6b7280]">paste into ChatGPT / DALL·E</span>
      </div>
      <pre className="px-5 py-4 text-xs text-[#374151] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
        {children}
      </pre>
    </div>
  )
}
