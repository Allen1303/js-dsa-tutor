import React from "react";
import {
  Award,
  Zap,
  CheckCircle2,
  Circle,
  Flame,
  GraduationCap,
  ChevronRight,
  Play,
} from "lucide-react";

export default function LessonsList({
  modules,
  progress,
  activeLessonId,
  onSelectLesson,
  bypassLocks = false,
  onToggleBypassLocks,
}) {
  // Compute progress metrics
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const percentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Calculate current streak
  const streak =
    completedCount > 0 ? Math.min(completedCount * 2 - 1 || 1, 5) : 0;

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] border-r border-zinc-200 text-zinc-800 font-sans select-none">
      {/* Platform Header branding */}
      <div className="p-6 border-b border-zinc-200 bg-zinc-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500 rounded-xl text-slate-950 shadow-md shadow-amber-500/10">
            <GraduationCap className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-1.5 leading-none">
              <span>learnjs</span>
              <span className="text-amber-600 font-mono text-[10px] uppercase px-1.5 py-0.5 bg-amber-500/10 rounded border border-amber-500/20 font-bold">
                dsa
              </span>
            </h1>
            <p className="text-[10px] text-zinc-500 mt-1 font-semibold uppercase tracking-wider">
              High Curation progression
            </p>
          </div>
        </div>

        {/* Gamified progress stats */}
        <div className="mt-5 bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Mastery Progress
            </span>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              <Zap className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />{" "}
              {progress.xp} XP
            </span>
          </div>

          <div className="mt-3.5 flex items-center gap-4">
            {/* Circular progress tracker */}
            <div className="relative flex items-center justify-center flex-shrink-0 w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-zinc-100"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-amber-500 transition-all duration-500"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - percentage / 100)}`}
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-zinc-800">
                {percentage}%
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-zinc-800">
                {completedCount} of {totalLessons} Units solved
              </p>
              {streak > 0 ? (
                <p className="text-[11px] text-zinc-600 flex items-center gap-1 mt-1 font-medium">
                  <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-500 animate-pulse" />
                  <span className="text-orange-600 font-bold">
                    {streak} Day Streak!
                  </span>
                </p>
              ) : (
                <p className="text-[10px] text-zinc-400 mt-1 font-medium">
                  Submit correct tests to build XP
                </p>
              )}
            </div>
          </div>
          {onToggleBypassLocks && (
            <div className="mt-4 pt-3 border-t border-zinc-150 flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                Free Jump Mode
              </span>
              <button
                id="bypass-locks-toggle"
                onClick={onToggleBypassLocks}
                className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg border transition-all ${
                  bypassLocks
                    ? "bg-amber-500/10 text-amber-700 border-amber-500/20 active:bg-amber-500/20"
                    : "bg-zinc-50 text-zinc-400 border-zinc-200 hover:text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {bypassLocks ? "🔓 ENGAGED" : "🔒 LOCKED"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progressive Modules Feed */}
      <div className="flex-1 overflow-y-auto p-5 space-y-7 scrollbar-thin scrollbar-thumb-zinc-300">
        {modules.map((m, mIdx) => {
          // Check progressive lock (first is always unlocked, others if previous is mostly done)
          const isModuleUnlocked =
            bypassLocks ||
            mIdx === 0 ||
            m.lessons.some((l) => progress.completedLessons.includes(l.id)) ||
            modules[mIdx - 1].lessons.every((l) =>
              progress.completedLessons.includes(l.id),
            );

          return (
            <div
              key={m.id}
              className={`space-y-3 transition-opacity duration-300 ${isModuleUnlocked ? "opacity-100" : "opacity-40 pointer-events-none"}`}
            >
              <div className="px-1">
                <h3 className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest">
                  {m.title}
                </h3>
                <p className="text-[10px] text-zinc-500 mt-0.5 font-medium leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="space-y-2">
                {m.lessons.map((lesson) => {
                  const isCompleted = progress.completedLessons.includes(
                    lesson.id,
                  );
                  const isActive = activeLessonId === lesson.id;

                  // Label colors
                  const difficultyColor =
                    lesson.difficulty === "Beginner"
                      ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
                      : lesson.difficulty === "Easy"
                        ? "text-blue-600 bg-blue-500/10 border-blue-500/20"
                        : "text-amber-600 bg-amber-500/10 border-amber-500/20";

                  return (
                    <button
                      id={`lesson-tab-${lesson.id}`}
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${
                        isActive
                          ? "bg-amber-500/10 border-amber-500 shadow-sm shadow-amber-500/5"
                          : isCompleted
                            ? "bg-white border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
                            : "bg-white border-zinc-200/80 hover:bg-zinc-50 hover:border-zinc-300"
                      }`}
                    >
                      {/* Active indicator side highlight */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500" />
                      )}

                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Status Checkbox/Circle Bullet icons */}
                        <div className="mt-0.5 flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                          ) : isActive ? (
                            <div className="h-5 w-5 rounded-full border-2 border-amber-500 flex items-center justify-center bg-amber-500/5">
                              <Play className="h-2 w-2 text-amber-600 fill-amber-600" />
                            </div>
                          ) : (
                            <Circle className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0 pr-1">
                          <h4
                            className={`text-xs font-bold transition-colors truncate ${
                              isActive ? "text-amber-800" : "text-zinc-800"
                            }`}
                          >
                            {lesson.title}
                          </h4>

                          <div className="flex items-center gap-2 mt-1.5">
                            <span
                              className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border leading-none ${difficultyColor}`}
                            >
                              {lesson.difficulty}
                            </span>
                            <span className="text-[9px] text-zinc-400 font-semibold font-mono">
                              {lesson.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        className={`h-4 w-4 flex-shrink-0 transition-transform ${
                          isActive
                            ? "text-amber-600 translate-x-0.5"
                            : "text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-0.5"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* App version footer */}
      <div className="p-4 border-t border-zinc-200 text-center bg-zinc-100">
        <p className="text-[10px] text-zinc-400 font-mono font-bold">
          JavaScript DSA Masterclass • v1.2.0
        </p>
      </div>
    </div>
  );
}
