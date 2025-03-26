import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [letters, setLetters] = useState<string[][]>(Array.from({ length: 6 }, () => ["", "", "", "", ""]));
  const [rowColors, setRowColors] = useState<string[][]>(Array.from({ length: 6 }, () => Array(5).fill("")));
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [correctWord, setCorrectWord] = useState<string>("");

  const inputsRef = useRef<(HTMLInputElement | null)[][]>([]);

  const handleChange = (row: number, index: number, value: string) => {
    if (gameOver) return;
    if (value.length > 1) return;

    const newLetters = [...letters];
    newLetters[row][index] = value.toUpperCase();
    setLetters(newLetters);

    if (value && index < 4) {
      inputsRef.current[row][index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    row: number,
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !letters[row][index] && index > 0) {
      inputsRef.current[row][index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 4) {
      inputsRef.current[row][index + 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[row][index - 1]?.focus();
    } else if (
      event.key === "Enter" &&
      letters[row].every((letter) => letter !== "")
    ) {
      const newRowColors = [...rowColors];
      const colors = letters[row].map((letter, index) => {
        if (letter === correctWord[index]) {
          return "bg-green-600 border-none";
        } else if (correctWord.includes(letter)) {
          return "bg-yellow-600 border-none";
        } else {
          return "bg-gray-900 border-none";
        }
      });
      newRowColors[row] = colors;
      setRowColors(newRowColors);

      if (letters[row].join("") === correctWord) {
        setGameOver(true);
      }

      if (row < letters.length - 1 && !gameOver) {
        setActiveRow(row + 1);
        inputsRef.current[row + 1][0]?.focus();
      }
    }
  };

  console.log(correctWord)

  const getBackgroundColor = (row: number, index: number) => {
    if (row < activeRow) {
      return rowColors[row][index];
    } else if (row === activeRow) {
      return;
    } else {
      return "border-none bg-teste1";
    }
  };

  useEffect(() => {
    const fetchCorrectWord = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/palavra");
        const data = await response.json();
        setCorrectWord(data.palavra.toUpperCase());
      } catch (error) {
        console.error("Erro ao buscar palavra:", error);
      }
    };

    fetchCorrectWord();
  }, []);

  useEffect(() => {
    inputsRef.current[activeRow][0]?.focus();
  }, [activeRow]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">V E R B U M</h1>
      <div className="flex flex-col gap-2">
        {letters.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (!inputsRef.current[rowIndex])
                    inputsRef.current[rowIndex] = [];
                  inputsRef.current[rowIndex][index] = el;
                }}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e) => handleChange(rowIndex, index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(rowIndex, index, e)}
                disabled={gameOver || rowIndex > activeRow}
                className={`h-16 w-16 text-center text-xl font-bold uppercase border-4 border-teste focus:outline-none focus:border-b-8 caret-transparent transition-all duration-100 ease-in-out rounded-lg ${getBackgroundColor(
                  rowIndex,
                  index
                )}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
