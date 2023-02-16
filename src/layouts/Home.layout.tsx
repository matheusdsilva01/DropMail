import { useMutation } from "@apollo/client";
import { GENERATE_SESSION } from "apollo/querys";
import Header from "components/header";
import Inbox from "components/Inbox";
import Modal from "components/modal";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { sessionType } from "types/session";

const HomeLayout = () => {
  const [session, setSession] = useLocalStorage<sessionType | undefined>(
    "session",
    undefined
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [generateSession, { data: sessionreq, loading }] =
    useMutation(GENERATE_SESSION);

  const closeModal = () => {
    generateEmail().then(() => setModalIsOpen(false));
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
      {modalIsOpen && <Modal onClick={closeModal} loading={loading} />}
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
              <h3 className="text-center mt-5">
                Autorefresh in <span className="rounded-full">5</span>
              </h3>
            </div>
          </section>
          <Inbox />
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
