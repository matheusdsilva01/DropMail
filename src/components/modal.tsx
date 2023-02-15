import { MouseEvent } from "react";

interface ModalProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

const Modal = ({ onClick, loading }: ModalProps) => {
  return (
    <>
      <div className="blur-md backdrop-blur-lg h-full w-full absolute ">
        sdas
      </div>
      <div className="absolute w-full h-screen flex text-white">
        <div className="w-full bg-slate-800 rounded-lg text-center flex flex-col h-80 max-w-2xl m-auto">
          <h1 className="m-auto mb-5 text-2xl">
            Bem vindo ao DropMail generator!!!
          </h1>
          <h3>Aqui você pode gerar um email aleatório, vamos começar?</h3>
          <button
            onClick={onClick}
            className="bg-emerald-400 px-5 py-2 rounded-sm m-auto hover:shadow-lg flex items-center"
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Começar
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
