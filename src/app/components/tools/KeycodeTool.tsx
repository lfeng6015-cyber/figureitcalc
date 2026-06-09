import { useState, useEffect } from "react";

const KEY_MAP: Record<string, string> = {
  Backspace:'Backspace',Tab:'Tab',Enter:'Enter',Shift:'Shift',Control:'Ctrl',Alt:'Alt',
  Escape:'Escape',Space:'Space',ArrowLeft:'Left',ArrowUp:'Up',ArrowRight:'Right',ArrowDown:'Down',
  Delete:'Delete',Insert:'Insert',Home:'Home',End:'End',PageUp:'PageUp',PageDown:'PageDown',
  CapsLock:'CapsLock',NumLock:'NumLock',ScrollLock:'ScrollLock',PrintScreen:'PrintScreen',
  ContextMenu:'ContextMenu',F1:'F1',F2:'F2',F3:'F3',F4:'F4',F5:'F5',F6:'F6',F7:'F7',F8:'F8',F9:'F9',F10:'F10',F11:'F11',F12:'F12',
};

export function KeycodeTool() {
  const [lastKey, setLastKey] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      setLastKey(e);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-center p-6 bg-accent/30 rounded-xl border-2 border-dashed border-primary/40">
        <p className="text-lg font-semibold text-foreground mb-2">Press any key</p>
        <p className="text-sm text-muted-foreground">The key details will appear below</p>
      </div>

      {lastKey && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-accent/20 rounded-lg">
            <span className="text-xs text-muted-foreground">event.key</span>
            <p className="text-xl font-bold font-mono">{lastKey.key}</p>
          </div>
          <div className="p-3 bg-accent/20 rounded-lg">
            <span className="text-xs text-muted-foreground">event.code</span>
            <p className="text-xl font-bold font-mono">{lastKey.code}</p>
          </div>
          <div className="p-3 bg-accent/20 rounded-lg">
            <span className="text-xs text-muted-foreground">event.keyCode</span>
            <p className="text-xl font-bold font-mono">{lastKey.keyCode}</p>
          </div>
          <div className="p-3 bg-accent/20 rounded-lg">
            <span className="text-xs text-muted-foreground">event.which</span>
            <p className="text-xl font-bold font-mono">{lastKey.which}</p>
          </div>
          <div className="p-3 bg-accent/20 rounded-lg col-span-2">
            <span className="text-xs text-muted-foreground">Modifiers</span>
            <p className="font-mono text-sm">
              {[
                lastKey.ctrlKey && 'Ctrl',
                lastKey.altKey && 'Alt',
                lastKey.shiftKey && 'Shift',
                lastKey.metaKey && 'Meta/Cmd',
              ].filter(Boolean).join(' + ') || 'None'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
