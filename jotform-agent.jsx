import { useEffect } from "react";

const JotformAgent = () => {
  useEffect(() => {
    // Load JotForm AI agent script
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          agentRenderURL:
            "https://agent.jotform.com/019516fd0dcc7e048a6959b542b6b89d5fa7",
          rootId: "JotformAgent-019516fd0dcc7e048a6959b542b6b89d5fa7",
          formID: "019516fd0dcc7e048a6959b542b6b89d5fa7",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isDraggable: false,
          background: "linear-gradient(180deg, #FFDF79 0%, #FFDF79 100%)",
          buttonBackgroundColor: "#FB7041",
          buttonIconColor: "#FFF",
          variant: false,
          customizations: {
            greeting: "Yes",
            greetingMessage:
              "Hey! Don't like the trip plan? Let me know how to improve it...",
            pulse: "Yes",
            position: "right",
          },
          isVoice: false,
        });
      }
    };

    return () => {
      document.body.removeChild(script); // Cleanup script on unmount
    };
  }, []);

  return <div id="JotformAgent-019516fd0dcc7e048a6959b542b6b89d5fa7"></div>;
};

export default JotformAgent;
