interface EmailProps {
  headerSubject: string;
  text: string;
  fromAddr: string;
  selectEmail: () => void;
}

const Email = ({ headerSubject, text, fromAddr, selectEmail }: EmailProps) => {
  return (
    <>
      <li
        className="flex flex-col font-bold text-lg px-2 border-y border-gray-300 cursor-pointer"
        onClick={selectEmail}
      >
        <span className="text-black whitespace-nowrap overflow-hidden text-ellipsis">
          {fromAddr}
        </span>
        <span className="text-lg text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis">
          {headerSubject}
        </span>
        <span className="text-gray-600 text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {text}
        </span>
      </li>
    </>
  );
};

export default Email;
