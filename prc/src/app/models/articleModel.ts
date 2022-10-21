export interface Article {
  _id?: string;
  created?: string;
  titleFrench?: string;
  titleEnglish?: string;
  texteFrench?: string;
  texteEnglish?: string;
  videoUrl?: string;
  imageUrl?: string;
  state?: boolean;
  lastUpdate?: any[];
  authorId?: any;
  rubriqueId?: string;
}
