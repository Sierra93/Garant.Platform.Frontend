import { session } from "./session";
import { InjectionToken } from "@angular/core";

export const SESSION_TOKEN = new InjectionToken<session.ISessionProvider>('SESSION_TOKEN');
