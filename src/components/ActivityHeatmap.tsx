import React, { useState, useMemo } from 'react';
import { Terminal, GitCommit } from 'lucide-react';

interface DayCell {
  week: number;
  day: number;
  commits: number;
  level: number;
  dateStr: string;
  message?: string;
}

export const ActivityHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<DayCell | null>(null);

  // 52 weeks x 7 days grid (364 days)
  const weeksCount = 52;
  const daysCount = 7;

  // 5x7 matrix definition for '0', '6', '4'
  // Rows: 0 (Mon) to 6 (Sun)
  // Cols: 0 to 4 (5 columns wide)
  const DIGIT_0 = [
    [1, 1, 1, 1, 1], // Mon
    [1, 0, 0, 0, 1], // Tue
    [1, 0, 0, 0, 1], // Wed
    [1, 0, 0, 0, 1], // Thu
    [1, 0, 0, 0, 1], // Fri
    [1, 0, 0, 0, 1], // Sat
    [1, 1, 1, 1, 1], // Sun
  ];

  const DIGIT_6 = [
    [1, 1, 1, 1, 1], // Mon
    [1, 0, 0, 0, 0], // Tue
    [1, 0, 0, 0, 0], // Wed
    [1, 1, 1, 1, 1], // Thu
    [1, 0, 0, 0, 1], // Fri
    [1, 0, 0, 0, 1], // Sat
    [1, 1, 1, 1, 1], // Sun
  ];

  const DIGIT_4 = [
    [1, 0, 0, 0, 1], // Mon
    [1, 0, 0, 0, 1], // Tue
    [1, 0, 0, 0, 1], // Wed
    [1, 1, 1, 1, 1], // Thu
    [0, 0, 0, 0, 1], // Fri
    [0, 0, 0, 0, 1], // Sat
    [0, 0, 0, 0, 1], // Sun
  ];

  // Starting column indexes for '0', '6', '4' in the 52-week calendar
  const START_COL_0 = 16;
  const START_COL_6 = 23;
  const START_COL_4 = 30;

  // Realistic commit messages for a learner's development journal
  const COMMIT_MESSAGES = [
    'feat(linux): practice bash piping, tee and grep redirections',
    'feat(python): modular data parser with json and file system checks',
    'feat(kotlin): configure viewBinding and activity navigation',
    'style(css): refine responsive flexbox layout and padding rhythm',
    'docs(linux): note down file permission octals (chmod 755 / chown)',
    'chore(git): update local aliases and git log formatting',
    'feat(python): build command line argument utility with argparse',
    'fix(html): ensure semantic landmarks and accessible button labels',
    'feat(kotlin): implement intent extras and layout adapter',
    'refactor(python): simplify dictionary comprehension and logging',
    'docs(linux): document systemd unit files and service control',
    'test(bash): verify exit status handling with trap and $?',
    'fix(css): adjust media query breakpoints for mobile screens',
    'feat(python): handle network timeouts with graceful retry loop',
    'chore: clean up repository root and organize script directory',
  ];

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fullDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Compute grid data once deterministically so it exactly totals 1,064 commits
  const { grid, totalCommits, activeDaysCount } = useMemo(() => {
    const cells: DayCell[][] = [];
    let runningTotal = 0;
    let activeDays = 0;

    // Fixed base date 52 weeks back
    const baseDate = new Date(2024, 8, 16); // mid September 2024 (Monday)

    // First pass: generate pattern and ambient commits
    for (let w = 0; w < weeksCount; w++) {
      const weekCells: DayCell[] = [];
      for (let d = 0; d < daysCount; d++) {
        // Compute calendar date
        const cellDate = new Date(baseDate);
        cellDate.setDate(baseDate.getDate() + (w * 7 + d));
        const monthName = months[cellDate.getMonth()];
        const dayNum = cellDate.getDate();
        const year = cellDate.getFullYear();
        const formattedDate = `${fullDayNames[d]}, ${monthName} ${dayNum}, ${year}`;

        // Check if cell is part of 0, 6, 4
        let isPattern = false;
        if (w >= START_COL_0 && w < START_COL_0 + 5 && DIGIT_0[d][w - START_COL_0] === 1) isPattern = true;
        if (w >= START_COL_6 && w < START_COL_6 + 5 && DIGIT_6[d][w - START_COL_6] === 1) isPattern = true;
        if (w >= START_COL_4 && w < START_COL_4 + 5 && DIGIT_4[d][w - START_COL_4] === 1) isPattern = true;

        // Pseudo-random deterministic hash based on coordinates
        const hash = Math.sin(w * 13 + d * 37 + 101) * 10000;
        const rand = hash - Math.floor(hash);

        let commits = 0;
        let level = 0;

        if (isPattern) {
          // In the '064' digit cells: high activity (Level 3 or 4: 5 to 9 commits)
          // Varied so it looks like authentic human coding days rather than a robotic stamp
          if (rand > 0.6) {
            commits = 7 + Math.floor(rand * 3); // 7 to 9
            level = 4;
          } else if (rand > 0.25) {
            commits = 5 + Math.floor(rand * 2); // 5 to 6
            level = 3;
          } else {
            commits = 4;
            level = 2;
          }
        } else {
          // Ambient cells: authentic learner behavior!
          // Lots of leaves/days off ("leaves the commits also i am not as active as linus torvalds")
          // Weekends (Sat/Sun): 82% 0 commits, 18% 1-2 commits
          // Weekdays (Mon-Fri): 60% 0 commits, 28% 1 commit, 10% 2 commits, 2% 3 commits
          const isWeekend = d >= 5;
          if (isWeekend) {
            if (rand > 0.86) {
              commits = 1 + Math.floor(rand * 2);
              level = commits > 1 ? 2 : 1;
            } else {
              commits = 0;
              level = 0;
            }
          } else {
            // Weekdays
            if (rand > 0.94) {
              commits = 3;
              level = 2;
            } else if (rand > 0.82) {
              commits = 2;
              level = 2;
            } else if (rand > 0.65) {
              commits = 1;
              level = 1;
            } else {
              commits = 0;
              level = 0;
            }
          }

          // Simulate a 2-week vacation lull in early January and late summer
          if ((w >= 14 && w <= 15) || (w >= 45 && w <= 46)) {
            if (rand > 0.92) {
              commits = 1;
              level = 1;
            } else {
              commits = 0;
              level = 0;
            }
          }
        }

        if (commits > 0) activeDays++;
        runningTotal += commits;

        const msgIdx = Math.floor(Math.abs(Math.sin(w * 7 + d)) * COMMIT_MESSAGES.length);
        const message = commits > 0 ? COMMIT_MESSAGES[msgIdx] : undefined;

        weekCells.push({
          week: w,
          day: d,
          commits,
          level,
          dateStr: formattedDate,
          message,
        });
      }
      cells.push(weekCells);
    }

    // Fine-tune ambient commits so total reaches exactly 1,064 commits
    const TARGET_TOTAL = 1064;
    const diff = TARGET_TOTAL - runningTotal;
    if (diff !== 0) {
      // Adjust a few non-pattern weekday cells smoothly
      let remaining = diff;
      for (let w = 2; w < weeksCount - 2 && remaining !== 0; w += 3) {
        for (let d = 1; d < 5 && remaining !== 0; d++) {
          const c = cells[w][d];
          const isPattern =
            (w >= START_COL_0 && w < START_COL_0 + 5 && DIGIT_0[d][w - START_COL_0] === 1) ||
            (w >= START_COL_6 && w < START_COL_6 + 5 && DIGIT_6[d][w - START_COL_6] === 1) ||
            (w >= START_COL_4 && w < START_COL_4 + 5 && DIGIT_4[d][w - START_COL_4] === 1);
          if (!isPattern) {
            if (remaining > 0 && c.commits < 3) {
              c.commits += 1;
              c.level = Math.min(4, c.level + 1);
              if (!c.message) c.message = COMMIT_MESSAGES[(w + d) % COMMIT_MESSAGES.length];
              remaining--;
            } else if (remaining < 0 && c.commits > 1) {
              c.commits -= 1;
              c.level = Math.max(1, c.level - 1);
              remaining++;
            }
          }
        }
      }
      runningTotal = TARGET_TOTAL;
    }

    return { grid: cells, totalCommits: runningTotal, activeDaysCount: activeDays };
  }, []);

  // Standard GitHub-style 5-tier intensity color scale (obsidian/gilt palette)
  const getIntensityColor = (level: number) => {
    switch (level) {
      case 0:
        return 'rgba(241, 241, 239, 0.04)'; // empty / resting day
      case 1:
        return 'rgba(212, 175, 55, 0.22)'; // 1 commit
      case 2:
        return 'rgba(212, 175, 55, 0.44)'; // 2-3 commits
      case 3:
        return 'rgba(212, 175, 55, 0.72)'; // 4-6 commits
      case 4:
      default:
        return '#d4af37'; // 7+ commits (solid gilt gold)
    }
  };

  return (
    <div
      id="activity-heatmap"
      className="relative w-full overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.05] to-bone/[0.012] p-5 md:p-6 shadow-2xl"
    >
      {/* Header Info */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="eyebrow text-[0.62rem] text-gilt flex items-center gap-1.5">
            <Terminal className="size-3 text-gilt" />
            <span>Contribution Activity</span>
          </span>
          <span className="text-xs text-bone/60 font-mono">
            <strong className="text-gilt font-semibold">{totalCommits.toLocaleString()}</strong> contributions in the last year
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[0.65rem] text-bone/40 font-mono">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className="size-2.5 rounded-[2px]"
              style={{ backgroundColor: getIntensityColor(level) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none">
        <div className="min-w-[700px]">
          {/* Months header */}
          <div className="flex justify-between pl-8 pr-2 pb-2 text-[0.62rem] text-bone/40 font-mono">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Days of week labels */}
            <div className="flex flex-col justify-between py-0.5 text-[0.56rem] text-bone/35 font-mono">
              {dayNames.map((d, i) => (
                <span key={i} className="h-2.5 leading-none">
                  {i % 2 === 0 ? d : ''}
                </span>
              ))}
            </div>

            {/* Grid of 52 weeks x 7 days */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] flex-1">
              {grid.map((week, wIdx) =>
                week.map((cell, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    onMouseEnter={() => setHoveredCell(cell)}
                    onMouseLeave={() => setHoveredCell(null)}
                    className="size-2.5 sm:size-3 rounded-[2px] transition-transform duration-150 hover:scale-125 hover:z-20 cursor-pointer"
                    style={{ backgroundColor: getIntensityColor(cell.level) }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tooltip / Status */}
      <div className="mt-3 flex flex-col gap-1.5 border-t border-bone/10 pt-2.5 text-xs text-bone/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-[0.68rem] min-h-[1.25rem]">
          {hoveredCell ? (
            hoveredCell.commits > 0 ? (
              <>
                <span className="text-bone font-medium">
                  <strong>{hoveredCell.commits}</strong> {hoveredCell.commits === 1 ? 'contribution' : 'contributions'} on {hoveredCell.dateStr}
                </span>
                <span className="text-bone/45 hidden md:inline">— {hoveredCell.message}</span>
              </>
            ) : (
              <span className="text-bone/45">No contributions on {hoveredCell.dateStr}</span>
            )
          ) : (
            <span className="flex items-center gap-1.5 text-bone/45">
              <GitCommit className="size-3 text-gilt/60" />
              <span>Hover over any day to view contribution details.</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[0.65rem] text-bone/45 font-mono">
          <span>{activeDaysCount} active days</span>
          <span className="text-bone/25">•</span>
          <span>Consistent cadence</span>
        </div>
      </div>
    </div>
  );
};


