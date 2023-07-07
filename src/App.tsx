import * as React from 'react';
import { Preview } from './Preview';
import * as TestPlayground from './TestPlayground.stories';
import { Playground } from './types';

const playgroundFromModule = (obj: object): Playground => {
  return {
    title: obj.default.title,
    stories: Object.fromEntries(
      Object.entries(obj).filter(([name]) => name !== 'default')
    ),
  };
};

const playgrounds = [playgroundFromModule(TestPlayground)] as const;

export default function App() {
  const [path, setPath] = React.useState<string>();
  const [navBar, setNavBar] = React.useState(true);

  React.useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    setPath(params.get('path'));
    setNavBar(!(params.get('nav') === 'false'));
  }, []);

  return <Preview playgrounds={playgrounds} path={path} navBar={navBar} />;
}
