import { useEffect, useRef, useState } from "react";
import GameScene from "../scenes/game-scene";
import MenuScene from "../scenes/menu-scene";
import StoryScene from "../scenes/story-scene";
import { useGame } from "../stores/game";
import { useScene, type SceneType } from "../stores/scene";
import Reward from "./reward";

export function SceneManager() {
  const currentScene = useScene((s) => s.currentScene);
  const setScene = useScene((s) => s.setScene);

  // used for audio management
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);
  const currentLevelIndex = useGame((s) => s.currentLevelIndex);


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
      case "intro5": {
        newAudioSrc = "/audio/music/menu.mp3";
        break;
      }
      case "level-1-review":
      case "level-2-review":
      case "level-3-review":
      case "level-4-review": {
        newAudioSrc = "/audio/music/level-review.mp3";
        break;
      }
      case "lose1":
      case "lose2": {
        newAudioSrc = "/audio/music/lose.mp3";
        break;
      }
      case "game": {
        switch (currentLevelIndex) {
          case 1:
            newAudioSrc = "/audio/music/level-1.mp3";
            break;
          case 2:
            newAudioSrc = "/audio/music/level-2.mp3";
            break;
          case 3:
            newAudioSrc = "/audio/music/level-3.mp3";
            break;
          case 4:
            newAudioSrc = "/audio/music/level-4.mp3";
            break;
          default:
            newAudioSrc = "/audio/music/level-4.mp3";
        }
        break;
      }
      case "win": {
        // TODO: change to win music
        newAudioSrc = "/audio/music/winning.mp3";
      }
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
      {audioSrc && <source src={audioSrc} type="audio/mpeg" />}
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
        "Hey you. You`re finally awake. Today is the most important day of the week - It is Mettwoch! And I want you to celebrate it with me. All we need is some bread, butter, Mett and some onions. Let me just get some out of the kitchen…"
      }
      nextScene="intro2"
    />
  ),
  intro2: () => (
    <StoryScene
      imgSrc="/god-sad.png"
      dialog={
        "Oh me! Looks like i am completely out of ingredients. Well, since i am just a hungry guy on a cloud i need you to collect them."
      }
      nextScene="intro3"
    />
  ),
  intro3: () => (
    <StoryScene
      imgSrc="/god-default.png"
      dialog={
        "It will be a dangerous and exhausting journey, and its not easy to find the right path through. But don't worry, I'm positive you'll make it through!"
      }
      nextScene="intro4"
    // rewardImgSrc="/knife.png"
    />
  ),
  intro4: () => (
    <StoryScene
      imgSrc="/god-talking.png"
      dialog={
        "You have heard about rock paper scissors, right? You will need to play it to break through the obstacles on your way. Choose your weapon wisely, or there will be not Mett this week!"
      }
      nextScene="intro5"
    />
  ),
  intro5: () => (
    <StoryScene
      imgSrc="/god-pointing.png"
      dialog={
        "Now go and catch all the…ah wait, wrong universe, my bad. Well, i am hungry so hurry up. And dont fail this. Good Luck!"
      }
      nextScene="game"
      content={<img src="/acid.png" className="w-48 h-48" />}
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
      content={<Reward imgSrc="/bread-roll.png" />}
    />
  ),
  "level-2-review": () => (
    <StoryScene
      imgSrc="/god-happy.png"
      dialog={
        "Ah nice, you found the butter. Go, put it on your bread and move on. We have no time to lose."
      }
      nextScene="game"
      content={<Reward imgSrc="/butter.png" />}
    />
  ),
  "level-3-review": () => (
    <StoryScene
      imgSrc="/god-happy.png"
      dialog={
        "The heart of our dish. Ah, i love that smell. This is by far the most important ingredient, so make sure to have enough of it on your slice. But there is still one more important thing to add.."
      }
      nextScene="game"
      content={<Reward imgSrc="/mett.png" />}
    />
  ),
  "level-4-review": () => (
    <StoryScene
      imgSrc="/god-happy.png"
      dialog="Finally… You did it! Now it is time to earn your reward. Add those onions and then share some of these delicious Mettbrötchen with me. Your service will never be forgotten."
      nextScene="win"
      content={<Reward imgSrc="/onions.png" />}
    />
  ),
  win: WinScene,
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

function WinScene() {
  const resetGame = useGame((s) => s.resetGame);

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <StoryScene
      imgSrc="/mett-gusta.png"
      dialog=""
      nextScene="menu"
      content={
        <div className="flex flex-col items-center gap-4">
          <Reward imgSrc="/mettbroetchen.png" />
          <img src="/acid.png" className="w-48 h-48" />
          <div className="text-center">
            <p className="text-xl font-bold">Thanks for playing!</p>
            <p>A game for the Innogames Game Jam #16 in Nov '25</p>
            <p>by Team METTelhead (Acid & Froxx)</p>
          </div>
        </div>
      }
    />
  );
}
