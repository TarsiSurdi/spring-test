import { useEffect, useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";

const StyledCard = styled(animated.div)`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 45vh;
  max-width: 300px;
  height: 85vh;
  max-height: 570px;

  font-family: "Germania One";
  font-size: 28pt;

  background-color: white;

  will-change: transform;

  border-radius: 10px;
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);

  touch-action: none;
  grid-area: 1 / 1;
`;

const Card = () => {
  const [text, setText] = useState("Card Text");
  const [springProps, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateZ: -5 + Math.random() * 15,
  }));

  // Update card text after time interval
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setText("Card Text");
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);

  // Animation logic
  const bind = useDrag(
    ({
      down,
      movement: [xMovement, yMovement],
      velocity: [xVelocity, yVelocity],
    }) => {
      if (xVelocity > 0.35 && !down) {
        if (xMovement < 0) {
          setText("Swiped Left");
        } else {
          setText("Swiped Right");
        }
      }

      // Rotation clamping
      let rotation = xMovement * 0.1;
      const maxRotation = 40;

      if (rotation >= maxRotation || rotation <= -maxRotation) {
        if (rotation >= maxRotation) {
          rotation = maxRotation;
        } else if (rotation <= -maxRotation) {
          rotation = -maxRotation;
        }
      }

      api.start({
        x: down ? xMovement : 0,
        y: down ? yMovement : 0,
        rotateZ: down ? rotation : 0,
        immediate: down,
      });
    }
  );

  return (
    <StyledCard {...bind()} style={{ ...springProps }}>
      <p>{text}</p>
    </StyledCard>
  );
};

export default animated(Card);
