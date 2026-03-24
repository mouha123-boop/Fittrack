import React, { useState } from 'react';
import { CheckCircle, Circle, Play, ChevronDown, ChevronUp, Clock, Zap, Target } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { mockPrograms } from '../../utils/mockData';
import { Exercise } from '../../types';

const DashboardProgram: React.FC = () => {
  const program = mockPrograms[0];
  const [exercises, setExercises] = useState<Exercise[]>(
    program.exercises.map(e => ({ ...e, completed: false }))
  );
  const [expanded, setExpanded] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const toggle = (id: string) => {
    setExercises(prev => prev.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const progress = Math.round((completedCount / exercises.length) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header card */}
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 to-dark-950/30" />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="orange" size="md">{program.category}</Badge>
              <h2 className="font-display text-3xl mt-2">{program.name}</h2>
            </div>
            {!started && (
              <Button onClick={() => setStarted(true)}>
                <Play size={14} className="fill-white" /> Démarrer la séance
              </Button>
            )}
          </div>
          <div className="flex items-center gap-6 text-sm text-dark-300">
            <span className="flex items-center gap-1"><Clock size={14} /> ~75 min</span>
            <span className="flex items-center gap-1"><Zap size={14} /> ~480 kcal</span>
            <span className="flex items-center gap-1"><Target size={14} /> {program.level}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      {started && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-dark-300">Progression de la séance</span>
            <span className="text-sm font-semibold text-primary-400">{completedCount}/{exercises.length} exercices</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <CheckCircle size={24} className="text-emerald-400 mx-auto mb-2" />
              <p className="text-emerald-400 font-semibold">Séance terminée ! Excellent travail 💪</p>
            </div>
          )}
        </div>
      )}

      {/* Exercises list */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4">Exercices du jour</h3>
        <div className="flex flex-col gap-3">
          {exercises.map((ex, i) => (
            <div
              key={ex.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                ex.completed
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-dark-800/40 border-dark-600 hover:border-dark-500'
              }`}
            >
              <div className="flex items-center gap-4 p-4">
                {started ? (
                  <button onClick={() => toggle(ex.id)} className="shrink-0">
                    {ex.completed
                      ? <CheckCircle size={22} className="text-emerald-400" />
                      : <Circle size={22} className="text-dark-500 hover:text-primary-400 transition-colors" />
                    }
                  </button>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-dark-400 text-sm shrink-0">
                    {i + 1}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${ex.completed ? 'line-through text-dark-400' : 'text-white'}`}>
                    {ex.name}
                  </p>
                  <p className="text-xs text-dark-500 mt-0.5">{ex.muscle}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-dark-300">
                  <span><span className="text-white font-semibold">{ex.sets}</span> séries</span>
                  <span><span className="text-white font-semibold">{ex.reps}</span> rép.</span>
                  <span className="hidden sm:block"><span className="text-white font-semibold">{ex.rest}</span> repos</span>
                </div>

                <button
                  onClick={() => setExpanded(expanded === ex.id ? null : ex.id)}
                  className="text-dark-500 hover:text-dark-300 transition-colors ml-2"
                >
                  {expanded === ex.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {expanded === ex.id && (
                <div className="px-4 pb-4 pt-0 border-t border-dark-700">
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {[
                      { label: 'Séries', value: ex.sets },
                      { label: 'Répétitions', value: ex.reps },
                      { label: 'Repos', value: ex.rest },
                    ].map(d => (
                      <div key={d.label} className="bg-dark-700 rounded-xl p-3 text-center">
                        <p className="text-white font-semibold">{d.value}</p>
                        <p className="text-dark-400 text-xs mt-0.5">{d.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-dark-400 text-xs mt-3">
                    Groupe musculaire cible : <span className="text-primary-400">{ex.muscle}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All programs */}
      <div>
        <h3 className="font-semibold text-white mb-4">Autres programmes disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPrograms.slice(1).map(p => (
            <div key={p.id} className="stat-card cursor-pointer group">
              <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <Badge variant="gray">{p.level}</Badge>
                </div>
              </div>
              <p className="font-semibold text-white text-sm">{p.name}</p>
              <p className="text-dark-400 text-xs mt-1">{p.duration} · {p.sessionsPerWeek}x / semaine</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardProgram;
