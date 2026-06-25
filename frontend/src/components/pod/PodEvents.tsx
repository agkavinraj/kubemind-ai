interface Props {
  events: string[];
}

export default function PodEvents({ events }: Props) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Events
      </h2>

      <div className="space-y-2">

        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="border rounded-lg p-3"
            >
              {event}
            </div>
          ))
        )}

      </div>

    </div>
  );
}