import { registerRootComponent } from "expo";

import EntryPoint from "./src";

function App() {
  return <EntryPoint />;
}

registerRootComponent(App);
