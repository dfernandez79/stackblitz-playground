import * as React from 'react';

import type { Playground, PlaygroundStory } from './types';

interface PlaygroundNavBarProps {
  playgrounds: ReadonlyArray<Playground>;
  story: PlaygroundStory;
}

const PlaygroundNavBar = ({ playgrounds, story }: PlaygroundNavBarProps) => (
  <div>
    <select>
      {playgrounds.map((playground) => (
        <option key={playground.title}>{playground.title}</option>
      ))}
    </select>
    <select>
      {Object.keys(story.playground.stories).map((storyName) => (
        <option key={storyName}>{storyName}</option>
      ))}
    </select>
    <a href={`?path=testing&nav=false`}>Close</a>
  </div>
);

export interface PreviewProps {
  playgrounds: ReadonlyArray<Playground>;
  path?: string;
  navBar?: boolean;
}

const findStory = (
  playgrounds: ReadonlyArray<Playground>,
  path: string
): PlaygroundStory => ({
  name: 'Demo',
  Component: playgrounds[0]!.stories['Demo']!,
  playground: playgrounds[0]!,
});

export const Preview = ({ playgrounds, path, navBar = true }: PreviewProps) => {
  const story = React.useMemo(
    () => findStory(playgrounds, path),
    [playgrounds, path]
  );
  const { Component } = story;

  return (
    <>
      {navBar && <PlaygroundNavBar playgrounds={playgrounds} story={story} />}
      <div>{path}</div>
      <Component />
    </>
  );
};
