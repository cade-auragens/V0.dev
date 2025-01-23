'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { montserrat } from '../lib/fonts'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Team data structure
const teamsData = {
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

interface Player {
  id: string;
  name: string;
  position: string;
  injuryType: string;
  injuryDate: string;
  expectedReturnDate: string;
}

interface AnalyticsPageProps {
  leagueName: string;
}

export default function AnalyticsPage({ leagueName }: AnalyticsPageProps) {
  const [teams, setTeams] = useState<string[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [teamData, setTeamData] = useState<any>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  useEffect(() => {
    const leagueTeams = teamsData[leagueName as keyof typeof teamsData] || []
    setTeams(leagueTeams)
    if (leagueTeams.length > 0) {
      setSelectedTeam(leagueTeams[0])
    }
  }, [leagueName])

  useEffect(() => {
    if (selectedTeam) {
      // Generate mock data for the selected team
      setTeamData({
        healthScore: Math.floor(Math.random() * (100 - 60 + 1) + 60),
        activeInjuries: Math.floor(Math.random() * 20),
        recoveryRate: Math.floor(Math.random() * (100 - 60 + 1) + 60),
        injuryData: [
          { month: 'Pre Season', injuries: Math.floor(Math.random() * 20), recovered: Math.floor(Math.random() * 15) },
          { month: 'Early Season', injuries: Math.floor(Math.random() * 25), recovered: Math.floor(Math.random() * 20) },
          { month: 'Mid Season', injuries: Math.floor(Math.random() * 30), recovered: Math.floor(Math.random() * 25) },
          { month: 'Late Season', injuries: Math.floor(Math.random() * 20), recovered: Math.floor(Math.random() * 15) },
          { month: 'Post Season', injuries: Math.floor(Math.random() * 15), recovered: Math.floor(Math.random() * 10) },
        ],
        injuryTypeData: [
          { name: 'ACL', value: Math.floor(Math.random() * 30) },
          { name: 'Concussion', value: Math.floor(Math.random() * 30) },
          { name: 'Ankle Sprain', value: Math.floor(Math.random() * 30) },
          { name: 'Hamstring', value: Math.floor(Math.random() * 30) },
          { name: 'Other', value: Math.floor(Math.random() * 30) },
        ],
        trendData: Array.from({ length: 16 }, (_, i) => ({
          week: `W${i + 1}`,
          score: Math.floor(Math.random() * (100 - 60 + 1) + 60),
        })),
        positionInjuryData: [
          { 
            position: 'QB', 
            injuries: Math.floor(Math.random() * 3) + 1,
            players: [
              {
                id: 'QB-1',
                name: 'Patrick Mahomes',
                position: 'QB',
                injuryType: 'Ankle Sprain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
              {
                id: 'QB-2',
                name: 'Josh Allen',
                position: 'QB',
                injuryType: 'Shoulder Strain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 21) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
            ].slice(0, Math.floor(Math.random() * 2) + 1), // Randomly select 1 or 2 players
          },
          { 
            position: 'RB', 
            injuries: Math.floor(Math.random() * 4) + 1,
            players: [
              {
                id: 'RB-1',
                name: 'Derrick Henry',
                position: 'RB',
                injuryType: 'Hamstring Strain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 28) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
              {
                id: 'RB-2',
                name: 'Christian McCaffrey',
                position: 'RB',
                injuryType: 'Knee Sprain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 35) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
              {
                id: 'RB-3',
                name: 'Alvin Kamara',
                position: 'RB',
                injuryType: 'Ankle Sprain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 21) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
            ].slice(0, Math.floor(Math.random() * 3) + 1), // Randomly select 1 to 3 players
          },
          { 
            position: 'WR', 
            injuries: Math.floor(Math.random() * 5) + 1,
            players: [
              {
                id: 'WR-1',
                name: 'Davante Adams',
                position: 'WR',
                injuryType: 'Hamstring Strain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 28) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
              {
                id: 'WR-2',
                name: 'Tyreek Hill',
                position: 'WR',
                injuryType: 'Ankle Sprain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 21) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
              {
                id: 'WR-3',
                name: 'DeAndre Hopkins',
                position: 'WR',
                injuryType: 'Calf Strain',
                injuryDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                expectedReturnDate: new Date(Date.now() + Math.floor(Math.random() * 35) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              },
            ].slice(0, Math.floor(Math.random() * 3) + 1), // Randomly select 1 to 3 players
          },
          // Add more positions with realistic player data...
        ],
      })
    }
  }, [selectedTeam])

  const handleTeamChange = (teamName: string) => {
    setSelectedTeam(teamName)
  }

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
  }

  if (!teamData) {
    return <div>Loading...</div>
  }

  const isProfessionalLeague = ['NFL', 'NBA', 'MLB', 'NHL'].includes(leagueName.toUpperCase())

  return (
    <div className={`space-y-8 p-4 ${montserrat.className}`}>
      <div className="w-full max-w-xs mx-auto">
        <Select onValueChange={handleTeamChange} value={selectedTeam}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Team Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">{teamData.healthScore}</div>
            <p className="text-sm text-gray-500 mt-2">+5 from last week</p>
          </CardContent>
          <p className="text-sm text-gray-600 mt-2">
            Overall health status of the team.
          </p>
        </Card>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Active Injuries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-yellow-500">{teamData.activeInjuries}</div>
            <p className="text-sm text-gray-500 mt-2">3 pending return</p>
          </CardContent>
          <p className="text-sm text-gray-600 mt-2">
            Current number of injured players.
          </p>
        </Card>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Recovery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-500">{teamData.recoveryRate}%</div>
            <p className="text-sm text-gray-500 mt-2">Above league average</p>
          </CardContent>
          <p className="text-sm text-gray-600 mt-2">
            Percentage of injured players who have recovered.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Injury Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square w-full">
              <ChartContainer
                config={{
                  injuries: {
                    label: "Total Injuries",
                    color: "hsl(var(--chart-1))",
                  },
                  recovered: {
                    label: "Recovered",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamData.injuryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="injuries" fill="var(--color-injuries)" name="Total Injuries" />
                    <Bar dataKey="recovered" fill="var(--color-recovered)" name="Recovered" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
          <p className="text-sm text-gray-600 mt-4">
            This graph shows the number of injuries and recoveries across different phases of the season. 
            It helps identify high-risk periods and assess the team's recovery efficiency. 
            Pre-season injuries may indicate overtraining, while a high number of injuries in the mid-season 
            could suggest fatigue or the need for rotation strategies.
          </p>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Injury Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Injuries",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teamData.injuryTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {teamData.injuryTypeData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
          <p className="text-sm text-gray-600 mt-4">
            This pie chart provides a visual breakdown of the types of injuries sustained by the team. 
            This information can be used to identify patterns and potential areas for injury prevention. 
            For example, a high percentage of ACL injuries might suggest a need for improved strength and conditioning programs.
          </p>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <CardHeader>
            <CardTitle>Health Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[2/1] w-full">
              <ChartContainer
                config={{
                  score: {
                    label: "Health Score",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={teamData.trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[60, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-score)"
                      strokeWidth={2}
                      name="Health Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
          <p className="text-sm text-gray-600 mt-4">
            This line chart illustrates the team's overall health score over time. 
            It allows for the tracking of progress and identification of periods of improvement or decline. 
            This can be valuable for assessing the effectiveness of training and recovery strategies.
          </p>
        </Card>

        {isProfessionalLeague && (
          <Card className="p-6 lg:col-span-2">
            <CardHeader>
              <CardTitle>Injuries by Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/1] w-full">
                <ChartContainer
                  config={{
                    injuries: {
                      label: "Injuries",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamData.positionInjuryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="position" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="injuries" fill="var(--color-injuries)" name="Injuries">
                        {teamData.positionInjuryData.map((entry: any, index: number) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                            onClick={() => handlePlayerClick(entry.players[0])}
                            style={{ cursor: 'pointer' }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
            <p className="text-sm text-gray-600 mt-4">
              This bar chart shows how injuries are distributed across different playing positions. 
              It helps identify high-risk roles that may need additional support or modified training regimens. 
              Click on a bar to see details of the injured players in that position.
            </p>
            <div className="mt-4 max-h-[300px] overflow-y-auto">
              <h4 className="font-semibold mb-2">Injured Players by Position:</h4>
              {teamData.positionInjuryData.map((positionData: any) => (
                <div key={positionData.position} className="mb-2">
                  <h5 className="font-medium">{positionData.position} ({positionData.players.length} injuries):</h5>
                  <ul className="list-disc list-inside">
                    {positionData.players.map((player: Player) => (
                      <li key={player.id}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" className="p-0 h-auto font-normal">
                              {player.name}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{player.name} - Injury Details</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <p><strong>Position:</strong> {player.position}</p>
                              <p><strong>Injury Type:</strong> {player.injuryType}</p>
                              <p><strong>Injury Date:</strong> {player.injuryDate}</p>
                              <p><strong>Expected Return Date:</strong> {player.expectedReturnDate}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

