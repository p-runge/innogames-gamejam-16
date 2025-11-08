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
      setScene("lose1");
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
    <StoryScene dialog={"Level 1 Success"} nextScene="game" />
  ),
  "level-2-review": () => (
    <StoryScene dialog={"Level 2 Success"} nextScene="game" />
  ),
  "level-3-review": () => (
    <StoryScene dialog={"Level 3 Success"} nextScene="game" />
  ),
  lose1: () => {
    const resetGame = useGame((s) => s.resetGame);

    useEffect(() => {
      resetGame();
    }, [])

    return (
      <StoryScene dialog="..." nextScene="lose2" />
    )
  },
  lose2: () => (
    <StoryScene
      dialog="I see, you failed your quest. Good thing this is not real life, so you can just move your dead ass out there and try again."
      nextScene="menu"
    />
  ),
  win1: () => {
    const resetGame = useGame((s) => s.resetGame);

    useEffect(() => {
      resetGame();
    }, [])

    return (
      <StoryScene
        dialog="Finally… You did it! Now it is time to earn your reward. Come and share some of these delicious Mettbrötchen with me. Your service will never be forgotten."
        nextScene="win2"
      />
    )
  },
  win2: () => <StoryScene dialog="Thanks for playing" nextScene="menu" />,
};
