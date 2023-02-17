import { MouseEvent } from "react";
import CircleSpin from "assets/circle-spin-icon.svg";
interface ModalProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

const Modal = ({ onClick, loading }: ModalProps) => {
  return (
    <>
      <div className="blur-md backdrop-blur-lg h-full w-full absolute z-40"></div>
      <div className="absolute w-full h-screen flex text-white z-50">
        <div className="w-full bg-slate-800 rounded-lg text-center flex flex-col h-80 max-w-2xl m-auto">
          <h1 className="m-auto mb-5 text-2xl">
            Bem vindo ao DropMail generator!!!
          </h1>
          <h3>Aqui você pode gerar um email aleatório, vamos começar?</h3>
          <button
            onClick={onClick}
            className="bg-emerald-400 px-5 py-2 rounded-sm m-auto hover:shadow-lg flex items-center"
          >
            {loading && <img src={CircleSpin} alt="" />}
            Começar
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
