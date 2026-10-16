/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { History, Sparkles, Clock, Trash2, ArrowRight } from 'lucide-react';
import { EditVersion } from '../utils/editor-utils.ts';

interface VersionHistoryProps {
  history: EditVersion[];
  activeVersionId: string | null;
  onSelectVersion: (version: EditVersion) => void;
  onResetToOriginal: () => void;
  originalImage: string;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({
  history,
  activeVersionId,
  onSelectVersion,
  onResetToOriginal,
  originalImage,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-900/90 border-l border-slate-800 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Edit History ({history.length + 1})
          </span>
        </div>
      </div>

      <div className="space-y-2.5 flex-1">
        {/* Step 0: Original Photo */}
        <button
          type="button"
          onClick={onResetToOriginal}
          aria-label="View original photo"
          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
            activeVersionId === null
              ? 'bg-sky-500/10 border-sky-500/60 ring-1 ring-sky-500/40'
              : 'bg-slate-950/40 hover:bg-slate-800/60 border-slate-800/80'
          }`}
        >
          <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden border border-slate-800 flex-shrink-0">
            <img
              src={originalImage}
              alt="Original"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Original Upload</span>
              <span className="text-[10px] text-slate-500 font-mono">Step 0</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">Source product photo</p>
          </div>
        </button>

        {/* History versions */}
        {history.map((ver, idx) => {
          const isSelected = activeVersionId === ver.id;
          return (
            <button
              key={ver.id}
              type="button"
              onClick={() => onSelectVersion(ver)}
              aria-label={`Select ${ver.label}`}
              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-sky-500/10 border-sky-500/60 ring-1 ring-sky-500/40'
                  : 'bg-slate-950/40 hover:bg-slate-800/60 border-slate-800/80'
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden border border-slate-800 flex-shrink-0 relative">
                <img
                  src={ver.imageUrl}
                  alt={ver.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{ver.label}</span>
                  <span className="text-[10px] text-sky-400 font-mono">v{idx + 1}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1" title={ver.prompt}>
                  "{ver.prompt}"
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{new Date(ver.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
        Click any version to review or continue building prompts upon it.
      </div>
    </div>
  );
};
