import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [doc, setDoc] = useState("");
    const [docID, setDocID] = useState("");
    const [userUID, setUserUID] = useState("hF79Ygs2xXSFCVnfC9fKcNIFcte2");
    const [preloader, setPreloader] = useState(false);
    const [userInfo, setUserInfo] = useState({ image: null, firstname: "John", lastname: "Wick", email: "john@gmail.com" });
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AppContext.Provider value={{
            doc, setDoc,
            docID, setDocID,
            userUID, setUserUID,
            userInfo, setUserInfo,
            preloader, setPreloader,
            candidates, setCandidates,
            searchQuery, setSearchQuery,
            selectedCandidate, setSelectedCandidate,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }