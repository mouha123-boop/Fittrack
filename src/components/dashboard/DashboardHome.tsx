import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame, Clock, Dumbbell, Calendar, CheckCircle,
  Circle, ChevronRight, Play, Star
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import StatCard from './StatCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockSessions, mockProgressData, mockPrograms } from '../../utils/mockData';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const currentProgram = mockPrograms[0];
  const recentSessions = mockSessions.slice(0, 5);
  const todaySession = mockSessions.find(s => !s.completed);
  const completedCount = mockSessions.filter(s => s.completed).length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-dark-400 text-sm">{greeting()},</p>
          <h2 className="font-display text-3xl md:text-4xl">
            {user?.name?.split(' ')[0].toUpperCase()} 👊
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="green" size="md">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse" />
            Semaine 7 / 12
          </Badge>
          {todaySession && (
            <Button onClick={() => navigate('/dashboard/programme')}>
              <Play size={14} className="fill-white" /> Séance du jour
            </Button>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Calories brûlées" value="2 965" unit="kcal" icon={<Flame size={18} />} trend={12} trendLabel="cette semaine" color="orange" />
        <StatCard title="Temps total" value="4h 35" unit="" icon={<Clock size={18} />} trend={8} trendLabel="vs semaine dernière" color="blue" />
        <StatCard title="Séances réalisées" value={completedCount} unit="" icon={<Dumbbell size={18} />} trend={5} trendLabel="ce mois-ci" color="green" />
        <StatCard title="Jours consécutifs" value="14" unit="jours" icon={<Calendar size={18} />} trend={0} trendLabel="Record : 21 jours" color="purple" />
      </div>

      {/* Chart + Today's session */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Calories brûlées par semaine</h3>
            <Badge variant="orange">8 semaines</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockProgressData}>
              <defs>
                <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#f97316' }}
              />
              <Area type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={2} fill="url(#calGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Today */}
        <div className="card">
          <h3 className="font-semibold text-white mb-4">Séance du jour</h3>
          {todaySession ? (
            <div>
              <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 mb-4">
                <p className="text-primary-400 font-semibold text-sm mb-1">{currentProgram.name}</p>
                <p className="text-dark-400 text-xs">{currentProgram.exercises.length} exercices · ~75 min</p>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {currentProgram.exercises.slice(0, 3).map((ex, i) => (
                  <div key={ex.id} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center text-xs text-dark-400 shrink-0">{i + 1}</div>
                    <span className="text-dark-200 flex-1">{ex.name}</span>
                    <span className="text-dark-500 text-xs">{ex.sets}×{ex.reps}</span>
                  </div>
                ))}
                {currentProgram.exercises.length > 3 && (
                  <p className="text-dark-500 text-xs pl-9">+{currentProgram.exercises.length - 3} exercices</p>
                )}
              </div>
              <Button fullWidth onClick={() => navigate('/dashboard/programme')}>
                <Play size={14} className="fill-white" /> Démarrer
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-dark-500">
              <CheckCircle size={32} className="text-emerald-500 mb-2" />
              <p className="text-sm text-dark-300">Toutes les séances sont terminées !</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent sessions + Program overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white">Séances récentes</h3>
            <button onClick={() => navigate('/dashboard/progression')} className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1 transition-colors">
              Voir tout <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {recentSessions.map(session => (
              <div key={session.id} className="flex items-center gap-3 py-2 border-b border-dark-700 last:border-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${session.completed ? 'bg-emerald-500/10' : 'bg-dark-700'}`}>
                  {session.completed
                    ? <CheckCircle size={16} className="text-emerald-400" />
                    : <Circle size={16} className="text-dark-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">{session.programName}</p>
                  <p className="text-xs text-dark-400">{new Date(session.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
                </div>
                {session.completed && (
                  <div className="text-right">
                    <p className="text-xs text-dark-300">{session.calories} kcal</p>
                    <p className="text-xs text-dark-500">{session.duration} min</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Coach card */}
        <div className="card">
          <h3 className="font-semibold text-white mb-5">Mon coach</h3>
          <div className="flex items-center gap-4 mb-5">
            <img
              src={currentProgram.coach.image}
              alt={currentProgram.coach.name}
              className="w-16 h-16 object-cover rounded-2xl border border-dark-600"
            />
            <div>
              <h4 className="font-semibold text-white">{currentProgram.coach.name}</h4>
              <p className="text-primary-400 text-sm">{currentProgram.coach.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} className="text-primary-400 fill-primary-400" />
                <span className="text-dark-300 text-xs">{currentProgram.coach.rating} · {currentProgram.coach.clients} clients</span>
              </div>
            </div>
          </div>
          <p className="text-dark-400 text-sm leading-relaxed mb-4">{currentProgram.coach.bio}</p>
          <div className="flex flex-wrap gap-2">
            {currentProgram.coach.certifications.map(c => (
              <Badge key={c} variant="gray">{c}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
