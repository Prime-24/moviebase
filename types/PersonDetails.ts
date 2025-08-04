import { BaseMedia } from "./SearchResult";

export type PersonDetails = BaseMedia & {
  media_type: "person";
  id: number;
  name: string;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number; // 1 = female, 2 = male, 0/3 = other/unspecified
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  imdb_id: string | null;
  known_for_department: string;
  adult: boolean;
  homepage: string | null;
};
