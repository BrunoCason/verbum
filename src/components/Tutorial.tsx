type Color = "green" | "yellow" | "gray" | "default";

const LetterTile = ({ letter, color }: { letter: string; color: Color }) => {
  const colors: { [key in Color]: string } = {
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    gray: "bg-gray-900",
    default: "bg-teste1",
  };

  return (
    <div
      className={`w-8 h-8 flex justify-center items-center font-bold rounded-lg ${colors[color]}`}
    >
      {letter}
    </div>
  );
};

export default function Tutorial() {
  return (
    <main className="flex flex-col p-5 bg-teste shadow-lg rounded-lg mx-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Como Jogar</h2>
      <p className="text-lg mb-4">
        O objetivo do jogo é adivinhar a palavra correta em até 6 tentativas.
      </p>
      <p>A cada tentativa, digite uma palavra de 5 letras.</p>
      <p>Pressione Enter para enviar sua tentativa.</p>

      <div className="flex gap-2 mb-4">
        {["V", "E", "R", "B", "O"].map((letter) => (
          <LetterTile key={letter} letter={letter} color="default" />
        ))}
      </div>

      <p>As cores das letras indicarão o status da tentativa:</p>

      <p>Verde: A letra está correta e na posição certa.</p>
      <div className="flex gap-2 mb-4">
        {["V", "E", "R", "B", "O"].map((letter, index) => (
          <LetterTile
            key={letter}
            letter={letter}
            color={index === 0 ? "green" : "default"}
          />
        ))}
      </div>

      <p>Amarela: A letra está correta, mas na posição errada.</p>
      <div className="flex gap-2 mb-4">
        {["V", "E", "R", "B", "O"].map((letter, index) => (
          <LetterTile
            key={letter}
            letter={letter}
            color={index === 2 ? "yellow" : "default"}
          />
        ))}
      </div>

      <p>Cinza: A letra não está na palavra.</p>
      <div className="flex gap-2 mb-4">
        {["V", "E", "R", "B", "O"].map((letter, index) => (
          <LetterTile
            key={letter}
            letter={letter}
            color={index === 1 ? "gray" : "default"}
          />
        ))}
      </div>

      <p>Continue tentando até acertar a palavra ou esgotar suas tentativas.</p>

      <p className="text-lg mt-4 text-center">Divirta-se e boa sorte!</p>
    </main>
  );
}
