interface EmailProps {
  headerSubject: string;
  text: string;
  fromAddr: string;
}

const Email = ({ headerSubject, text, fromAddr }: EmailProps) => {
  return (
    <>
      <li className="flex flex-col font-bold text-lg px-2 border-y border-gray-300">
        <span className="text-black">{fromAddr}</span>
        <span className="text-lg text-blue-700">{headerSubject}</span>
        <span className="text-gray-600 text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {text}
        </span>
      </li>
    </>
  );
};

export default Email;
