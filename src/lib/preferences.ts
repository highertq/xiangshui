export type Currency = 'USD' | 'EUR';
export function getCurrency(): Currency { try { return localStorage.getItem('preferred-currency') === 'EUR' ? 'EUR' : 'USD'; } catch { return 'USD'; } }
export function setCurrency(value: string) { try { localStorage.setItem('preferred-currency', value === 'EUR' ? 'EUR' : 'USD'); } catch { /* Preference persistence is optional. */ } }
