import { useEffect } from "react";
import GameScene from "../scenes/game-scene";
import MenuScene from "../scenes/menu-scene";
import StoryScene from "../scenes/story-scene";
import { useGame } from "../stores/game";
import { useScene, type SceneType } from "../stores/scene";

export function SceneManager() {
  const currentScene = useScene((s) => s.currentScene);
  const setScene = useScene((s) => s.setScene);

  // handle death
  const health = useGame((s) => s.health);
  useEffect(() => {
    if (health <= 0) {
      setScene("lose");
    }
  }, [health, setScene]);

  const Scene = sceneMap[currentScene];

  return <Scene />;
}

const sceneMap: Record<SceneType, React.FC> = {
  menu: MenuScene,
  intro1: () => (
    <StoryScene
      dialog={
        "Hey you. You`re finally awake. My name is Philipp and i want you to celebrate the most important day of the week with me - it is Mettwoch! All we need is some bread, butter, Mett and some onions. Let me just get some out of the kitchen…"
      }
      nextScene="intro2"
    />
  ),
  intro2: () => (
    <StoryScene
      dialog={
        "Looks like i am completely out of ingredients. Well, due to i am just a hungry guy on a cloud i need you to collect them. It will be a dangerous and exhausting journey, and its not easy to find the right path through. But don`t worry, there is still a way i can help you out. Take this knife, it is able to crack up the magical barriers if you add the right element power to it. "
      }
      nextScene="intro3"
    />
  ),
  intro3: () => (
    <StoryScene
      dialog={
        "The ingredients are guarded by a maze - you have to find the right item ( ? ) to navigate safely through it. Watch out for the item that matches the color of the next obstacle. But there is one more outstanding issue - a higher power has decreed that logic is optional (irrational?) around those mazes. Color logic could switch at any time."
      }
      nextScene="intro4"
    />
  ),
  intro4: () => (
    <StoryScene
      dialog={
        "Now go and catch all the…ah wait, wrong universe, my bad. Well, i am hungry so hurry up. And dont fail this. Good Luck"
      }
      nextScene="game"
    />
  ),
  game: GameScene,
  "level-1-review": () => (
    <StoryScene
      dialog={
        "Well done! You made it through the first level. The journey is far from over, keep going to collect all ingredients for the perfect Mettbrotchen!"
      }
      nextScene="game"
    />
  ),
  "level-2-review": () => (
    <StoryScene
      dialog={
        "Great job reaching this point! You're halfway through collecting all the ingredients. Stay focused and continue your quest for the ultimate Mettbrotchen!"
      }
      nextScene="game"
    />
  ),
  "level-3-review": () => (
    <StoryScene
      dialog={
        "Fantastic! You've gathered most of the ingredients. Just a little more effort and you'll have everything needed for the perfect Mettbrotchen. Keep it up!"
      }
      nextScene="game"
    />
  ),
  lose: () => <div>Game Over</div>,
  win: () => <div>You won!</div>,
};
