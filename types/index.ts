export interface Card {
  question: string;
  type: 'question' | 'activity';
}

export interface Category {
  title: string;
  subtitle: string;
  cards: Card[];
}

export interface Categories {
  [key: string]: Category;
}

export interface PlayerNames {
  player1: string;
  player2: string;
}

export type GameMode = 'home' | 'category' | 'game';
export type PlayerNumber = 1 | 2;