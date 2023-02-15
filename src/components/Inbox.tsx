import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useLocalStorage } from "hooks/useLocalStorage";

const GENERATE_SESSION = gql`
  mutation {
    introduceSession {
      id
      expiresAt
      addresses {
        address
      }
    }
  }
`;

const GET_EMAILS = gql`
  query Email($sessionid: ID!) {
    session(id: $sessionid) {
      mails {
        rawSize
        fromAddr
        toAddr
        downloadUrl
        text
        headerSubject
      }
    }
  }
`;

const Inbox = () => {
  const [session, setSession] = useLocalStorage<any>("session", {});
  const [generateSession, { data: emailreq }] = useMutation(GENERATE_SESSION);
  const id = session.id;
  const [getEmails, { data, loading, error }] = useLazyQuery(GET_EMAILS, {
    variables: { sessionid: id }
  });

  const generateEmail = async () => {
    generateSession().then(({ data }) => {
      let { id, expiresAt, addresses } = data.introduceSession;
      let address = addresses[0].address;
      let formattedSession = {
        id,
        expiresAt,
        address
      };
      setSession(formattedSession);
    });
  };

  return (
    <div className="w-full h-full rounded border-2 border-gray-300 flex">
      <section className="w-80">
        <ul>
          <li className="p-2 py-3 font-semibold">Inbox</li>
          <li className="flex flex-col font-bold text-lg px-2 border-y border-gray-300">
            <span className="text-black">Title</span>
            <span className="text-lg text-blue-700">Subject</span>
            <span className="text-gray-600 text-base">Content</span>
          </li>
        </ul>
      </section>
      <section className="w-full px-2 bg-gray-200">
        <h2 className="p-2 py-3 font-semibold border-b border-gray-300">
          de: email@email.com
        </h2>
        <h1 className="px-2 py-3">Subject</h1>
        <div className="bg-white p-2 whitespace-pre-line font-semibold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </section>
    </div>
  );
};

export default Inbox;
