from contextlib import asynccontextmanager
import threading
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.services.watcher_service import watcher_service

from app.api import (
    analyze,
    deployments,
    events,
    incidents,
    namespaces,
    nodes,
    pods,
    services,
    incident_history,
    dashboard,
    pod_details,
    ws,
)


@asynccontextmanager
async def lifespan(app: FastAPI):

    watcher_thread = threading.Thread(
        target=watcher_service.watch_pods,
        daemon=True,
    )

    watcher_thread.start()

    print("Pod watcher started.")

    yield

    print("Application shutting down...")


app = FastAPI(
    title="KubeMind AI",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pods.router)
app.include_router(nodes.router)
app.include_router(deployments.router)
app.include_router(services.router)
app.include_router(namespaces.router)
app.include_router(events.router)
app.include_router(incidents.router)
app.include_router(analyze.router)
app.include_router(incident_history.router)
app.include_router(dashboard.router)
app.include_router(pod_details.router)
app.include_router(ws.router)