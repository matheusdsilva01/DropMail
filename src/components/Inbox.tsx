import { useQuery } from "@apollo/client";
import { GET_EMAILS } from "apollo/querys";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Mail, mailData } from "types/mail";
import { sessionType } from "types/session";
import CollapSideBarIcon from "assets/arrow-double-left.svg";
import Email from "./email";

const Inbox = () => {
  const [emailToRead, setEmailToRead] = useState<mailData>();
  const [session, setSession] = useLocalStorage<sessionType | undefined>(
    "session",
    undefined
  );
  const id = session?.id;
  const { data: emails, previousData } = useQuery<Mail>(GET_EMAILS, {
    variables: { sessionid: id }
  });

  const selectEmailToRead = (i: number) => {
    setEmailToRead(emails?.session.mails[i]);
  };

  useEffect(() => {
    if (session && emails && emails.session) {
      setSession(old => {
        if (old) {
          const newSession = { ...old, expiresAt: emails.session.expiresAt };
          return newSession;
        }
      });
      if (
        previousData &&
        JSON.stringify(previousData.session.mails) !==
          JSON.stringify(emails.session.mails)
      ) {
        new Notification("Novo email", {
          body: "Você tem um novo email no seu inbox!"
        });
      }
    }
  }, [emails]);

  return (
    <div className="w-full h-full rounded border-2 border-gray-300 flex">
      <input
        id="collapse-sidebar"
        className="peer/sidebar hidden"
        type="checkbox"
      />
      <label
        htmlFor="collapse-sidebar"
        className="absolute whitespace-nowrap flex bg-slate-600 h-8 p-1 w-[273.89px] bottom-2 left-4 z-10 peer-checked/sidebar:w-8"
      >
        <img
          src={CollapSideBarIcon}
          alt="icon collapse sidebar"
          className="w-6 h-6"
        />
        <p className="whitespace-nowrap overflow-hidden text-clip text-white">
          Minimizar inbox
        </p>
      </label>
      <section className="w-80 overflow-auto h-[calc(100%-32px)] peer-checked/sidebar:w-0">
        <ul>
          <li className="p-2 py-3 font-bold">Inbox</li>
          {emails &&
            emails.session.mails.map(({ fromAddr, text, headerSubject }, i) => (
              <>
                <Email
                  key={i}
                  text={text}
                  fromAddr={fromAddr}
                  headerSubject={headerSubject}
                  selectEmail={() => selectEmailToRead(i)}
                />
                <Email
                  key={i}
                  text={text}
                  fromAddr={fromAddr}
                  headerSubject={headerSubject}
                  selectEmail={() => selectEmailToRead(i)}
                />
              </>
            ))}
        </ul>
      </section>
      <section className="w-full px-2 bg-gray-200 overflow-auto peer-checked/sidebar:pl-8">
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
              {!emails || emails?.session.mails.length < 1
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
