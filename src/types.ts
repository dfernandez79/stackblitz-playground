import type { ReactElement } from 'react';

export interface Playground {
  title: string;
  stories: Record<string, () => ReactElement>;
}

export interface PlaygroundStory {
  name: string;
  Component: () => ReactElement;
  playground: Playground;
}
