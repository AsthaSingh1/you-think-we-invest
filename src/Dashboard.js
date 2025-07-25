import React, { useState, useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
import ThinkingImage from "./assets/Thinking.png";

export default function Dashboard() {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);
  const [messages, setMessages] = useState([]);
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      setRecordedAudioURL(audioUrl);

      // Trigger enhancement for voice input
      handleSend("audio");
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        {
          type: inputType,
          content: URL.createObjectURL(file),
          fileName: file.name,
        },
      ]);
    }
  };

  const handleSend = (overrideType = null) => {
    const sendingType = overrideType || inputType;
    const trimmedInput = inputValue.trim().toLowerCase();

    if (!inputValue && !recordedAudioURL) return;

    const userMessage =
      sendingType === "audio"
        ? { type: "audio", content: recordedAudioURL }
        : { type: "text", content: inputValue };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setRecordedAudioURL(null);

    if (ideaSubmitted || (sendingType === "text" && !inputValue)) return;

    // Submission confirmation
    if (
      sendingType === "text" &&
      ["yes", "submit", "einreichen"].includes(trimmedInput)
    ) {
      const id = Math.floor(100000 + Math.random() * 900000);
      setMessages((prev) => [
        ...prev,
        {
          type: "text",
          content: `Thank You for submitting your idea. Your Idea ID is ${id}. We will get back to you once we are done with the evaluation.`,
        },
      ]);
      setIdeaSubmitted(true);
      return;
    }

    // Enhancement response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "text", content: "Enhancing your idea..." },
      ]);

      setTimeout(() => {
        const englishEnhancedResponse = `
Here is a refined version of your business idea:

You’re starting from a great foundation—handicrafts are in demand globally, especially when they have cultural, eco-friendly, or handmade value. Let’s address each of your questions in a structured way:

⸻

✅ 1. Enhancing Your Idea for Better Business Results

To grow your idea into a successful business, consider:

a. Product Focus
	•	Specialize in a niche: e.g., eco-friendly home decor, traditional Himachali crafts, sustainable fashion accessories.
	•	Use local materials (wood, wool, fabric, natural dyes).
	•	Customization: personalized items for weddings, gifts, festivals.

b. Digital Presence
	•	Create an Instagram and WhatsApp business account.
	•	Open an online store via:
	•	Free/Low-Cost Platforms: Meesho, Etsy (India), Amazon Karigar, Flipkart Samarth.
	•	Own Website: via Shopify, Wix, or Dukaan.

c. Branding
	•	Choose a unique brand name linked to your heritage or name.
	•	Tell your story: “handmade with love in Himachal Pradesh” adds emotional value.
	•	Good packaging boosts premium feel.

d. Sales Channels
	•	Online: WhatsApp groups, Instagram reels, YouTube shorts (how it’s made), Facebook marketplace.
	•	Offline: participate in local fairs, exhibitions, tie-up with tourist shops.

⸻

✅ 2. Existing Businesses with Similar Idea

Yes, several businesses in India are already doing well in this space:

Brand	Focus	Scale
Okhai	Handcrafted apparel by rural artisans	National
The India Craft House	Curated ethnic handicrafts	National & International
Gaatha	Handmade home decor, jewelry	Premium niche
Amazon Karigar	Amazon’s initiative for local artisans	National reach

These examples show demand exists, but there’s still room for unique identity.

⸻

✅ 3. Unique Features You Can Add

To stand out:

a. Hyperlocal Identity
	•	Highlight regional crafts (e.g., Chamba Rumal, Himachali woodwork).
	•	Use Himachal motifs or nature-based themes.

b. Eco-friendly Focus
	•	Use natural dyes, sustainable packaging, and plantable tags.
	•	Market it as an “eco-conscious artisan brand.”

c. Experience-based Selling
	•	Offer DIY craft kits for kids or adults.
	•	Provide virtual workshops or reels showing behind-the-scenes.

d. Collaborate with Tribal Artisans or Women Collectives
	•	Create a cause-based brand: “empowering women of Bilaspur/Mandi.”

⸻

✅ 4. Additional Pointers
	•	Government Schemes:
	•	Register under UDYAM (MSME) – for funding, benefits, and visibility.
	•	Use schemes like PMEGP for business loans.
	•	Apply for GI tagging support if your craft is traditional.
	•	Skill Development:
	•	Join online design/craft workshops (NIFT, Coursera, YouTube).
	•	Learn digital marketing basics to promote your brand.
	•	Pricing Strategy:
	•	Keep cost + margin pricing.
	•	Offer combo packs or festive bundles.
	•	Start Small:
	•	Begin with limited inventory.
	•	Pre-orders via WhatsApp to manage cash flow.

⸻

✅ 5. Partnership Ideas & Revenue Potential

🤝 Partnerships
	•	Tourism Boards: Sell crafts through Himachal tourism shops.
	•	Boutique Hotels/Homestays: Offer exclusive souvenir packs.
	•	Online Influencers: Ask local content creators to promote.
	•	NGOs: Tie-up for women artisan groups.
	•	Etsy Sellers Abroad: Collaborate to export items.

⸻

💸 Revenue Potential Breakdown (Estimates)

Assuming an average price of ₹500–₹1500 per product:

Market Level	Target Sales	Est. Revenue/month
Local (district)	30–50 items	₹15,000 – ₹50,000
Regional (Himachal)	100+ items	₹50,000 – ₹1.5 Lakh
State-wide (North India)	300+ items	₹2–4 Lakhs
National	1000+ items	₹5–10 Lakhs
International (Etsy/Export)	500 items (₹1500 avg)	₹7.5 Lakhs+

With partnerships and strong branding, monthly revenue of ₹1–3 Lakh is achievable within 6–12 months, even starting from your home.

⸻

🔚 Final Tips
	•	Start Now: You don’t need big capital to begin. Use free platforms, local materials, and friends/family as first customers.
	•	Be Consistent: Post content regularly and build trust.
	•	Scale Slowly: As you earn, invest back into tools, packaging, and marketing.

⸻

        `;

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "text", content: englishEnhancedResponse },
          { type: "text", content: "Would you like to submit this idea or refine it further?" },
        ]);
      }, 1000);
    }, 400);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${ThinkingImage})`,
      }}
    >
      <div
        className="w-full max-w-md rounded-lg shadow-xl bg-white bg-opacity-30 backdrop-blur-md overflow-hidden flex flex-col"
        style={{ height: "90vh" }}
      >
        {/* Header */}
        <div className="bg-[#003366] text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">AI Idea Assistant</h2>
          <button onClick={handleLogout} title="Logout">
            <FiLogOut size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="text-sm bg-white p-2 rounded shadow max-h-60 overflow-y-auto whitespace-pre-wrap"
            >
              {msg.type === "text" && <p>{msg.content}</p>}
              {msg.type === "image" && (
                <img
                  src={msg.content}
                  alt={msg.fileName}
                  className="max-h-48 mx-auto"
                />
              )}
              {msg.type === "video" && (
                <video controls src={msg.content} className="max-h-48 mx-auto" />
              )}
              {msg.type === "audio" && (
                <audio controls src={msg.content} className="w-full" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t">
          {/* Text Input */}
          {inputType === "text" && (
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow border rounded-md px-4 py-2 mr-2 outline-blue-500"
                placeholder="Describe your idea..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                className="bg-blue-600 text-white rounded-full p-2"
              >
                <FaPaperPlane />
              </button>
            </div>
          )}

          {/* Media Input */}
          {["image", "video"].includes(inputType) && (
            <div className="flex flex-col gap-3 items-center mb-4">
              <input
                type="file"
                accept={inputType + "/*"}
                onChange={handleMediaUpload}
                capture="environment"
                className="text-sm"
              />
              <p className="text-xs text-gray-500">
                {inputType === "image"
                  ? "Choose or take a picture"
                  : "Choose or record a video"}
              </p>
            </div>
          )}

          {/* Audio Input */}
          {inputType === "audio" && (
            <div className="flex flex-col items-center mb-4">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                >
                  🎙 Start Recording
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm"
                >
                  ⏹ Stop Recording
                </button>
              )}
              {recordedAudioURL && (
                <div className="mt-3">
                  <audio controls src={recordedAudioURL} />
                </div>
              )}
            </div>
          )}

          {/* Input Type Selector */}
          <div className="flex justify-between items-center border-t pt-3 mt-2 text-xs">
            {["text", "image", "audio", "video"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="inputType"
                  value={type}
                  checked={inputType === type}
                  onChange={() => setInputType(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
