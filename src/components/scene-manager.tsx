import { useEffect, useRef, useState } from "react";
import GameScene from "../scenes/game-scene";
import MenuScene from "../scenes/menu-scene";
import StoryScene from "../scenes/story-scene";
import { useGame } from "../stores/game";
import { useScene, type SceneType } from "../stores/scene";

export function SceneManager() {
  const currentScene = useScene((s) => s.currentScene);
  const setScene = useScene((s) => s.setScene);

  // used for audio management
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);


  // load audio based on scene
  useEffect(() => {
    if (!userInteracted) return;

    const el = audioRef.current;
    if (!el) return;

    let newAudioSrc;
    switch (currentScene) {
      case "menu":
      case "intro1":
      case "intro2":
      case "intro3":
      case "intro4":
      case "win1":
      case "win2":
      case "lose1":
      case "lose2":
      case "level-1-review":
      case "level-2-review":
      case "level-3-review":
        newAudioSrc = "/audio/Menu_music.mp3";
        break;
      case "game":
        newAudioSrc = "/audio/Level_1_music.mp3";
        break;
    }

    if (newAudioSrc === audioSrc) return; // keep playing

    setAudioSrc(newAudioSrc);
  }, [currentScene, audioRef, userInteracted]);

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.load(); // preload new track
    if (userInteracted) {
      audioRef.current.play().catch((e) => {
        console.error(e);
      });
    }
  }, [audioSrc]);


  // Wait for first user interaction (needed to play audio)
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  // handle death
  const health = useGame((s) => s.health);
  useEffect(() => {
    if (health <= 0) {
      setScene("lose1");
    }
  }, [health, setScene]);

  const Scene = sceneMap[currentScene];

  return <>
    <audio ref={audioRef} loop>
      <source src={audioSrc} type="audio/mpeg" />
    </audio>
    <Scene />
  </>;
}

const sceneMap: Record<SceneType, React.FC> = {
  menu: MenuScene,
  intro1: () => (
    <StoryScene
      imgSrc="/god-waving.png"
      dialog={
        "Hey you. You`re finally awake. My name is Philipp and i want you to celebrate the most important day of the week with me - it is Mettwoch! All we need is some bread, butter, Mett and some onions. Let me just get some out of the kitchen…"
      }
      nextScene="intro2"
    />
  ),
  intro2: () => (
    <StoryScene
      imgSrc="/god-sad.png"
      dialog={
        "Oh me! Looks like i am completely out of ingredients. Well, due to i am just a hungry guy on a cloud i need you to collect them. It will be a dangerous and exhausting journey, and its not easy to find the right path through. But don`t worry, there is still a way i can help you out. Take this knife, it is able to crack up the magical barriers if you add the right element power to it. "
      }
      nextScene="intro3"
    />
  ),
  intro3: () => (
    <StoryScene
      imgSrc="/god-talking.png"
      dialog={
        "The ingredients are guarded by a maze - you have to find the right item ( ? ) to navigate safely through it. Watch out for the item that matches the color of the next obstacle. But there is one more outstanding issue - a higher power has decreed that logic is optional (irrational?) around those mazes. Color logic could switch at any time."
      }
      nextScene="intro4"
    />
  ),
  intro4: () => (
    <StoryScene
      imgSrc="/god-pointing.png"
      dialog={
        "Now go and catch all the…ah wait, wrong universe, my bad. Well, i am hungry so hurry up. And dont fail this. Good Luck"
      }
      nextScene="game"
    />
  ),
  game: GameScene,
  "level-1-review": () => (
    <StoryScene
      imgSrc="/god-happy.png"
      dialog={
        "You did it! These were your first successful steps on the ladder leading to a delicious Mettbrötchen. But be aware, there are many more dangers awaiting you.."
      }
      nextScene="game"
      content={
        <img src="/bread-roll.png" className="w-48 h-48 animate-bounce" />
      }
    />
  ),
  "level-2-review": () => (
    <StoryScene
      imgSrc="/god-happy.png"
      dialog={
        "Ah nice, you found the butter. Go, put it on your bread and move on. We have no time to lose."
      }
      nextScene="game"
      content={
        <img src="/butter.png" className="w-48 h-48 animate-bounce" />
      }
    />
  ),
  "level-3-review": () => (
    <StoryScene
      imgSrc="/god-happy.png"
      dialog={
        "The heart of our dish. Ah, i love that smell. This is by far the most important ingredient, so make sure to have enough of it on your slice. But there is still one more important thing to add.."
      }
      nextScene="game"
      content={
        <img src="/mett.png" className="w-48 h-48 animate-bounce" />
      }
    />
  ),
  win1: Win1Scene,
  win2: () => <StoryScene
    imgSrc="/mett-gusta.png" dialog="Thanks for playing" nextScene="menu" />,
  lose1: Lose1Scene,
  lose2: () => (
    <StoryScene
      imgSrc="/god-sad.png"
      dialog="I see, you failed your quest. Good thing this is not real life, so you can just move your dead ass out there and try again."
      nextScene="menu"
    />
  ),
};


function Lose1Scene() {
  const resetGame = useGame((s) => s.resetGame);

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <StoryScene
      imgSrc="/god-sad.png"
      dialog="..."
      nextScene="lose2"
    />
  );
}

function Win1Scene() {
  const resetGame = useGame((s) => s.resetGame);

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <StoryScene
      imgSrc="/mett-gusta.png"
      dialog="Finally… You did it! Now it is time to earn your reward. Add those onions and then share some of these delicious Mettbrötchen with me. Your service will never be forgotten."
      nextScene="win2"
      content={
        <img src="/onions.png" className="w-48 h-48 animate-bounce" />
      }
    />
  );
}
