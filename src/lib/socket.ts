import { env } from "@/env";
import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

if (env.NEXT_PUBLIC_WS_SERVER_URL) {
	socket = io(env.NEXT_PUBLIC_WS_SERVER_URL);
}

export { socket };
