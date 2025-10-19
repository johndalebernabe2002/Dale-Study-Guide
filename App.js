import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
}

export default function App(){
  const [tasks, setTasks] = useLocalStorage('dales_tasks', []);
  const [notes, setNotes] = useLocalStorage('dales_notes', '');
  const [taskText, setTaskText] = useState('');
  const [schedule, setSchedule] = useLocalStorage('dales_schedule', [
    {time: '06:00', label: 'Morning Review'},
    {time: '12:00', label: 'Quiz Practice'},
    {time: '18:00', label: 'Mock Exam'}
  ]);

  const addTask = () => {
    if(!taskText.trim()) return;
    setTasks([...tasks, {id: Date.now(), text: taskText.trim(), done:false}]);
    setTaskText('');
  };
  const toggle = (id) => setTasks(tasks.map(t=> t.id===id? {...t, done:!t.done} : t));
  const removeTask = (id) => setTasks(tasks.filter(t=> t.id!==id));

  const completed = tasks.filter(t=> t.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const data = {
    labels: ['Completed','Remaining'],
    datasets: [{ label: 'Tasks', data: [completed, Math.max(0, tasks.length - completed)], }]
  };

  return (
    <div className="container">
      <div className="card header">
        <div>
          <h1 className="title">Dale's Study Space</h1>
          <p className="subtitle">Ace the PNLE with Confidence — Your Pathway to Success</p>
        </div>
        <div style={{textAlign:'right'}}>
          <small style={{color:'#065f46'}}>Mobile / Tablet Ready</small>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2 style={{marginTop:0}}>Study Planner</h2>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            <input value={taskText} onChange={e=>setTaskText(e.target.value)} placeholder="New task (e.g., Pharmacology review)" style={{flex:1,padding:8,borderRadius:8,border:'1px solid #e6f3ec'}} />
            <button className="btn" onClick={addTask}>Add</button>
          </div>

          <ul className="tasks-list">
            {tasks.length===0 && <li style={{color:'#666'}}>No tasks yet. Add your first task!</li>}
            {tasks.map(t=> (
              <li key={t.id} className="task">
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id)} />
                  <div style={{minWidth:0}}>
                    <div style={{fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.text}</div>
                  </div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn-muted" onClick={()=>removeTask(t.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{marginTop:12}}>
            <label style={{display:'block',marginBottom:6,fontWeight:600}}>Personal Notes</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4} style={{width:'100%',padding:8,borderRadius:8,border:'1px solid #e6f3ec'}} />
          </div>
        </div>

        <aside className="card">
          <h3 style={{marginTop:0}}>Today / Schedule</h3>
          <ul style={{padding:0,listStyle:'none',marginTop:8,marginBottom:12}}>
            {schedule.map((s,idx)=> <li key={idx} style={{padding:'8px 0',borderBottom: '1px solid #f1f6f4'}}><strong>{s.time}</strong> — {s.label}</li>)}
          </ul>

          <h3>Progress</h3>
          <div style={{width:'100%',height:200}}>
            <Bar data={data} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}} />
          </div>
          <p style={{marginTop:8}}><strong>{progress}%</strong> completed</p>
        </aside>
      </div>

      <footer style={{textAlign:'center',marginTop:18,color:'#065f46'}}>© 2025 Dale's Study Space — Made with 💚</footer>
    </div>
  );
}
