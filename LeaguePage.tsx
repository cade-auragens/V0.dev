"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PlayerInfo from "./PlayerInfo"
import AnalyticsPage from "./AnalyticsPage"
import RetiredPlayersTable from "./RetiredPlayersTable"
import DraftedPlayersTable from "./DraftedPlayersTable"
import WatchlistView from "./WatchlistView"
import TreatedView from "./TreatedView"
import PriorityView from "./PriorityView"
import Logo from "./Logo"
import TeamDropdown from "./TeamDropdown"
import { montserrat } from "../lib/fonts"
import { ArrowLeft, Download, ArrowUp, ArrowDown } from "lucide-react"
import { type Player, type RetiredPlayer, type DraftedPlayer, type ListType, SportPosition } from "../types/player"
import EventsView from "./EventsView"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface LeaguePageProps {
  leagueName: string
}

type SortKey =
  | "position"
  | "height"
  | "weight"
  | "experience"
  | "contractTotal"
  | "contractLength"
  | "contractYear"
  | "salary"
  | "agent"
  | "injuryGrade"
  | "weekInjured"
type ViewMode = "players" | "analytics" | "retired" | "watchlist" | "treated" | "priority" | "events"

export default function LeaguePage({ leagueName }: LeaguePageProps) {
  // State declarations
  const [selectedTeam, setSelectedTeam] = useState<string>("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("players")
  const [sortKey, setSortKey] = useState<SortKey>("position")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [listTypes, setListTypes] = useState<ListType[]>(["None", "Watched", "Treated", "Priority"])
  const [viewAllPlayers, setViewAllPlayers] = useState(true)
  const [selectAll, setSelectAll] = useState(false)

  // Player data
  const [players, setPlayers] = useState<Player[]>(() => {
    switch (leagueName.toUpperCase()) {
      case "NFL":
      case "FOOTBALL":
        return [
          {
            name: "Tom Brady",
            irp: Math.random() * 100,
            status: "Active",
            erd: "N/A",
            dateInjured: "N/A",
            injuryType: "N/A",
            injuryGrade: "N/A",
            comments: "Veteran quarterback",
            notes: "Looking strong in practice",
            listType: "Watched",
            position: "QB",
            height: "6'4\"",
            weight: "225 lbs",
            experience: 22,
            salary: 25000000,
            agent: "Don Yee",
            agentEmail: "don@yee.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: false,
            isTreated: false,
            isPriority: false,
            injuryLog: [],
            contractLength: 2,
            contractTotal: 50000000,
            contractYear: 1,
            weekInjured: "N/A",
            team: "Tampa Bay Buccaneers",
          },
          {
            name: "Aaron Donald",
            irp: Math.random() * 100,
            status: "Injured",
            erd: "2023-10-15",
            dateInjured: "2023-09-01",
            injuryType: "Knee",
            injuryGrade: "Moderate",
            comments: "Undergoing rehab",
            notes: "Progressing well",
            listType: "Treated",
            position: "DT",
            height: "6'1\"",
            weight: "280 lbs",
            experience: 9,
            salary: 22500000,
            agent: "Todd France",
            agentEmail: "todd@france.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: true,
            isTreated: true,
            isPriority: false,
            injuryLog: [{ date: "2023-09-01", type: "Knee Sprain", duration: "6 weeks", notes: "Grade 2 MCL sprain" }],
            contractLength: 3,
            contractTotal: 95000000,
            contractYear: 2,
            weekInjured: "Week 1",
            team: "Los Angeles Rams",
          },
        ]
      case "NBA":
      case "BASKETBALL":
        return [
          {
            name: "LeBron James",
            irp: Math.random() * 100,
            status: "Active",
            erd: "N/A",
            dateInjured: "N/A",
            injuryType: "N/A",
            injuryGrade: "N/A",
            comments: "Team leader",
            notes: "Maintaining high performance",
            listType: "Watched",
            position: "SF",
            height: "6'9\"",
            weight: "250 lbs",
            experience: 19,
            salary: 41180544,
            agent: "Rich Paul",
            agentEmail: "rich@klutchsports.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: false,
            isTreated: false,
            isPriority: false,
            injuryLog: [],
            contractLength: 2,
            contractTotal: 85655532,
            contractYear: 1,
            weekInjured: "N/A",
            team: "Los Angeles Lakers",
          },
          {
            name: "Stephen Curry",
            irp: Math.random() * 100,
            status: "Day-to-Day",
            erd: "2023-09-30",
            dateInjured: "2023-09-25",
            injuryType: "Ankle",
            injuryGrade: "Minor",
            comments: "Minor sprain",
            notes: "Expected to return soon",
            listType: "Treated",
            position: "PG",
            height: "6'3\"",
            weight: "185 lbs",
            experience: 13,
            salary: 48070014,
            agent: "Jeff Austin",
            agentEmail: "jeff@octagonbasketball.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: true,
            isTreated: true,
            isPriority: false,
            injuryLog: [{ date: "2023-09-25", type: "Ankle Sprain", duration: "5 days", notes: "Grade 1 sprain" }],
            contractLength: 4,
            contractTotal: 215353664,
            contractYear: 2,
            weekInjured: "Week 1",
            team: "Golden State Warriors",
          },
        ]
      case "MLB":
      case "BASEBALL":
        return [
          {
            name: "Mike Trout",
            irp: Math.random() * 100,
            status: "Active",
            erd: "N/A",
            dateInjured: "N/A",
            injuryType: "N/A",
            injuryGrade: "N/A",
            comments: "Superstar outfielder",
            notes: "Consistent performance",
            listType: "Watched",
            position: "CF",
            height: "6'2\"",
            weight: "235 lbs",
            experience: 11,
            salary: 37116666,
            agent: "Craig Landis",
            agentEmail: "craig@landissports.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: false,
            isTreated: false,
            isPriority: false,
            injuryLog: [],
            contractLength: 12,
            contractTotal: 426500000,
            contractYear: 4,
            leagueHistory: [
              {
                league: "Rookie League",
                startDate: "2009-06-01",
                endDate: "2009-09-30",
                injuries: [
                  {
                    date: "2009-07-15",
                    type: "Wrist Sprain",
                    duration: "2 weeks",
                    notes: "Minor sprain, fully recovered",
                  },
                ],
              },
              {
                league: "Single-A",
                startDate: "2010-04-01",
                endDate: "2010-07-15",
                injuries: [],
              },
              {
                league: "Double-A",
                startDate: "2010-07-16",
                endDate: "2011-07-07",
                injuries: [
                  {
                    date: "2011-04-12",
                    type: "Shoulder Tendinitis",
                    duration: "2 weeks",
                    notes: "Minor setback, fully recovered",
                  },
                ],
              },
              {
                league: "Triple-A",
                startDate: "2011-07-08",
                endDate: "2011-08-19",
                injuries: [
                  {
                    date: "2011-07-25",
                    type: "Finger Blister",
                    duration: "5 days",
                    notes: "Minor issue, quickly resolved",
                  },
                ],
              },
              {
                league: "MLB",
                startDate: "2011-08-19",
                endDate: "Present",
                injuries: [
                  { date: "2017-05-29", type: "Thumb Ligament Tear", duration: "6 weeks", notes: "Required surgery" },
                  {
                    date: "2019-09-07",
                    type: "Foot Surgery",
                    duration: "Rest of season",
                    notes: "Morton's neuroma removal",
                  },
                  { date: "2021-05-18", type: "Calf Strain", duration: "2 months", notes: "Grade 2 strain" },
                ],
              },
            ],
            weekInjured: "N/A",
            team: "Los Angeles Angels",
          },
          {
            name: "Jacob deGrom",
            irp: Math.random() * 100,
            status: "Injured",
            erd: "2024-07-01",
            dateInjured: "2023-04-28",
            injuryType: "Elbow",
            injuryGrade: "Severe",
            comments: "Tommy John surgery",
            notes: "Long-term recovery",
            listType: "Treated",
            position: "SP",
            height: "6'4\"",
            weight: "180 lbs",
            experience: 9,
            salary: 37000000,
            agent: "Jeff Berry",
            agentEmail: "jeff@caa.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: true,
            isTreated: true,
            isPriority: false,
            injuryLog: [
              { date: "2023-04-28", type: "UCL Tear", duration: "12-14 months", notes: "Tommy John surgery required" },
            ],
            contractLength: 5,
            contractTotal: 185000000,
            contractYear: 1,
            leagueHistory: [
              {
                league: "Rookie League",
                startDate: "2010-06-01",
                endDate: "2010-09-30",
                injuries: [
                  { date: "2010-08-10", type: "Elbow Soreness", duration: "10 days", notes: "Precautionary rest" },
                ],
              },
              {
                league: "Single-A",
                startDate: "2011-04-01",
                endDate: "2012-09-30",
                injuries: [
                  {
                    date: "2012-06-15",
                    type: "Lower Back Strain",
                    duration: "3 weeks",
                    notes: "Managed with physical therapy",
                  },
                ],
              },
              {
                league: "Double-A",
                startDate: "2013-04-01",
                endDate: "2013-07-15",
                injuries: [],
              },
              {
                league: "Triple-A",
                startDate: "2013-07-16",
                endDate: "2014-05-14",
                injuries: [
                  {
                    date: "2014-04-01",
                    type: "Shoulder Tightness",
                    duration: "10 days",
                    notes: "Resolved with rest and treatment",
                  },
                ],
              },
              {
                league: "MLB",
                startDate: "2014-05-15",
                endDate: "Present",
                injuries: [
                  {
                    date: "2016-09-01",
                    type: "Forearm Strain",
                    duration: "Rest of season",
                    notes: "Shut down as precaution",
                  },
                  {
                    date: "2018-05-02",
                    type: "Hyperextended Elbow",
                    duration: "3 weeks",
                    notes: "Suffered while batting",
                  },
                  {
                    date: "2021-07-07",
                    type: "Forearm Tightness",
                    duration: "Rest of season",
                    notes: "Multiple setbacks",
                  },
                  {
                    date: "2022-04-01",
                    type: "Stress Reaction in Scapula",
                    duration: "4 months",
                    notes: "Delayed start to season",
                  },
                  {
                    date: "2023-04-28",
                    type: "UCL Tear",
                    duration: "12-14 months",
                    notes: "Tommy John surgery required",
                  },
                ],
              },
            ],
            weekInjured: "Week 1",
            team: "New York Mets",
          },
        ]
      case "NHL":
      case "HOCKEY":
        return [
          {
            name: "Connor McDavid",
            irp: Math.random() * 100,
            status: "Active",
            erd: "N/A",
            dateInjured: "N/A",
            injuryType: "N/A",
            injuryGrade: "N/A",
            comments: "League's top scorer",
            notes: "Exceptional speed and skill",
            listType: "Watched",
            position: "C",
            height: "6'1\"",
            weight: "193 lbs",
            experience: 7,
            salary: 12500000,
            agent: "Jeff Jackson",
            agentEmail: "jeff@wassermanhockey.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: false,
            isTreated: false,
            isPriority: false,
            injuryLog: [],
            contractLength: 8,
            contractTotal: 100000000,
            contractYear: 6,
            weekInjured: "N/A",
            team: "Edmonton Oilers",
          },
          {
            name: "Victor Hedman",
            irp: Math.random() * 100,
            status: "Day-to-Day",
            erd: "2023-10-05",
            dateInjured: "2023-09-28",
            injuryType: "Lower Body",
            injuryGrade: "Minor",
            comments: "Minor strain",
            notes: "Precautionary measure",
            listType: "Treated",
            position: "LD",
            height: "6'6\"",
            weight: "241 lbs",
            experience: 13,
            salary: 7875000,
            agent: "Peter Wallen",
            agentEmail: "peter@hockeynord.com",
            imageUrl: "/placeholder.svg?height=100&width=100",
            isWatchlisted: true,
            isTreated: true,
            isPriority: false,
            injuryLog: [
              { date: "2023-09-28", type: "Lower Body Strain", duration: "1 week", notes: "Day-to-day evaluation" },
            ],
            contractLength: 8,
            contractTotal: 63000000,
            contractYear: 6,
            weekInjured: "Week 1",
            team: "Tampa Bay Lightning",
          },
        ]
      default:
        return []
    }
  })

  // Retired players data
  const [retiredPlayers, setRetiredPlayers] = useState<RetiredPlayer[]>(() => {
    const initialRetiredPlayers = (() => {
      switch (leagueName.toUpperCase()) {
        case "NFL":
          return [
            {
              name: "Peyton Manning",
              team: "Denver Broncos",
              yearsPlayed: "1998-2015",
              position: "QB",
              keyStats: {
                passingYards: 71940,
                touchdowns: 539,
                completions: 6125,
              },
            },
            {
              name: "Jerry Rice",
              team: "San Francisco 49ers",
              yearsPlayed: "1985-2004",
              position: "WR",
              keyStats: {
                receptions: 1549,
                receivingYards: 22895,
                touchdowns: 208,
              },
            },
          ]
        case "NBA":
          return [
            {
              name: "Michael Jordan",
              team: "Chicago Bulls",
              yearsPlayed: "1984-2003",
              position: "SG",
              keyStats: {
                points: 32292,
                rebounds: 6672,
                assists: 5633,
              },
            },
            {
              name: "Kobe Bryant",
              team: "Los Angeles Lakers",
              yearsPlayed: "1996-2016",
              position: "SG",
              keyStats: {
                points: 33643,
                rebounds: 7047,
                assists: 6306,
              },
            },
          ]
        case "MLB":
          return [
            {
              name: "Derek Jeter",
              team: "New York Yankees",
              yearsPlayed: "1995-2014",
              position: "SS",
              keyStats: {
                battingAverage: 0.31,
                hits: 3465,
                homeRuns: 260,
              },
            },
            {
              name: "Mariano Rivera",
              team: "New York Yankees",
              yearsPlayed: "1995-2013",
              position: "RP",
              keyStats: {
                saves: 652,
                era: 2.21,
                strikeouts: 1173,
              },
            },
          ]
        case "NHL":
          return [
            {
              name: "Wayne Gretzky",
              team: "Edmonton Oilers",
              yearsPlayed: "1979-1999",
              position: "C",
              keyStats: {
                goals: 894,
                assists: 1963,
                points: 2857,
              },
            },
            {
              name: "Gordie Howe",
              team: "Detroit Red Wings",
              yearsPlayed: "1946-1980",
              position: "RW",
              keyStats: {
                goals: 801,
                assists: 1049,
                points: 1850,
              },
            },
          ]
        default:
          return []
      }
    })()
    // Add listType, comments, notes, and injuryHistory to each player
    return initialRetiredPlayers.map((player) => ({
      ...player,
      listType: "None" as ListType,
      notes: "",
      injuryHistory: [],
      imageUrl: "/placeholder.svg",
    }))
  })

  // Drafted players data
  const [draftedPlayers] = useState<DraftedPlayer[]>(() => {
    switch (leagueName.toUpperCase()) {
      case "FOOTBALL":
        return [
          {
            name: "Trevor Lawrence",
            college: "Clemson",
            position: "QB",
            draftStatus: "Drafted",
            draftYear: 2021,
            draftRound: 1,
            draftPick: 1,
            keyStats: {
              passingYards: 10098,
              touchdowns: 90,
              completionPercentage: 66.6,
            },
          },
          {
            name: "Caleb Williams",
            college: "USC",
            position: "QB",
            draftStatus: "Prospect",
            projectedRound: "1st",
            keyStats: {
              passingYards: 4537,
              touchdowns: 42,
              completionPercentage: 66.6,
            },
          },
        ]
      case "BASKETBALL":
        return [
          {
            name: "Cade Cunningham",
            college: "Oklahoma State",
            position: "PG",
            draftStatus: "Drafted",
            draftYear: 2021,
            draftRound: 1,
            draftPick: 1,
            keyStats: {
              points: 20.1,
              rebounds: 6.2,
              assists: 6.0,
            },
          },
          {
            name: "Victor Wembanyama",
            college: "Metropolitans 92",
            position: "C",
            draftStatus: "Prospect",
            projectedRound: "1st",
            keyStats: {
              points: 21.6,
              rebounds: 10.4,
              blocks: 3.0,
            },
          },
        ]
      case "BASEBALL":
        return [
          {
            name: "Spencer Torkelson",
            college: "Arizona State",
            position: "1B",
            draftStatus: "Drafted",
            draftYear: 2020,
            draftRound: 1,
            draftPick: 1,
            keyStats: {
              battingAverage: 0.267,
              homeRuns: 30,
              rbi: 91,
            },
          },
          {
            name: "Dylan Crews",
            college: "LSU",
            position: "OF",
            draftStatus: "Prospect",
            projectedRound: "1st",
            keyStats: {
              battingAverage: 0.426,
              homeRuns: 18,
              rbi: 70,
            },
          },
        ]
      case "HOCKEY":
        return [
          {
            name: "Owen Power",
            college: "University of Michigan",
            position: "LD",
            draftStatus: "Drafted",
            draftYear: 2021,
            draftRound: 1,
            draftPick: 1,
            keyStats: {
              goals: 3,
              assists: 15,
              plusMinus: 5,
            },
          },
          {
            name: "Connor Bedard",
            college: "Regina Pats (WHL)",
            position: "C",
            draftStatus: "Prospect",
            projectedRound: "1st",
            keyStats: {
              goals: 71,
              assists: 72,
              points: 143,
            },
          },
        ]
      default:
        return []
    }
  })

  // Memoized values
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1
      switch (sortKey) {
        case "experience":
        case "contractTotal":
        case "contractLength":
        case "contractYear":
        case "salary":
          return (a[sortKey] - b[sortKey]) * direction
        case "height":
        case "weight":
          return (Number.parseFloat(a[sortKey]) - Number.parseFloat(b[sortKey])) * direction
        case "position":
        case "agent":
        case "injuryGrade":
        case "weekInjured":
          return a[sortKey].localeCompare(b[sortKey]) * direction
        default:
          return (a[sortKey] < b[sortKey] ? -1 : 1) * direction
      }
    })
  }, [players, sortKey, sortDirection])

  const watchlistedPlayers = useMemo(() => {
    return players.filter((player) => player.listType === "Watched")
  }, [players])

  const treatedPlayers = useMemo(() => {
    return players.filter((player) => player.listType === "Treated")
  }, [players])

  const priorityPlayers = useMemo(() => {
    return players.filter((player) => player.listType === "Priority")
  }, [players])

  // Event handlers
  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team)
    setViewAllPlayers(false)
    // Here you would typically fetch team-specific data
  }

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  const handleWatchlistChange = (playerIds: string[], isWatchlisted: boolean) => {
    setPlayers(players.map((player) => (playerIds.includes(player.name) ? { ...player, isWatchlisted } : player)))
  }

  const handleTreatedChange = (playerIds: string[], isTreated: boolean) => {
    setPlayers(players.map((player) => (playerIds.includes(player.name) ? { ...player, isTreated } : player)))
  }

  const handleListTypeChange = (playerName: string, newListType: ListType) => {
    setPlayers(
      players.map((player) => {
        if (player.name === playerName) {
          return {
            ...player,
            listType: newListType,
            isWatchlisted: newListType === "Watched",
            isTreated: newListType === "Treated",
            isPriority: newListType === "Priority",
          }
        }
        return player
      }),
    )
  }

  const handleCommentChange = (playerName: string, comment: string) => {
    setPlayers(players.map((player) => (player.name === playerName ? { ...player, comments: comment } : player)))
  }

  const handleNoteChange = (playerName: string, note: string) => {
    setPlayers(players.map((player) => (player.name === playerName ? { ...player, notes: note } : player)))
  }

  const handleEventAdded = (eventName: string) => {
    if (!listTypes.includes(eventName)) {
      setListTypes([...listTypes, eventName])
    }
  }

  const handleViewAllPlayers = () => {
    setViewAllPlayers(true)
    setSelectedTeam("")
    setViewMode("players")
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    const playersToShow = viewAllPlayers
      ? sortedPlayers
      : sortedPlayers.filter((player) => player.team === selectedTeam)
    handleWatchlistChange(
      playersToShow.map((player) => player.name),
      checked,
    )
  }

  const handleRetiredListTypeChange = (playerName: string, newListType: ListType) => {
    if (newListType === "None" || newListType === "Treated") {
      setRetiredPlayers(
        retiredPlayers.map((player) => (player.name === playerName ? { ...player, listType: newListType } : player)),
      )
    }
  }

  const handleRetiredNoteChange = (playerName: string, note: string) => {
    setRetiredPlayers(
      retiredPlayers.map((player) => (player.name === playerName ? { ...player, notes: note } : player)),
    )
  }

  // Render functions
  const renderHeader = () => {
    const isProfessional = ["NFL", "NBA", "MLB", "NHL"].includes(leagueName.toUpperCase())
    let headerText

    if (isProfessional) {
      headerText = `AuraSports ${leagueName}`
    } else {
      // Capitalize the first letter of the sport name
      const capitalizedSport = leagueName.charAt(0).toUpperCase() + leagueName.slice(1).toLowerCase()
      headerText = `Future Athlete Protection ${capitalizedSport}`
    }

    return (
      <header className="bg-gray-100 p-4 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-blue-600">{headerText}</h1>
      </header>
    )
  }

  const renderToolbar = () => (
    <div className="flex justify-between mb-4">
      <div className="flex space-x-2">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleViewAllPlayers}>
          Players
        </Button>
        <TeamDropdown league={leagueName} onTeamSelect={handleTeamSelect} />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setViewMode("analytics")}>
          {viewMode === "analytics" ? (
            <>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Players
            </>
          ) : (
            "Analytics"
          )}
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setViewMode(viewMode === "retired" ? "players" : "retired")}
        >
          {viewMode === "retired" ? (
            <>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Active Players
            </>
          ) : ["NFL", "NBA", "MLB", "NHL"].includes(leagueName.toUpperCase()) ? (
            "Retired"
          ) : (
            "Drafted"
          )}
        </Button>
        <Select onValueChange={(value) => handleSort(value as SortKey)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="position">Position</SelectItem>
            <SelectItem value="height">Height</SelectItem>
            <SelectItem value="weight">Weight</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="contractTotal">Contract Total</SelectItem>
            <SelectItem value="contractLength">Contract Length</SelectItem>
            <SelectItem value="contractYear">Contract Year</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="injuryGrade">Injury Grade</SelectItem>
            <SelectItem value="weekInjured">Week Injured</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-2">
        <Input type="text" placeholder="Search" className="max-w-xs" />
        <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => setViewMode("priority")}>
          Priority
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setViewMode("events")}>
          Events
        </Button>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => setViewMode("watchlist")}>
          Watchlist
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={() => setViewMode("treated")}>
          Treated
        </Button>
        <Button className="bg-gray-500 hover:bg-gray-600 text-white">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )

  const renderSortableHeader = (key: SortKey, label: string) => (
    <th className="border p-2 text-left cursor-pointer hover:bg-gray-300" onClick={() => handleSort(key)}>
      <div className="flex items-center">
        {label}
        {sortKey === key &&
          (sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />)}
      </div>
    </th>
  )

  const renderContent = () => {
    switch (viewMode) {
      case "analytics":
        return <AnalyticsPage leagueName={leagueName} />
      case "retired":
        return ["NFL", "NBA", "MLB", "NHL"].includes(leagueName.toUpperCase()) ? (
          <RetiredPlayersTable
            players={retiredPlayers}
            onListTypeChange={handleRetiredListTypeChange}
            onNoteChange={handleRetiredNoteChange}
          />
        ) : (
          <DraftedPlayersTable players={draftedPlayers} />
        )
      case "watchlist":
        return (
          <WatchlistView
            players={watchlistedPlayers}
            onRemoveFromWatchlist={(playerIds) => handleWatchlistChange(playerIds, false)}
            onAddToTreated={(playerIds) => handleTreatedChange(playerIds, true)}
            onCommentChange={handleCommentChange}
            onNoteChange={handleNoteChange}
          />
        )
      case "treated":
        return (
          <TreatedView
            players={treatedPlayers}
            onRemoveFromTreated={(playerIds) => handleTreatedChange(playerIds, false)}
            onAddToWatchlist={(playerIds) => handleWatchlistChange(playerIds, true)}
            onCommentChange={handleCommentChange}
            onNoteChange={handleNoteChange}
          />
        )
      case "priority":
        return (
          <PriorityView
            players={priorityPlayers}
            onRemoveFromPriority={(playerIds) => {
              // This doesn't actually remove from priority, as it's based on IRP
              // You might want to add some visual feedback here
            }}
            onAddToWatchlist={(playerIds) => handleWatchlistChange(playerIds, true)}
            onAddToTreated={(playerIds) => handleTreatedChange(playerIds, true)}
            onCommentChange={handleCommentChange}
            onNoteChange={handleNoteChange}
          />
        )
      case "events":
        return <EventsView onEventAdded={handleEventAdded} listTypes={listTypes} />
      default:
        const playersToShow = viewAllPlayers
          ? sortedPlayers
          : sortedPlayers.filter((player) => player.team === selectedTeam)
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-center w-10">
                    <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                  </th>
                  <th className="border p-2 text-left">Image</th>
                  {renderSortableHeader("name", "Name")}
                  {renderSortableHeader("irp", "IRP (%)")}
                  {renderSortableHeader("status", "Status")}
                  {renderSortableHeader("dateInjured", "Date Injured")}
                  {renderSortableHeader("erd", "ERD")}
                  {renderSortableHeader("injuryType", "Injury Type")}
                  {renderSortableHeader("weekInjured", "Week Injured")}
                  {renderSortableHeader("injuryGrade", "Injury Grade")}
                  <th className="border p-2 text-left">Comments</th>
                  <th className="border p-2 text-left">Notes</th>
                  <th className="border p-2 text-left">List Type</th>
                </tr>
              </thead>
              <tbody>
                {playersToShow.map((player, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2 text-center">
                      <Checkbox
                        checked={player.isWatchlisted}
                        onCheckedChange={(checked) => handleWatchlistChange([player.name], checked as boolean)}
                      />
                    </td>
                    <td className="border p-2">
                      <img
                        src={player.imageUrl || "/placeholder.svg"}
                        alt={player.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="border p-2">
                      <Button
                        variant="link"
                        className={`
                          ${player.listType === "Priority" ? "text-red-600 hover:text-red-800" : ""}
                          ${player.listType === "Treated" ? "text-purple-600 hover:text-purple-800" : ""}
                          ${player.listType === "Watched" ? "text-yellow-600 hover:text-yellow-800" : ""}
                          ${player.listType === "None" ? "text-black hover:text-gray-800" : ""}
                          ${!["Priority", "Treated", "Watched", "None"].includes(player.listType) ? "text-blue-600 hover:text-blue-800" : ""}
                        `}
                        onClick={() => setSelectedPlayer(player)}
                      >
                        {player.name}
                      </Button>
                    </td>
                    <td className="border p-2">{player.irp.toFixed(2)}%</td>
                    <td className="border p-2">{player.status}</td>
                    <td className="border p-2">{player.dateInjured}</td>
                    <td className="border p-2">{player.erd}</td>
                    <td className="border p-2">{player.injuryType}</td>
                    <td className="border p-2">{player.weekInjured}</td>
                    <td className="border p-2">{player.injuryGrade}</td>
                    <td className="border p-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="h-auto p-0">
                            {player.comments.length > 50 ? `${player.comments.slice(0, 50)}...` : player.comments}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Comments for {player.name}</DialogTitle>
                          </DialogHeader>
                          <p>{player.comments}</p>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="border p-2">
                      <div
                        className="cursor-text min-h-[24px]"
                        onClick={(e) => {
                          const input = e.currentTarget.querySelector("input")
                          if (input) {
                            input.style.display = "block"
                            input.focus()
                          }
                        }}
                      >
                        <div className="whitespace-pre-wrap break-words">{player.notes || "Click to add notes"}</div>
                        <Input
                          type="text"
                          value={player.notes}
                          onChange={(e) => handleNoteChange(player.name, e.target.value)}
                          onBlur={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                          className="w-full hidden"
                        />
                      </div>
                    </td>
                    <td className="border p-2">
                      <Select
                        value={player.listType}
                        onValueChange={(value) => handleListTypeChange(player.name, value as ListType)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select list type" />
                        </SelectTrigger>
                        <SelectContent>
                          {listTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
  }

  return (
    <div className={`flex flex-col min-h-screen bg-white ${montserrat.className}`}>
      {renderHeader()}
      <main className="flex-grow p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          {renderToolbar()}
          {renderContent()}
        </div>
      </main>
      {selectedPlayer && (
        <PlayerInfo
          player={selectedPlayer}
          leagueName={leagueName}
          onClose={() => setSelectedPlayer(null)}
          onListTypeChange={(newListType) => handleListTypeChange(selectedPlayer.name, newListType)}
          onCommentChange={handleCommentChange}
          onNoteChange={handleNoteChange}
        />
      )}
    </div>
  )
}

