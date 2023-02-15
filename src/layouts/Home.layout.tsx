import Header from "components/header";
import Inbox from "components/Inbox";
import Modal from "components/modal";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect, useState } from "react";

const HomeLayout = () => {
  const [session] = useLocalStorage("session", {});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!session) {
      setModalIsOpen(true);
    }
  }, []);

  return (
    <>
      {modalIsOpen && <Modal onClick={closeModal} />}
      <div>
        <Header />
        <div className="p-4">
          <section className="border border-gray-300 py-10 flex">
            <div className="my-0 mx-auto w-96">
              <span>Seu endereço de email temporario é</span>
              <div className="w-full flex">
                <input
                  className="w-full rounded-l bg-white border border-gray-300 p-2"
                  type="text"
                  disabled
                  value="email@email.com"
                />
                <button className="flex border p-2 rounded-r border-gray-300 before:content-copy before:align-middle">
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
