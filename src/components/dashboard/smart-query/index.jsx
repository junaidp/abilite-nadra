import React, { useState, useRef } from "react";
import {
    Box,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import { styled } from "@mui/system";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import axios from "axios";

// Styled components
const ChatBox = styled(Box)({
    flexGrow: 1,
    overflowY: "auto",
    backgroundColor: "#f5f5f5",
    display: "flex",
    background: "#f5f5f5",
    height: "80vh",
    flexDirection: "column",
    marginBottom: "20px",
    "@media (max-width: 700px)": {
        margin: "40px 0px",
        padding: "10px",
    },
});

const InputBox = styled(Box)({
    position: "fixed",
    bottom: 0,
    width: "75%",
    padding: "10px 20px",
    backgroundColor: "#fff",
    display: "flex",
    gap: "10px",
});

const MessageBubble = styled(Box)(({ isUser }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    margin: "30px",
    alignSelf: isUser ? "flex-end" : "flex-start",
    padding: "20px",
    backgroundColor: isUser ? "#007bff" : "#e0e0e0",
    color: isUser ? "#fff" : "#000",
    borderRadius: "20px",
    marginBottom: "10px",
    maxWidth: "60%",
    "@media (max-width: 700px)": {
        maxWidth: "100%",
    },
}));

const TypingEffect = styled("span")({
    display: "inline-block",
    animation: "blink 1s steps(5, start) infinite",
    "@keyframes blink": {
        "50%": { opacity: 0 },
    },
});

const SmartQuery = () => {
    const chatBoxRef = useRef(null);
    const [input, setInput] = useState("show me all users");
    const [loading, setLoading] = useState(false);
    const [currentResponse, setCurrentResponse] = useState([]);
    const [error, setError] = React.useState(false)
    const { user } = useSelector((state) => state.auth)


    const HIDDEN_KEYS = ["PASSWORD", "SECRET_KEY", "RESET_TOKEN", "IMG_FILE_DATA", "CLIENT_ID", "ARCHIVED", "CREATED_BY", "UPDATED_BY", "VALIDATION_CODE", "ERP", "ID", "TFA", "LOCKED", "REPORTING_TO", "COMPLETED", "RISK_ASSESSMENTID"];

    function isValueEmpty(value) {
        return value === null || value === "" || value === undefined;
    }


    const sendMessageToAPI = async (query) => {
        if (loading || !query.trim()) return;

        const apiUrl =
            `https://abiliteserver.xyz/ai/query?query=${input + ". Show results only for company with id " + user[0].userId.company[0].id}&model=claude-3-haiku-20240307&prompt=assistnt`

        setLoading(true);

        try {
            const { data } = await axios.get(apiUrl, {
                headers: {
                    "Authorization": `Bearer ${user[0].token}`
                }
            })
            setCurrentResponse(data?.data)
            setError(!data?.data)
        } catch (error) {
            toast.error("Error fetching the query response");
            setError(true)
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;
        sendMessageToAPI(input);
        setInput("");
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflowX: "hidden",
            }}
        >
            <h1 className="heading">Smart Query</h1>

            {/* Spacer to avoid top bar overlap */}

            {/* Chat Area */}
            <ChatBox ref={chatBoxRef}>
                {loading && (
                    <MessageBubble>
                        <TypingEffect>Fetching Result...</TypingEffect>
                    </MessageBubble>
                )}
                {
                    error ? <Box
                        elevation={3}
                        sx={{
                            p: 4,
                            mt: 4,
                            textAlign: "center",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h5" gutterBottom color="text.secondary" sx={{ fontFamily: "Poppins, sans-serifs" }}>
                            No results found.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "Poppins, sans-serif" }}>
                            We couldn't find any data related to your query.
                        </Typography>
                    </Box> : !loading &&
                    <div className="accordion" id="accordionFlushExample" style={{ padding: "30px 20px" }}>
                        {currentResponse.map((item, idx) => {
                            const visibleEntries = Object.entries(item).filter(
                                ([key, value]) => !HIDDEN_KEYS.includes(key) && !isValueEmpty(value)
                            );

                            const headerLabel =
                                visibleEntries.length > 0
                                    ? `${visibleEntries[0][0]}: ${String(visibleEntries[0][1])}`
                                    : `Item #${idx + 1}`;

                            return (
                                <div className="accordion-item" key={idx} style={{ marginBottom: idx === currentResponse.length - 1 ? "50px" : "", overflow: "hidden" }}>
                                    <h2 className="accordion-header" id={`flush-heading-${idx}`}>
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#flush-collapse-${idx}`}
                                            aria-expanded="false"
                                            aria-controls={`flush-collapse-${idx}`}
                                        >
                                            {headerLabel}
                                        </button>
                                    </h2>
                                    <div
                                        id={`flush-collapse-${idx}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`flush-heading-${idx}`}
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            {visibleEntries.length > 0 ? (
                                                visibleEntries.map(([key, value]) => (
                                                    <div key={key} className="mb-2">
                                                        <strong>{key}:</strong> {String(value)}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-muted">No visible data available</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }


            </ChatBox>

            {/* Input Area */}

            <InputBox>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                    }}
                    disabled={loading}
                    sx={{
                        '& .MuiInputBase-root': {
                            height: '56px !important',
                        }
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={loading}
                    sx={{
                        '& .MuiInputBase-root': {
                            height: '56px !important',
                            width: "56px !important"
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                </IconButton>
            </InputBox>
        </Box>
    );
};

export default SmartQuery;
