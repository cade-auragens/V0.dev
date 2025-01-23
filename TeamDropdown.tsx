'use client'

import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'

interface TeamDropdownProps {
  league: string;
  onTeamSelect: (team: string) => void;
}

const leagueStructure: Record<string, string[]> = {
  'NFL': [
    'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills', 'Carolina Panthers', 
    'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns', 'Dallas Cowboys', 'Denver Broncos', 
    'Detroit Lions', 'Green Bay Packers', 'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 
    'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins', 
    'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants', 'New York Jets', 
    'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers', 'Seattle Seahawks', 
    'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders'
  ],
  'NBA': [
    'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 
    'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 
    'Houston Rockets', 'Indiana Pacers', 'Los Angeles Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 
    'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 
    'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 
    'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'
  ],
  'MLB': [
    'Arizona Diamondbacks', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox', 'Chicago Cubs', 
    'Chicago White Sox', 'Cincinnati Reds', 'Cleveland Guardians', 'Colorado Rockies', 'Detroit Tigers', 
    'Houston Astros', 'Kansas City Royals', 'Los Angeles Angels', 'Los Angeles Dodgers', 'Miami Marlins', 
    'Milwaukee Brewers', 'Minnesota Twins', 'New York Mets', 'New York Yankees', 'Oakland Athletics', 
    'Philadelphia Phillies', 'Pittsburgh Pirates', 'San Diego Padres', 'San Francisco Giants', 
    'Seattle Mariners', 'St. Louis Cardinals', 'Tampa Bay Rays', 'Texas Rangers', 'Toronto Blue Jays', 
    'Washington Nationals'
  ],
  'NHL': [
    'Anaheim Ducks', 'Arizona Coyotes', 'Boston Bruins', 'Buffalo Sabres', 'Calgary Flames', 
    'Carolina Hurricanes', 'Chicago Blackhawks', 'Colorado Avalanche', 'Columbus Blue Jackets', 
    'Dallas Stars', 'Detroit Red Wings', 'Edmonton Oilers', 'Florida Panthers', 'Los Angeles Kings', 
    'Minnesota Wild', 'Montreal Canadiens', 'Nashville Predators', 'New Jersey Devils', 'New York Islanders', 
    'New York Rangers', 'Ottawa Senators', 'Philadelphia Flyers', 'Pittsburgh Penguins', 'San Jose Sharks', 
    'Seattle Kraken', 'St. Louis Blues', 'Tampa Bay Lightning', 'Toronto Maple Leafs', 'Vancouver Canucks', 
    'Vegas Golden Knights', 'Washington Capitals', 'Winnipeg Jets'
  ],
  'BASKETBALL': [
    'Duke', 'Kentucky', 'North Carolina', 'Kansas', 'Villanova', 'Michigan State', 'UCLA', 'Indiana',
    'Arizona', 'Louisville', 'Syracuse', 'Connecticut', 'Florida', 'Ohio State', 'Michigan', 'Wisconsin',
    'Gonzaga', 'Virginia', 'Maryland', 'Georgetown', 'Notre Dame', 'Texas', 'Illinois', 'Purdue',
    'Oklahoma', 'Baylor', 'Oregon', 'West Virginia', 'Cincinnati', 'Memphis'
  ],
  'BASEBALL': [
    'Vanderbilt', 'LSU', 'Florida', 'Texas', 'Miami (FL)', 'Cal State Fullerton', 'Arizona State',
    'USC', 'Stanford', 'Oregon State', 'Florida State', 'South Carolina', 'North Carolina', 'Rice',
    'Georgia Tech', 'UCLA', 'Mississippi State', 'Texas A&M', 'Oklahoma State', 'Arkansas',
    'Clemson', 'Virginia', 'TCU', 'Arizona', 'UC Irvine', 'Texas Tech', 'Ole Miss',
    'Coastal Carolina', 'Louisville', 'East Carolina'
  ],
  'FOOTBALL': [
    'Alabama', 'Ohio State', 'Clemson', 'Oklahoma', 'Notre Dame', 'Georgia', 'Michigan', 'Penn State',
    'Florida', 'Texas', 'LSU', 'Oregon', 'Wisconsin', 'USC', 'Auburn', 'Texas A&M', 'Florida State',
    'Miami (FL)', 'Michigan State', 'Washington', 'Nebraska', 'Tennessee', 'UCLA', 'Virginia Tech',
    'Iowa', 'Stanford', 'TCU', 'Oklahoma State', 'Baylor', 'Utah'
  ],
  'HOCKEY': [
    'Minnesota', 'Michigan', 'Boston College', 'North Dakota', 'Wisconsin', 'Denver', 'Boston University',
    'Maine', 'Michigan State', 'Harvard', 'Cornell', 'Minnesota Duluth', 'Clarkson', 'New Hampshire',
    'St. Cloud State', 'Providence', 'Yale', 'Quinnipiac', 'Miami (OH)', 'Notre Dame', 'RPI',
    'Vermont', 'Colorado College', 'Lake Superior State', 'Northern Michigan'
  ]
}

export default function TeamDropdown({ league, onTeamSelect }: TeamDropdownProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const teams = leagueStructure[league.toUpperCase()] || []

  useEffect(() => {
    setSelectedTeam('')
  }, [league])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          {selectedTeam || 'Select Team'} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
        {teams.map((team) => (
          <DropdownMenuItem
            key={team}
            onSelect={() => {
              setSelectedTeam(team)
              onTeamSelect(team)
            }}
          >
            {team}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

