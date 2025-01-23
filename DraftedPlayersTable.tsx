import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DraftedPlayer } from '../types/player'

interface DraftedPlayersTableProps {
  players: DraftedPlayer[]
}

export default function DraftedPlayersTable({ players }: DraftedPlayersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>College</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Draft Status</TableHead>
          <TableHead>Draft Info</TableHead>
          <TableHead>Key Stats</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.name}>
            <TableCell className="font-medium">{player.name}</TableCell>
            <TableCell>{player.college}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.draftStatus}</TableCell>
            <TableCell>
              {player.draftStatus === 'Drafted' ? (
                `${player.draftYear} R${player.draftRound} P${player.draftPick}`
              ) : (
                `Projected: ${player.projectedRound}`
              )}
            </TableCell>
            <TableCell>
              {Object.entries(player.keyStats).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

