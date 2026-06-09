import { useState, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

export function StopwatchTool() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startRef = useRef(0);

  const format = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const c = Math.floor((ms % 1000) / 10);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(c).padStart(2,'0')}`;
  };

  const start = useCallback(() => {
    setRunning(true);
    startRef.current = Date.now() - time;
    intervalRef.current = window.setInterval(() => {
      setTime(Date.now() - startRef.current);
    }, 10);
  }, [time]);

  const pause = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    pause();
    setTime(0);
    setLaps([]);
  }, [pause]);

  const lap = useCallback(() => {
    setLaps(prev => [...prev, time]);
  }, [time]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="text-4xl font-mono font-bold text-foreground">{format(time)}</span>
      </div>
      <div className="flex justify-center gap-3">
        {!running ? (
          <button onClick={start} className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"><Play className="w-4 h-4"/> Start</button>
        ) : (
          <button onClick={pause} className="px-6 py-2 bg-amber-600 text-white rounded-lg flex items-center gap-2 hover:bg-amber-700"><Pause className="w-4 h-4"/> Pause</button>
        )}
        <button onClick={lap} disabled={!running} className="px-4 py-2 border rounded-lg flex items-center gap-2 disabled:opacity-40"><Flag className="w-4 h-4"/> Lap</button>
        <button onClick={reset} className="px-4 py-2 border rounded-lg flex items-center gap-2"><RotateCcw className="w-4 h-4"/> Reset</button>
      </div>
      {laps.length > 0 && (
        <div className="space-y-1 max-h-48 overflow-auto">
          {laps.map((t, i) => (
            <div key={i} className="flex justify-between text-sm px-3 py-1.5 bg-accent/30 rounded">
              <span className="text-muted-foreground">Lap {i+1}</span>
              <span className="font-mono">{format(t)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
