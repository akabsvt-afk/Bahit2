
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <nav className="w-72 bg-slate-900 text-slate-300 flex flex-col hidden lg:flex">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            B2
          </div>
          <div>
            <div className="text-white font-bold leading-none">Bahit 2 AI</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">Plateforme Doctorale</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase">Expertises</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <i className="fas fa-dna text-indigo-500 w-4"></i>
              Didactique de la Biologie
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <i className="fas fa-mountain text-emerald-500 w-4"></i>
              Épistémologie de la Géologie
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <i className="fas fa-book-reader text-amber-500 w-4"></i>
              Sciences de l'Éducation
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase px-2 mb-3">Concepts Didactiques Clés</div>
          <div className="flex flex-wrap gap-2 px-2">
            {[
              "Obstacle Épistémologique", "Transposition", "Contrat Didactique", 
              "Situation-Problème", "NoS (Nature of Science)", "Ingénierie Didactique",
              "Milieu Didactique", "Modélisation"
            ].map(concept => (
              <span key={concept} className="text-[10px] px-2 py-1 bg-slate-800 rounded border border-slate-700 hover:border-indigo-500 transition-colors cursor-help">
                {concept}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-500 uppercase px-2 mb-3">Missions du Directeur</div>
          <ul className="space-y-1 text-xs px-2">
            <li className="py-2 border-b border-slate-800 flex justify-between items-center">
              <span>Validation de Problématique</span>
              <i className="fas fa-check-circle text-indigo-400"></i>
            </li>
            <li className="py-2 border-b border-slate-800 flex justify-between items-center">
              <span>Alignement Méthodologique</span>
              <i className="fas fa-check-circle text-indigo-400"></i>
            </li>
            <li className="py-2 border-b border-slate-800 flex justify-between items-center">
              <span>Reformulation Académique</span>
              <i className="fas fa-check-circle text-indigo-400"></i>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="text-xs text-slate-500 mb-2">Statut du Système</div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>IA Opérationnelle (V2.1.0)</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
