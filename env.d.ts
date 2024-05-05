/// <reference types='vite/client' />
/// <reference types='@total-typescript/ts-reset' />

declare interface Document {
	startViewTransition: (callback: (...args) => any) => void;
}