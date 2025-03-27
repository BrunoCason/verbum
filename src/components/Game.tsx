import { useState, useRef, useEffect } from "react";
import Keyboard from "../components/Keyboard";

export default function Game() {
  const [letters, setLetters] = useState<string[][]>(
    Array.from({ length: 6 }, () => ["", "", "", "", ""])
  );
  const [rowColors, setRowColors] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [correctWord, setCorrectWord] = useState<string>("");
  const [keyboardColors, setKeyboardColors] = useState<{
    [key: string]: string;
  }>({});

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

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
      const normalizedCorrectWord = normalizeString(correctWord);

      const colors = letters[row].map((letter, index) => {
        const normalizedLetter = normalizeString(letter);

        if (normalizedLetter === normalizedCorrectWord[index]) {
          return "bg-green-600 border-none";
        } else if (normalizedCorrectWord.includes(normalizedLetter)) {
          return "bg-yellow-600 border-none";
        } else {
          return "bg-gray-900 border-none";
        }
      });

      newRowColors[row] = colors;
      setRowColors(newRowColors);

      updateKeyboardColors(row);

      if (letters[row].join("") === normalizedCorrectWord) {
        setGameOver(true);
      }

      if (row < letters.length - 1 && !gameOver) {
        setActiveRow(row + 1);
        inputsRef.current[row + 1][0]?.focus();
      }
    }
  };

  const verifyRow = (row: number) => {
    const newRowColors = [...rowColors];
    const normalizedCorrectWord = normalizeString(correctWord);

    const colors = letters[row].map((letter, index) => {
      const normalizedLetter = normalizeString(letter);

      if (normalizedLetter === normalizedCorrectWord[index]) {
        return "bg-green-600 border-none";
      } else if (normalizedCorrectWord.includes(normalizedLetter)) {
        return "bg-yellow-600 border-none";
      } else {
        return "bg-gray-900 border-none";
      }
    });
    newRowColors[row] = colors;
    setRowColors(newRowColors);

    updateKeyboardColors(row);

    if (letters[row].join("") === normalizedCorrectWord) {
      setGameOver(true);
    }

    if (row < letters.length - 1 && !gameOver) {
      setActiveRow(row + 1);
      inputsRef.current[row + 1][0]?.focus();
    }
  };

  console.log(correctWord);

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

  const handleVirtualKeyPress = (key: string) => {
    if (gameOver) return;

    const row = activeRow;
    const currentRow = [...letters[row]];

    if (key === "Backspace") {
      const lastFilledIndex = currentRow.lastIndexOf(
        currentRow.find((l) => l !== "") || ""
      );
      if (lastFilledIndex >= 0) {
        currentRow[lastFilledIndex] = "";
        setLetters((prev) => {
          const updated = [...prev];
          updated[row] = currentRow;
          return updated;
        });
      }
    } else if (key === "Enter" && currentRow.every((letter) => letter !== "")) {
      verifyRow(row);
    } else if (/^[A-Z]$/.test(key)) {
      const emptyIndex = currentRow.indexOf("");
      if (emptyIndex !== -1) {
        currentRow[emptyIndex] = key;
        setLetters((prev) => {
          const updated = [...prev];
          updated[row] = currentRow;
          return updated;
        });
      }
    }
  };

  const updateKeyboardColors = (row: number) => {
    const newKeyboardColors = { ...keyboardColors };
    letters[row].forEach((letter, index) => {
      if (letter === correctWord[index]) {
        newKeyboardColors[letter] = "bg-green-600";
      } else if (correctWord.includes(letter)) {
        newKeyboardColors[letter] = "bg-yellow-600";
      } else {
        newKeyboardColors[letter] = "bg-gray-900";
      }
    });
    setKeyboardColors(newKeyboardColors);
  };

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
      <Keyboard
        onKeyPress={handleVirtualKeyPress}
        keyboardColors={keyboardColors}
      />
    </div>
  );
}
