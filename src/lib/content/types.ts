// Tipos del contenido del juego
export type AnswerValue = number | "No" | "Inf" | "-Inf";

export type Exercise = {
  // Texto/Enunciado en markdown ligero.
  prompt: string;
  // Respuesta: número o sentinela textual.
  // - "No" cuando el límite no existe (laterales distintos, ambos finitos)
  // - "Inf" cuando el límite tiende a +infinito
  // - "-Inf" cuando el límite tiende a -infinito
  answer: AnswerValue;
  hint?: string;
  // Explicación paso a paso.
  solution: string;
};

export type Lesson = { body: string };

export type Level = {
  id: string;
  title: string;
  concept: string;
  lesson: Lesson;
  exercises: Exercise[];
};

export type BossDialogLine = { text: string };

export type Boss = {
  id: string;
  name: string;
  era: string;
  intro: string[];
  taunts: string[];
  victory: string;
  defeat: string;
  exercises: Exercise[];
  accent: string;
};

export type World = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  available: boolean;
  levels: Level[];
  boss: Boss | null;
};
