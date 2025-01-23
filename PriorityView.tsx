import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Player } from '../types/player'
import { Input } from "@/components/ui/input"

interface PriorityViewProps {
  players: Player[];
  onRemoveFromPriority: (playerIds: string[]) => void;
  onAddToWatchlist: (playerIds: string[]) => void;
  onAddToTreated: (playerIds: string[]) => void;
  onCommentChange: (playerName: string, comment: string) => void;
  onNoteChange: (playerName: string, note: string) => void;
}

export default function PriorityView({ 
  players, 
  onRemoveFromPriority, 
  onAddToWatchlist, 
  onAddToTreated, 
  onCommentChange, 
  onNoteChange 
}: PriorityViewProps) {
  const [selectedPlayers, setSelectedPlayers] = React.useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPlayers(players.map(p => p.name));
    } else {
      setSelectedPlayers([]);
    }
  };

  const handleSelectPlayer = (playerId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    } else {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Priority Players (IRP ≥ 65%)</h2>
        <div>
          <Button 
            onClick={() => onRemoveFromPriority(selectedPlayers)}
            disabled={selectedPlayers.length === 0}
            className="mr-2"
          >
            Remove Selected from Priority
          </Button>
          <Button 
            onClick={() => onAddToWatchlist(selectedPlayers)}
            disabled={selectedPlayers.length === 0}
            className="mr-2"
          >
            Add Selected to Watchlist
          </Button>
          <Button 
            onClick={() => onAddToTreated(selectedPlayers)}
            disabled={selectedPlayers.length === 0}
          >
            Add Selected to Treated
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedPlayers.length === players.length}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>IRP (%)</TableHead>
            <TableHead>Injury Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>ERD</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.name}>
              <TableCell>
                <Checkbox
                  checked={selectedPlayers.includes(player.name)}
                  onCheckedChange={(checked) => handleSelectPlayer(player.name, checked as boolean)}
                />
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.irp.toFixed(2)}%</TableCell>
              <TableCell>{player.injuryType}</TableCell>
              <TableCell>{player.status}</TableCell>
              <TableCell>{player.erd}</TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={player.comments}
                  onChange={(e) => onCommentChange(player.name, e.target.value)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={player.notes}
                  onChange={(e) => onNoteChange(player.name, e.target.value)}
                  className="w-full"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

