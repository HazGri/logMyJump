import Image from "next/image";

type CardStatProps = {
  imgSrc: string;
  imgAlt: string;
  cardTitle: string;
  cardData: number | string; // <- ici
};

export const CardStat = ({ imgSrc, imgAlt, cardTitle, cardData }: CardStatProps) => {
  return (
    <div className="w-[140px] h-[115px] bg-white rounded-lg flex flex-col justify-center items-center gap-2">
      <Image width={30} height={30} src={imgSrc} alt={imgAlt}/>
      <p className="text-xs text-center">{cardTitle}</p>
      <p>{cardData}</p>
    </div>
  );
};
