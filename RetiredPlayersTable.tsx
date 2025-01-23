import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { RetiredPlayer, ListType } from "../types/player"

interface RetiredPlayersTableProps {
  players: RetiredPlayer[]
  onListTypeChange: (playerName: string, newListType: ListType) => void
  onNoteChange: (playerName: string, note: string) => void
}

export default function RetiredPlayersTable({ players, onListTypeChange, onNoteChange }: RetiredPlayersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Years Played</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Key Stats</TableHead>
          <TableHead>List Type</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Injury History</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.name}>
            <TableCell>
              <img src={player.imageUrl || "/placeholder.svg"} alt={player.name} className="w-10 h-10 rounded-full" />
            </TableCell>
            <TableCell className="font-medium">{player.name}</TableCell>
            <TableCell>{player.team}</TableCell>
            <TableCell>{player.yearsPlayed}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>
              {Object.entries(player.keyStats).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </TableCell>
            <TableCell>
              <Select
                value={player.listType}
                onValueChange={(value) => onListTypeChange(player.name, value as ListType)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select list type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Treated">Treated</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
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
                  onChange={(e) => onNoteChange(player.name, e.target.value)}
                  onBlur={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                  className="w-full hidden"
                />
              </div>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Injuries</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{player.name}'s Injury History</DialogTitle>
                  </DialogHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {player.injuryHistory.map((injury, index) => (
                        <TableRow key={index}>
                          <TableCell>{injury.date}</TableCell>
                          <TableCell>{injury.type}</TableCell>
                          <TableCell>{injury.duration}</TableCell>
                          <TableCell>{injury.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

