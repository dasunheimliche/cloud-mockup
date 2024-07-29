import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import t from "@/translations/configurations";
import useLangStore from "@/stores/lang-store";

function FinishButton({ isLoading }: { isLoading: boolean }) {
  const { language } = useLangStore();

  const [contador, setContador] = useState(5);
  const [texto, setTexto] = useState(t.button.finish[language]);

  useEffect(() => {
    let intervalo: any;

    if (
      texto !== t.button.finish[language] &&
      texto !== t.button.confirm[language]
    ) {
      intervalo = setInterval(() => {
        setContador((prevContador) => {
          if (prevContador === 1) {
            clearInterval(intervalo);
            setTexto(t.button.confirm[language]);
            return 0; // El contador llega a cero
          }
          setTexto(String(prevContador - 1));
          return prevContador - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [texto]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (texto === t.button.finish[language]) {
      e.preventDefault(); // Evita el submit en el primer clic
      setTexto(String(contador));
    }
  };

  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <div></div>;

  return (
    <Button
      className="bg-[#010618] transition-all w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10 flex justify-center items-center"
      onClick={handleClick}
      disabled={
        (contador > 0 && texto !== t.button.finish[language]) || isLoading
      }
    >
      {!isLoading && texto}
      {isLoading && <div className="loader"></div>}
    </Button>
  );
}

export default FinishButton;

// import { Button } from "@/components/ui/button";
// import React, { useState, useEffect } from "react";
// import t from "@/translations/configurations";
// import useLangStore from "@/stores/lang-store";

// function FinishButton({ isLoading }: { isLoading: boolean }) {
//   const { language } = useLangStore();

//   const [contador, setContador] = useState(5);
//   const [texto, setTexto] = useState("FINISH");

//   useEffect(() => {
//     let intervalo: any;

//     if (texto !== "FINISH" && texto !== "CONFIRM") {
//       intervalo = setInterval(() => {
//         setContador((prevContador) => {
//           if (prevContador === 1) {
//             clearInterval(intervalo);
//             setTexto("CONFIRM");
//             return 0; // El contador llega a cero
//           }
//           setTexto(String(prevContador - 1));
//           return prevContador - 1;
//         });
//       }, 1000);
//     }

//     return () => clearInterval(intervalo);
//   }, [texto]);

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     if (texto === "FINISH") {
//       e.preventDefault(); // Evita el submit en el primer clic
//       setTexto(String(contador));
//     }
//   };

//   const [hydrated, setHydrated] = useState<boolean>(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   if (!hydrated) return <div></div>;

//   return (
//     <Button
//       className="bg-[#010618] transition-all w-[7rem] h-[2.5rem] text-green-50 rounded-[2rem] mt-10 flex justify-center items-center"
//       onClick={handleClick}
//       disabled={(contador > 0 && texto !== "FINISH") || isLoading}
//     >
//       {!isLoading && texto}
//       {isLoading && <div className="loader"></div>}
//     </Button>
//   );
// }

// export default FinishButton;
