import { useState, useRef, useEffect } from 'react';
// SettingsContext unused

interface Command {
  input: string;
  output: React.ReactNode;
}

interface TerminalWindowProps {
  onRegisterOpen?: () => void;
}

export function TerminalWindow({ onRegisterOpen }: TerminalWindowProps) {
  // Removed crtEnabled
  const [history, setHistory] = useState<Command[]>([
    { 
      input: 'systemctl status smartsphere', 
      output: (
        <div className="text-primary-green">
          ● smartsphere.service - SmartSphere Core System<br/>
          &nbsp;&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/smartsphere.service; enabled)<br/>
          &nbsp;&nbsp;&nbsp;Active: active (running) since {new Date().toLocaleDateString()}<br/>
          &nbsp;&nbsp;&nbsp;Docs: man:smartsphere(8)<br/>
          &nbsp;&nbsp;&nbsp;Main PID: 1337 (node)<br/>
          &nbsp;&nbsp;&nbsp;Tasks: 42 (limit: 4915)<br/>
          &nbsp;&nbsp;&nbsp;Memory: 256.0M<br/>
          &nbsp;&nbsp;&nbsp;CGroup: /system.slice/smartsphere.service<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─1337 /usr/bin/node /opt/smartsphere/server.js
        </div>
      ) 
    },
    {
      input: 'motd',
      output: 'Welcome to SmartSphere OS v2.0.4\nType "help" for available commands.'
    }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <span className="font-bold text-primary-yellow">help</span><span>Show this message</span>
            <span className="font-bold text-primary-yellow">clear</span><span>Clear terminal</span>
            <span className="font-bold text-primary-yellow">whoami</span><span>Print current user</span>
            <span className="font-bold text-primary-yellow">date</span><span>Print system date</span>
            <span className="font-bold text-primary-yellow">sudo</span><span>Execute command as superuser</span>
            <span className="font-bold text-primary-yellow">register</span><span>Initiate club registration sequence</span>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
        output = 'guest_user';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'sudo':
      case 'sudo su':
        output = 'Nice try. This incident will be reported.';
        break;
      case 'register':
        output = (
          <div className="text-primary-cyan border-2 border-primary-cyan p-4 my-2">
            <h3 className="text-xl font-bold mb-2">INITIATING REGISTRATION SEQUENCE...</h3>
            <p className="mb-2">Connecting to secure server...</p>
            <p className="mb-4">Connection established. Handshake OK.</p>
            <button 
              onClick={() => onRegisterOpen && onRegisterOpen()}
              className="inline-block bg-primary-cyan text-black px-4 py-2 font-bold hover:bg-white transition-colors cursor-pointer"
            >
              CLICK HERE TO COMPLETE REGISTRATION
            </button>
          </div>
        );
        break;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${trimmedCmd}`;
    }

    setHistory(prev => [...prev, { input: cmd, output }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div 
      className="bg-black h-full p-4 font-mono text-sm overflow-y-auto custom-scrollbar flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="text-primary-yellow font-bold border-b-2 border-primary-yellow pb-2 mb-4">
        SMARTSPHERE TERMINAL - UNAUTHORIZED ACCESS PROHIBITED
      </div>
      
      {history.map((entry, i) => (
        <div key={i} className="mb-4">
          <div className="flex text-primary-green font-bold">
            <span className="mr-2">guest@smartsphere:~$</span>
            <span className="text-white">{entry.input}</span>
          </div>
          <div className="text-gray-300 mt-1 whitespace-pre-wrap leading-relaxed">
            {entry.output}
          </div>
        </div>
      ))}
      
      <form onSubmit={onSubmit} className="flex text-primary-green font-bold mt-2">
        <span className="mr-2">guest@smartsphere:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white flex-1 min-w-[50%]"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
