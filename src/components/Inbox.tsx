import { useLazyQuery } from "@apollo/client";
import { GET_EMAILS } from "apollo/querys";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Mail, mailData } from "types/mail";
import { sessionType } from "types/session";
import Email from "./email";

const Inbox = () => {
  const [session, setSession] = useLocalStorage<sessionType | undefined>(
    "session",
    undefined
  );
  const [emailToRead, setEmailToRead] = useState<mailData>();
  const id = session?.id;
  const [getEmails, { data: emails, refetch }] = useLazyQuery<Mail>(
    GET_EMAILS,
    {
      variables: { sessionid: id },
      pollInterval: 150000
    }
  );

  const selectEmailToRead = (i: number) => {
    setEmailToRead(emails?.session.mails[i]);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getEmails();
      if (session && data?.session) {
        setSession(old => {
          if (old) {
            const newSession = { ...old, expiresAt: data.session.expiresAt };
            return newSession;
          }
        });
      }
    })();
  }, [emails]);

  return (
    <div className="w-full h-full rounded border-2 border-gray-300 flex">
      <section className="w-80 overflow-auto">
        <ul>
          <li className="p-2 py-3 font-bold">Inbox</li>
          {emails?.session.mails.map(({ fromAddr, text, headerSubject }, i) => (
            <li key={i}>
              <Email
                text={text}
                fromAddr={fromAddr}
                headerSubject={headerSubject}
                selectEmail={() => selectEmailToRead(i)}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full px-2 bg-gray-200 overflow-auto">
        {emailToRead ? (
          <>
            <h2 className="p-2 py-3 font-semibold border-b border-gray-300">
              De: {emailToRead.fromAddr}
            </h2>
            <h1 className="px-2 py-3">Assunto: {emailToRead.headerSubject}</h1>
            <div className="bg-white h-full overflow-auto p-2 whitespace-pre-line font-semibold">
              {emailToRead.text}
            </div>
          </>
        ) : (
          <>
            <h2 className="p-2 py-3 font-semibold border-b border-gray-300">
              <div className="h-2.5 bg-gray-500 rounded-full animate-pulse w-48 mb-3.5"></div>
            </h2>
            <h1 className="px-2 py-3"></h1>
            <div className="bg-white h-[88.6%] p-2 whitespace-pre-line font-semibold">
              {emails && emails.session.mails.length < 1
                ? "Você não tem emails no seu inbox"
                : "Selecione um email a esquerda para ler"}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Inbox;
