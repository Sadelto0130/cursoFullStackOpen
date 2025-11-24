export interface DiaryEntry {
  id: string
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment: string
}

export type Weather = 'sunny' | 'rainy' | 'stormy' | 'cloudy' | 'windy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;