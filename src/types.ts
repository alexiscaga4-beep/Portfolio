/**
 * TYPE DEFINITIONS
 * Alexis Deniel Caga — Graphic Design Portfolio
 */

export interface DesignProject {
  id: string;
  title: string;
  tag: string;
  category: 'all' | 'advertising' | 'branding' | 'posters' | 'packaging' | 'editorial' | string;
  img: string;
  date: string;
  client?: string;
  desc: string;
  tools?: string[];
}

// Backward compatibility alias for artwork
export type Artwork = DesignProject;

export interface CaseStudy {
  tag: string;
  title: string;
  body: string;
  deliverables?: string[];
}

export type OscillatorWaveform = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface SynthToneOptions {
  freq?: number;
  type?: OscillatorWaveform;
  duration?: number;
  gainVal?: number;
}
