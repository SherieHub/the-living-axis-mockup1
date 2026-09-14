const fs = require('fs');
let content = fs.readFileSync('src/data/content.ts', 'utf8');

const typeDef = `export interface DurationOption {
  minutes: number;
  price?: number;
  addonPrice?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  hook?: string;
  description: string;
  idealFor?: string;
  mayInclude?: string;
  durations: DurationOption[];
}

`;

if (!content.includes('export interface ServiceItem')) {
  content = typeDef + content.replace('export const services = [', 'export const services: ServiceItem[] = [').replace('export const specialtyServices = [', 'export const specialtyServices: ServiceItem[] = [');
  fs.writeFileSync('src/data/content.ts', content);
}
