import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Logo from './Logo'
import { Player, ListType, LeagueHistory, Injury } from '../types/player'
import { Input } from "@/components/ui/input";

interface PlayerInfoProps {
  player: Player;
  leagueName: string;
  onClose: () => void;
  onListTypeChange: (newListType: ListType) => void;
  onCommentChange: (playerName: string, comment: string) => void;
  onNoteChange: (playerName: string, note: string) => void;
}

export default function PlayerInfo({ player, leagueName, onClose, onListTypeChange, onCommentChange, onNoteChange }: PlayerInfoProps) {
  const renderLeagueHistory = () => {
    if (!player.leagueHistory) return null;

    switch (leagueName.toUpperCase()) {
      case 'MLB':
        return (
          <Accordion type="single" collapsible className="w-full">
            {player.leagueHistory.map((history: LeagueHistory, index: number) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  {history.league} ({history.startDate} - {history.endDate})
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Total Injuries: {history.injuries.length}</p>
                  {history.injuries.length > 0 && renderInjuryTable(history.injuries)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        );
      case 'NFL':
      case 'NBA':
      case 'NHL':
        const relevantHistory = player.leagueHistory.find(h => h.league.toUpperCase() === leagueName.toUpperCase());
        return relevantHistory ? renderInjuryTable(relevantHistory.injuries) : <p>No injury history available for this league.</p>;
      default:
        return null;
    }
  };

  const renderInjuryTable = (injuries: Injury[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Injury Type</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {injuries.map((injury, index) => (
          <TableRow key={index}>
            <TableCell>{injury.date}</TableCell>
            <TableCell>{injury.type}</TableCell>
            <TableCell>{injury.duration}</TableCell>
            <TableCell>{injury.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex justify-between items-center sticky top-0 bg-white z-10 p-6 border-b">
          <Logo />
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="md:w-1/3">
              <img
                src={player.imageUrl || "/placeholder.svg?height=300&width=300"}
                alt={player.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="watchlist"
                    checked={player.listType === 'Watched'}
                    onCheckedChange={(checked) => onListTypeChange(checked ? 'Watched' : player.listType)}
                  />
                  <Label htmlFor="watchlist">Add to Watchlist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="treated"
                    checked={player.listType === 'Treated'}
                    onCheckedChange={(checked) => onListTypeChange(checked ? 'Treated' : player.listType)}
                  />
                  <Label htmlFor="treated">Mark as Treated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="priority"
                    checked={player.listType === 'Priority'}
                    onCheckedChange={(checked) => onListTypeChange(checked ? 'Priority' : player.listType)}
                  />
                  <Label htmlFor="priority">Add to Priority</Label>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <DialogTitle className="text-3xl font-bold text-blue-600 mb-4">{player.name}</DialogTitle>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <p><strong>Position:</strong> {player.position}</p>
                <p><strong>IRP:</strong> {player.irp.toFixed(2)}%</p>
                <p><strong>Height:</strong> {player.height}</p>
                <p><strong>Weight:</strong> {player.weight}</p>
                <p><strong>Experience:</strong> {player.experience} years</p>
                <p><strong>Contract Total:</strong> ${player.contractTotal.toLocaleString()}</p>
                <p><strong>Contract Length:</strong> {player.contractLength} years</p>
                <p><strong>Contract Year:</strong> Year {player.contractYear} of {player.contractLength}</p>
                <p><strong>Salary:</strong> ${player.salary.toLocaleString()}</p>
                <p><strong>Agent:</strong> {player.agent}</p>
                <p><strong>Agent Email:</strong> {player.agentEmail}</p>
                <p><strong>Status:</strong> {player.status}</p>
                <p><strong>Date Injured:</strong> {player.dateInjured}</p>
                <p><strong>ERD:</strong> {player.erd}</p>
                <p><strong>Injury Type:</strong> {player.injuryType}</p>
                <p><strong>Injury Grade:</strong> {player.injuryGrade}</p>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comments</h3>
              <Input 
                type="text" 
                value={player.comments} 
                onChange={(e) => onCommentChange(player.name, e.target.value)}
                className="w-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Notes</h3>
              <Input 
                type="text" 
                value={player.notes} 
                onChange={(e) => onNoteChange(player.name, e.target.value)}
                className="w-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Injury History</h3>
              {renderLeagueHistory()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

