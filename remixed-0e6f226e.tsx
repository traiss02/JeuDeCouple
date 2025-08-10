import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Shuffle, Home } from 'lucide-react';

const CoupleGameApp = () => {
  const [mode, setMode] = useState('home'); // 'home', 'category', 'game'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 ou 2
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' });

  // Catégories de cartes prédéfinies
  const categories = {
    discovery: {
      title: "Découverte 💫",
      subtitle: "Apprenez à vous connaître en profondeur",
      cards: [
        { question: "Quel est ton rêve le plus fou ?", type: "question" },
        { question: "Quelle est ta plus belle mémoire d'enfance ?", type: "question" },
        { question: "Si tu pouvais avoir un super-pouvoir, lequel choisirais-tu ?", type: "question" },
        { question: "Quel pays aimerais-tu visiter ensemble ?", type: "question" },
        { question: "Quelle est ta plus grande peur secrète ?", type: "question" },
        { question: "Décris ton dimanche parfait", type: "question" },
        { question: "Quel est ton livre ou film préféré et pourquoi ?", type: "question" },
        { question: "Quelle est la chose la plus spontanée que tu aies faite ?", type: "question" },
        { question: "Quels sont tes 3 défauts que tu assumes complètement ?", type: "question" },
        { question: "Si tu pouvais dîner avec une personnalité, qui choisirais-tu ?", type: "question" }
      ]
    },
    romantic: {
      title: "Romantique 💕",
      subtitle: "Créez des moments tendres et complices",
      cards: [
        { question: "Partagez 3 choses que vous admirez chez votre partenaire", type: "activity" },
        { question: "Planifiez ensemble votre rendez-vous idéal", type: "activity" },
        { question: "Quelle est la chose la plus romantique qu'on t'ait faite ?", type: "question" },
        { question: "Créez ensemble une liste de 5 endroits à visiter en amoureux", type: "activity" },
        { question: "Quel est ton langage d'amour principal ?", type: "question" },
        { question: "Décris le moment où tu as su que tu étais amoureux/se", type: "question" },
        { question: "Inventez un surnom mignon l'un pour l'autre", type: "activity" },
        { question: "Quelle chanson vous fait penser à votre relation ?", type: "question" },
        { question: "Massage des mains pendant 2 minutes", type: "activity" },
        { question: "Regardez-vous dans les yeux pendant 30 secondes sans parler", type: "activity" }
      ]
    },
    fun: {
      title: "Amusant 🎉",
      subtitle: "Riez et jouez ensemble",
      cards: [
        { question: "Imitez votre célébrité préférée", type: "activity" },
        { question: "Inventez une histoire drôle ensemble, chacun une phrase à tour de rôle", type: "activity" },
        { question: "Quel est ton talent caché le plus bizarre ?", type: "question" },
        { question: "Dansez sur votre chanson préférée", type: "activity" },
        { question: "Si tu étais un animal, lequel serais-tu ?", type: "question" },
        { question: "Faites un concours de grimaces pendant 1 minute", type: "activity" },
        { question: "Quelle est la chose la plus embarrassante qui te soit arrivée ?", type: "question" },
        { question: "Créez ensemble un shake/cocktail sans alcool original", type: "activity" },
        { question: "Si tu pouvais échanger de place avec quelqu'un pendant 24h, qui choisirais-tu ?", type: "question" },
        { question: "Chantez ensemble votre chanson d'enfance préférée", type: "activity" }
      ]
    },
    intimate: {
      title: "Intime 🌙",
      subtitle: "Partagez vos secrets et rêves profonds",
      cards: [
        { question: "Quel est ton plus grand rêve pour les 5 prochaines années ?", type: "question" },
        { question: "Quelle leçon de vie importante aimerais-tu partager ?", type: "question" },
        { question: "Parlez de votre relation avec votre famille", type: "question" },
        { question: "Quel est votre plus beau souvenir ensemble ?", type: "question" },
        { question: "Comment voyez-vous votre avenir ensemble ?", type: "question" },
        { question: "Quelle est la chose qui vous rend le plus heureux/se dans la vie ?", type: "question" },
        { question: "Partagez un secret que peu de gens connaissent", type: "question" },
        { question: "Qu'est-ce qui vous fait vous sentir le plus aimé/e ?", type: "question" },
        { question: "Décrivez votre idéal de bonheur", type: "question" },
        { question: "Chuchotez à l'oreille de l'autre pourquoi vous l'appréciez", type: "activity" }
      ]
    }
  };

  const startGame = (categoryKey) => {
    const category = categories[categoryKey];
    const shuffledCards = [...category.cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setSelectedCategory(categoryKey);
    setCurrentIndex(0);
    setCurrentPlayer(Math.random() > 0.5 ? 1 : 2);
    setMode('game');
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    } else {
      // Fin du jeu
      setMode('category');
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleKeyPress = (e) => {
    if (mode === 'game') {
      if (e.key === 'ArrowLeft') previousCard();
      if (e.key === 'ArrowRight') nextCard();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, currentIndex, cards.length]);

  // Écran d'accueil
  if (mode === 'home') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
        <div className="text-center text-white max-w-md px-8">
          <Heart size={80} className="mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold mb-4">Jeu de Couple</h1>
          <p className="text-xl mb-8 opacity-90">Découvrez-vous lors de votre rendez-vous ou soirée pyjama</p>
          
          <div className="space-y-4 mb-8">
            <input
              type="text"
              placeholder="Prénom joueur 1"
              value={playerNames.player1}
              onChange={(e) => setPlayerNames({...playerNames, player1: e.target.value})}
              className="w-full p-3 rounded-full text-gray-800 text-center font-medium"
            />
            <input
              type="text"
              placeholder="Prénom joueur 2"
              value={playerNames.player2}
              onChange={(e) => setPlayerNames({...playerNames, player2: e.target.value})}
              className="w-full p-3 rounded-full text-gray-800 text-center font-medium"
            />
          </div>
          
          <button
            onClick={() => setMode('category')}
            disabled={!playerNames.player1.trim() || !playerNames.player2.trim()}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Commencer à jouer
          </button>
        </div>
      </div>
    );
  }

  // Sélection de catégorie
  if (mode === 'category') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 py-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Choisissez votre ambiance</h2>
            <p className="text-lg opacity-90">
              {playerNames.player1} & {playerNames.player2}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(categories).map(([key, category]) => (
              <div
                key={key}
                onClick={() => startGame(key)}
                className="bg-white rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.subtitle}</p>
                <div className="text-purple-600 font-semibold">{category.cards.length} cartes</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={() => setMode('home')}
              className="text-white/80 hover:text-white transition-colors underline"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Jeu
  if (mode === 'game') {
    const currentCard = cards[currentIndex];
    const currentPlayerName = currentPlayer === 1 ? playerNames.player1 : playerNames.player2;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="w-full max-w-2xl px-8">
          {/* En-tête */}
          <div className="text-center text-white mb-6">
            <div className="flex items-center justify-center mb-2">
              <Heart size={24} className="mr-2" />
              <h3 className="text-xl font-semibold">{categories[selectedCategory].title}</h3>
            </div>
            <p className="text-lg">
              C'est au tour de <span className="font-bold text-yellow-300">{currentPlayerName}</span>
            </p>
          </div>

          {/* Carte */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                currentCard?.type === 'question' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {currentCard?.type === 'question' ? '❓ Question' : '🎯 Activité'}
              </div>
              <p className="text-2xl text-gray-800 leading-relaxed">
                {currentCard?.question}
              </p>
            </div>
          </div>

          {/* Contrôles */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousCard}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full transition-all ${
                currentIndex === 0 
                  ? 'bg-white/20 text-white/50 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="text-center text-white">
              <div className="text-lg font-medium mb-1">
                {currentIndex + 1} / {cards.length}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={shuffleCards}
                  className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-all"
                  title="Mélanger les cartes"
                >
                  <Shuffle size={16} />
                </button>
                <button
                  onClick={() => setMode('category')}
                  className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-all"
                  title="Changer de catégorie"
                >
                  <Home size={16} />
                </button>
              </div>
            </div>
            
            <button
              onClick={nextCard}
              className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Instructions */}
          <div className="text-center text-white/80">
            <p className="text-sm">
              Utilisez les flèches ←→ ou cliquez sur les boutons pour naviguer
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default CoupleGameApp;