export type ListType = "None" | "Watched" | "Treated" | "Priority"

export type FootballPosition =
  | "QB"
  | "HB"
  | "FB"
  | "WR"
  | "TE"
  | "LT"
  | "RT"
  | "LG"
  | "RG"
  | "C"
  | "DT"
  | "NT"
  | "DE"
  | "MLB"
  | "OLB"
  | "SLB"
  | "WLB"
  | "CB"
  | "FS"
  | "SS"
  | "K"
  | "P"
  | "LS"
  | "H"
  | "KR"
  | "PR"
  | "Gunner"
  | "Special Teams"

export type BasketballPosition =
  | "PG"
  | "SG"
  | "SF"
  | "PF"
  | "C"
  | "Combo Guard"
  | "Stretch Four"
  | "Swingman"
  | "Small-Ball Center"
  | "Lockdown Defender"
  | "Rim Protector"
  | "Perimeter Defender"
  | "Point Forward"
  | "Three-and-D"
  | "Facilitator"
  | "Stretch Big"

export type BaseballPosition =
  | "P"
  | "C"
  | "1B"
  | "2B"
  | "3B"
  | "SS"
  | "LF"
  | "CF"
  | "RF"
  | "DH"
  | "Pinch Hitter"
  | "Pinch Runner"
  | "SP"
  | "RP"
  | "Closer"
  | "Setup"
  | "Middle Reliever"
  | "Long Reliever"

export type HockeyPosition = "C" | "LW" | "RW" | "LD" | "RD" | "G" | "Power Play Specialist" | "Penalty Killer"

export type SportPosition = FootballPosition | BasketballPosition | BaseballPosition | HockeyPosition

export interface Injury {
  date: string
  type: string
  duration: string
  notes: string
}

export interface LeagueHistory {
  league: string
  startDate: string
  endDate: string
  injuries: Injury[]
}

export interface Player {
  name: string
  irp: number // Percentage (0-100)
  status: string
  erd: string
  injuryType: string
  comments: string
  notes: string
  listType: ListType
  position: SportPosition
  height: string
  weight: string
  experience: number
  salary: number
  agent: string
  agentEmail: string
  imageUrl: string
  isWatchlisted: boolean
  isTreated: boolean
  injuryLog: Injury[]
  contractLength: number
  contractTotal: number
  contractYear: number
  leagueHistory?: LeagueHistory[]
  dateInjured: string
  injuryGrade: "Minor" | "Moderate" | "Severe" | "N/A"
  weekInjured: string
}

export interface RetiredPlayer {
  name: string
  team: string
  yearsPlayed: string
  position: SportPosition
  keyStats: {
    [key: string]: string | number
  }
}

export interface DraftedPlayer {
  name: string
  college: string
  position: SportPosition
  draftStatus: "Drafted" | "Prospect"
  draftYear?: number
  draftRound?: number
  draftPick?: number
  projectedRound?: string
  keyStats: {
    [key: string]: string | number
  }
}

