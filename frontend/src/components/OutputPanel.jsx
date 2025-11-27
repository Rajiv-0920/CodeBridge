import { Terminal, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

function OutputPanel({ output }) {
  return (
    <div className='h-full flex flex-col bg-[#1e1e1e] text-gray-300 font-mono'>
      {/* TERMINAL HEADER */}
      <div className='flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5 select-none'>
        <div className='flex items-center gap-2'>
          <Terminal className='size-3.5 text-gray-500' />
          <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
            Console Output
          </span>
        </div>

        {/* STATUS INDICATOR */}
        {output && (
          <div
            className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border ${
              output.success
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            {output.success ? (
              <>
                <CheckCircle2 className='size-3' />
                <span>Success</span>
              </>
            ) : (
              <>
                <AlertCircle className='size-3' />
                <span>Error</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* TERMINAL BODY */}
      <div className='flex-1 p-4 overflow-auto custom-scrollbar'>
        {!output ? (
          <div className='h-full flex flex-col items-center justify-center text-gray-600 space-y-3'>
            <div className='size-12 rounded-xl bg-white/5 flex items-center justify-center'>
              <Terminal className='size-6 opacity-50' />
            </div>
            <p className='text-sm'>Run your code to see output...</p>
          </div>
        ) : (
          <div className='space-y-2'>
            {/* Standard Output */}
            {output.output && (
              <div className='space-y-1'>
                <span className='text-xs text-gray-500 block mb-1'>
                  STDOUT:
                </span>
                <pre className='text-sm text-gray-300 whitespace-pre-wrap leading-relaxed pl-2 border-l-2 border-gray-700'>
                  {output.output}
                </pre>
              </div>
            )}

            {/* Error Output */}
            {output.error && (
              <div className='space-y-1 pt-2'>
                <span className='text-xs text-rose-500/70 block mb-1'>
                  STDERR:
                </span>
                <pre className='text-sm text-rose-400 whitespace-pre-wrap leading-relaxed pl-2 border-l-2 border-rose-900/50 bg-rose-950/10 p-2 rounded'>
                  {output.error}
                </pre>
              </div>
            )}

            {/* Execution Meta (Fake) */}
            <div className='pt-4 mt-4 border-t border-white/5'>
              <p className='text-[10px] text-gray-600'>
                Process finished with exit code {output.error ? 1 : 0}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPanel
