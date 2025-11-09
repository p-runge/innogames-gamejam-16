type Props = {
  imgSrc: string;
}

export default function Reward(props: Props) {
  return (
    <img src={props.imgSrc} className="w-48 h-48 animate-bounce" />
  )
}
