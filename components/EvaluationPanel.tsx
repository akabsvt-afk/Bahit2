
import React from 'react';

const EvaluationPanel: React.FC = () => {
  const criteria = [
    {
      title: "Pertinence Épistémologique",
      desc: "Problématisation solide, fondements de la nature des savoirs.",
      icon: "fa-brain"
    },
    {
      title: "Cadre Théorique & Didactique",
      desc: "Maîtrise des concepts, articulation cohérente des théories.",
      icon: "fa-book"
    },
    {
      title: "Méthodologie",
      desc: "Cohérence épistémologique, rigueur de la collecte.",
      icon: "fa-microscope"
    },
    {
      title: "Analyse & Interprétation",
      desc: "Lecture didactique, capacité de dépassement descriptif.",
      icon: "fa-chart-pie"
    },
    {
      title: "Discussion Scientifique",
      desc: "Dialogue avec la littérature, limites et apports.",
      icon: "fa-comments"
    },
    {
      title: "Qualité Rédactionnelle",
      desc: "Précision structurelle, langage scientifique maîtrisé.",
      icon: "fa-pen-fancy"
    },
    {
      title: "Contribution au Champ",
      desc: "Apport réel aux SVT, potentiel de publication.",
      icon: "fa-award"
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-sm font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
        <i className="fas fa-clipboard-list text-indigo-600"></i>
        Grille d'Évaluation Doctorale
      </h2>
      
      <p className="text-[11px] text-slate-500 mb-6 italic leading-snug">
        Cette grille sert de base à l'expertise de Bahit 2 AI pour évaluer tout travail soumis.
      </p>

      <div className="space-y-4">
        {criteria.map((c, i) => (
          <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <i className={`fas ${c.icon} text-xs text-indigo-500`}></i>
              <h3 className="text-[11px] font-bold text-slate-700">{c.title}</h3>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
        <h4 className="text-[10px] font-bold text-indigo-700 uppercase mb-2">Conseil du Directeur</h4>
        <p className="text-[11px] text-indigo-900 leading-relaxed italic">
          "Ne confondez pas la description d'une séance avec l'analyse d'un milieu didactique. Le chercheur doit identifier les tensions entre les conceptions et le savoir savant."
        </p>
      </div>
    </div>
  );
};

export default EvaluationPanel;
