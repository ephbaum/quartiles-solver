export interface ResultsContainerProps {
  results: WordResult[];
  error: string;
  showResults: boolean;
}

export interface WordPart {
  part: string;
  order: number;
}

export interface WordResult {
  word: string;
  parts: WordPart[];
}
