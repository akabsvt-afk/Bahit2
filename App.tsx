
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message, Role } from './types';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import EvaluationPanel from './components/EvaluationPanel';

const SYSTEM_INSTRUCTION = `
Tu es Bahit 2 AI – Directeur de Thèse IA.
Tu es une IA académique de très haut niveau, spécialisée en SVT, Sciences de l’éducation et Didactique des sciences.
Posture : Directeur de thèse (HDR), Chercheur senior, Épistémologue, Évaluateur scientifique.

Expertise requise :
- SVT (Biologie, Géologie)
- Didactique (Obstacles, Transposition, Milieu, Contrat, NoS)
- Épistémologie (Bachelard, Popper, Kuhn, statut du modèle)
- Sciences de l'éducation (Constructivisme, Méthodologies mixtes)

Instructions d'interaction :
1. Sois exigeant, argumenté et formatif. Jamais complaisant.
2. Utilise le vocabulaire technique précis.
3. Pour chaque réponse longue, structure-la avec des sections académiques claires.
4. Si l'utilisateur soumet un texte de recherche, analyse-le selon la grille d'évaluation (Pertinence, Cadre, Méthodologie, Analyse, Discussion, Rédaction).
5. Réponds en français de niveau soutenu.
`;

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.MODEL,
      text: "Bonjour. Je suis Bahit 2 AI, votre Directeur de Thèse numérique. Ma mission est de porter votre recherche en SVT et Didactique des sciences vers l'excellence académique internationale. Sur quel aspect de votre travail (problématique, méthodologie, cadre théorique) souhaiteriez-vous mon expertise critique aujourd'hui ?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { role: Role.USER, text: inputValue };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // We use gemini-3-pro-preview for complex reasoning as requested by system instructions
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: updatedMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Erreur lors de la génération de la réponse.";
      setMessages(prev => [...prev, { role: Role.MODEL, text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: Role.MODEL, text: "Une erreur critique est survenue dans la communication avec le moteur d'IA." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 bg-white shadow-xl relative">
        <header className="px-6 py-4 border-b bg-white flex justify-between items-center z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-microscope text-indigo-600"></i>
              Bahit 2 AI
              <span className="text-xs font-normal px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">Directeur de Thèse</span>
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Didactique des Sciences & SVT</p>
          </div>
          
          <button 
            onClick={() => setShowEvaluation(!showEvaluation)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
              showEvaluation ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <i className="fas fa-clipboard-check"></i>
            {showEvaluation ? 'Fermer la Grille' : 'Voir Grille d\'Évaluation'}
          </button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col relative">
            <ChatWindow messages={messages} isLoading={isLoading} />
            
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="max-w-4xl mx-auto flex gap-4">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Posez une question théorique ou soumettez un extrait de votre recherche..."
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24 text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-indigo-600 text-white rounded-xl px-6 py-3 self-end hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Expertise académique certifiée. Rigueur épistémologique garantie par le protocole Bahit 2.
              </p>
            </div>
          </div>

          {showEvaluation && (
            <div className="w-80 border-l border-slate-200 bg-slate-50 overflow-y-auto animate-in slide-in-from-right duration-300">
              <EvaluationPanel />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
