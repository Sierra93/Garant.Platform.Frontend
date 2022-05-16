import { InjectionToken } from "@angular/core";
import { WindowProvider } from "./window.provider";

/** Токен поставщика объекта Window для приложения */
export const WINDOW = new InjectionToken<WindowProvider>('Global window provider');
