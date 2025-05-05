import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HomeScreen() {
  const welcomeRef = useRef(null);

  useEffect(() => {
    const welcome = welcomeRef.current;
  }, []);
  return (
    <div>
      <p>askdsadasd</p>
    </div>
  );
}
