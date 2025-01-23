import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Event {
  id: string
  name: string
  date: string
  location: string
  players: string[]
}

interface EventsViewProps {
  onEventAdded: (eventName: string) => void
  listTypes: string[]
}

export default function EventsView({ onEventAdded, listTypes }: EventsViewProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Omit<Event, "id" | "players">>({ name: "", date: "", location: "" })
  const [newPlayerName, setNewPlayerName] = useState("")

  const addEvent = () => {
    if (newEvent.name && newEvent.date && newEvent.location) {
      if (!listTypes.includes(newEvent.name)) {
        const event = { ...newEvent, id: Date.now().toString(), players: [] }
        setEvents([...events, event])
        setNewEvent({ name: "", date: "", location: "" })
        onEventAdded(event.name) // Notify parent component about the new event
      } else {
        alert("This event already exists in the List Types.")
      }
    }
  }

  const addPlayerToEvent = (eventId: string) => {
    if (newPlayerName) {
      setEvents(
        events.map((event) =>
          event.id === eventId ? { ...event, players: [...event.players, newPlayerName] } : event,
        ),
      )
      setNewPlayerName("")
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <div className="mb-4 flex space-x-2">
        <Input
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        <Input
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <Button onClick={addEvent}>Add Event</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.players.join(", ")}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add Player</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Player to {event.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Player Name"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                      />
                      <Button onClick={() => addPlayerToEvent(event.id)}>Add</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Existing List Types</h3>
        <ul className="list-disc list-inside">
          {listTypes.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

