import { useState } from "react";

import Card from "./components/Card";

function App() {
  const [cards, setCards] = useState(new Array(5).fill(0));

  return (
    <div className="App">
      <div
        style={{
          display: "grid",
          gridTemplate: "1fr / 1fr",
        }}
      >
        {cards.map(() => (
          <Card />
        ))}
      </div>
    </div>
  );
}

export default App;
