from collections import deque

from app.schemas.event import ClusterEvent


class EventManager:

    def __init__(self):

        self.events = deque(maxlen=100)

    def add_event(self, event: ClusterEvent):

        self.events.appendleft(event)

    def get_events(self):

        return list(self.events)


event_manager = EventManager()