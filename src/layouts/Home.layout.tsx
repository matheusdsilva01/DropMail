import { useLazyQuery, useMutation } from "@apollo/client";
import { GENERATE_SESSION, GET_EMAILS } from "apollo/querys";
import Header from "components/header";
import Inbox from "components/Inbox";
import Modal from "components/modal";
import useInterval from "hooks/useInterval";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Mail } from "types/mail";
import { sessionType } from "types/session";
import RefreshIcon from "assets/refresh-icon.svg";

const HomeLayout = () => {
  const [interval, setInterval] = useState(15);
  const [session, setSession] = useLocalStorage<sessionType | undefined>(
    "session",
    undefined
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [getEmails, { loading: loadingQueryGetEmails }] =
    useLazyQuery<Mail>(GET_EMAILS);
  const [generateSession, { loading: loadingQueryCreateSession }] =
    useMutation(GENERATE_SESSION);

  const closeModal = () => {
    generateEmail().then(() => setModalIsOpen(false));
  };

  const refreshEmails = () => {
    getEmails().then(() => setInterval(15));
  };

  const generateEmail = async () => {
    const { data } = await generateSession();
    let { id, expiresAt, addresses } = data.introduceSession;
    let address = addresses[0].address;
    let formattedSession = {
      id,
      expiresAt,
      address
    };
    setSession(formattedSession);
  };

  const copyEmailToClipboard = () => {
    session && navigator.clipboard.writeText(session.address);
  };

  useInterval(
    () =>
      setInterval(old => {
        if (old < 1) {
          return 15;
        } else {
          return old - 1;
        }
      }),
    !loadingQueryGetEmails && session ? 1000 : null
  );

  useEffect(() => {
    if (session && new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem("session");
      setModalIsOpen(true);
    }
    if (session === undefined) {
      setModalIsOpen(true);
    }
  }, [session]);

  return (
    <>
      {modalIsOpen && (
        <Modal onClick={closeModal} loading={loadingQueryCreateSession} />
      )}
      <div className="h-full">
        <Header />
        <div className="p-4 h-[70vh]">
          <section className="border border-gray-300 py-10 flex">
            <div className="my-0 mx-auto w-96">
              <span>Seu endereço de email temporario é</span>
              <div className="w-full flex">
                <input
                  className="w-full rounded-l bg-white border border-gray-300 p-2"
                  type="text"
                  disabled
                  value={session?.address}
                />
                <button
                  className="flex border p-2 rounded-r border-gray-300 before:content-copy before:align-middle"
                  onClick={copyEmailToClipboard}
                >
                  Copy
                </button>
              </div>
              <div className="text-center flex justify-center items-center mt-5">
                Atualização de emails em
                <span className="rounded-full ml-2 w-7 h-7 border-blue-600 border">
                  {interval}
                </span>
                <button
                  onClick={refreshEmails}
                  className="border flex items-center ml-2 p-2 rounded-md border-gray-300"
                >
                  <img
                    src={RefreshIcon}
                    alt="refresh-icon"
                    className={`${loadingQueryGetEmails ? "animate-spin" : ""}`}
                  />
                  Atualizar
                </button>
              </div>
            </div>
          </section>
          <Inbox />
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
