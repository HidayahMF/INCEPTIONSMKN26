export type LostFoundType = "FOUND" | "LOST";
export type LostFoundStatus = "PENDING" | "VERIFIED" | "CLAIMED";

export type LostFoundItem = {
  id: string;
  name: string;
  category: string;
  type: LostFoundType;
  description: string;
  location: string;
  reportedAt: string;
  status: LostFoundStatus;
  image: string;
  isMine: boolean;
  incidentDate?: string;
  incidentTime?: string;
  additionalInfo?: string;
  gallery?: string[];
  history?: LostFoundHistoryEvent[];
};

export type LostFoundHistoryEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  kind: "created" | "verified";
};

export type LostFoundTab = "all" | "lost" | "found" | "mine";
